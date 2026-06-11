/**
 * NetHauls Price Check API
 *
 * Cloudflare Worker that proxies search queries to the eBay Browse API
 * so the marketplace "Price Check" tool can show live asking-price comps
 * without exposing eBay credentials in the browser.
 *
 * Required secrets (set with `wrangler secret put <NAME>`):
 *   EBAY_CLIENT_ID     - eBay application "App ID" (Client ID)
 *   EBAY_CLIENT_SECRET - eBay application "Cert ID" (Client Secret)
 *
 * Optional vars (wrangler.toml [vars]):
 *   ALLOWED_ORIGIN - origin allowed for CORS (defaults to "*")
 */

const EBAY_TOKEN_URL = 'https://api.ebay.com/identity/v1/oauth2/token';
const EBAY_SEARCH_URL = 'https://api.ebay.com/buy/browse/v1/item_summary/search';
const EBAY_SCOPE = 'https://api.ebay.com/oauth/api_scope';

let cachedToken = null; // { value, expiresAt } - reused across requests within a warm isolate

async function getEbayToken(env) {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now + 60_000) {
    return cachedToken.value;
  }

  const credentials = btoa(`${env.EBAY_CLIENT_ID}:${env.EBAY_CLIENT_SECRET}`);
  const res = await fetch(EBAY_TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      scope: EBAY_SCOPE,
    }),
  });

  if (!res.ok) {
    throw new Error(`eBay token request failed: ${res.status}`);
  }

  const data = await res.json();
  cachedToken = {
    value: data.access_token,
    expiresAt: now + data.expires_in * 1000,
  };
  return cachedToken.value;
}

function corsHeaders(env) {
  return {
    'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function jsonResponse(body, status, env) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(env),
    },
  });
}

function median(sorted) {
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function percentile(sorted, p) {
  const idx = (sorted.length - 1) * p;
  const lower = Math.floor(idx);
  const upper = Math.ceil(idx);
  if (lower === upper) return sorted[lower];
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (idx - lower);
}

function buildStats(prices) {
  if (prices.length === 0) return null;
  const sorted = [...prices].sort((a, b) => a - b);
  return {
    count: sorted.length,
    min: sorted[0],
    max: sorted[sorted.length - 1],
    median: median(sorted),
    suggestedLow: percentile(sorted, 0.25),
    suggestedHigh: percentile(sorted, 0.75),
  };
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(env) });
    }

    const url = new URL(request.url);
    const query = (url.searchParams.get('q') || '').trim();

    if (!query) {
      return jsonResponse({ error: 'Missing required "q" query parameter.' }, 400, env);
    }

    try {
      const token = await getEbayToken(env);

      const searchParams = new URLSearchParams({
        q: query,
        sort: 'price',
        limit: '24',
      });

      const res = await fetch(`${EBAY_SEARCH_URL}?${searchParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US',
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const text = await res.text();
        return jsonResponse({ error: 'eBay search failed', detail: text }, 502, env);
      }

      const data = await res.json();
      const items = (data.itemSummaries || []).map((item) => ({
        title: item.title,
        price: item.price ? parseFloat(item.price.value) : null,
        currency: item.price ? item.price.currency : null,
        condition: item.condition || null,
        image: item.image ? item.image.imageUrl : null,
        url: item.itemWebUrl,
      }));

      const prices = items.map((i) => i.price).filter((p) => typeof p === 'number' && !Number.isNaN(p));

      return jsonResponse(
        {
          query,
          total: data.total || 0,
          stats: buildStats(prices),
          items,
        },
        200,
        env
      );
    } catch (err) {
      return jsonResponse({ error: 'Unexpected error', detail: err.message }, 500, env);
    }
  },
};
