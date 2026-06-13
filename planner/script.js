// ============================================
// NetHauls Business Planner: Logic & Data
// ============================================

(function () {

  // ---------- DATA ----------

  var STARTUP_ITEMS = [
    { id: 'su-llc',        name: 'Maine LLC Filing (maine.gov)',        notes: 'Online at maine.gov/sos. 3-5 business days, pay by card.', cat: 'Legal &amp; Financial Foundation', lean: 175,  std: 175 },
    { id: 'su-agent',      name: 'Registered Agent Service (1 yr)',     notes: 'Northwest Registered Agent, or use your own address.',     cat: 'Legal &amp; Financial Foundation', lean: 50,   std: 100 },
    { id: 'su-ein',        name: 'EIN (IRS.gov)',                       notes: 'Free, instant, online at irs.gov.',                         cat: 'Legal &amp; Financial Foundation', lean: 0,    std: 0 },
    { id: 'su-bank',       name: 'Business Checking Account',           notes: 'Kennebunk Savings or TD Bank. Local preferred for SBA future.', cat: 'Legal &amp; Financial Foundation', lean: 0,  std: 25 },
    { id: 'su-gl',         name: 'General Liability Insurance ($1M)',   notes: 'Progressive Commercial or Next Insurance. Required before first job.', cat: 'Legal &amp; Financial Foundation', lean: 800, std: 1400 },
    { id: 'su-trailer',    name: 'Utility Trailer (used 6x12 or 7x14)', notes: 'Facebook Marketplace Maine. Big Tex or Sure-Trac, prioritize ramp gate. Confirm GVWR sticker before buying: 2023 Durango Hemi tows 6,200-8,700 lbs depending on trim/tow package.', cat: 'Equipment &amp; Vehicle', lean: 1500, std: 3500 },
    { id: 'su-hitchball',  name: 'Hitch Ball Mount, Ball &amp; Pin',         notes: 'Durango tow package = 2in receiver. Match ball size (almost always 2in) to the trailer coupler. Class III/IV mount, any auto parts store.', cat: 'Equipment &amp; Vehicle', lean: 25, std: 40 },
    { id: 'su-wiring',     name: 'Trailer Wiring Harness Adapter',      notes: 'Check for a 4-pin or 7-pin plug near the receiver first. Factory tow package usually has it pre-wired; if not, plug-and-play Curt/Tekonsha harness, no splicing. Only needed if trailer has NO electric brakes.', cat: 'Equipment &amp; Vehicle', lean: 0, std: 60 },
    { id: 'su-brakectrl',  name: 'Trailer Brake Controller + 7-Way Wiring Kit', notes: 'Only required if trailer has electric brakes (and GVWR &gt; 3,000 lbs per Maine law). Check the trailer\'s GVWR sticker on the tongue. If it does, a bundled plug-and-play kit (7-way wiring + Tekonsha brake controller, ~$380, no splicing) covers both this and the wiring line above.', cat: 'Equipment &amp; Vehicle', lean: 0, std: 380 },
    { id: 'su-trailerreg', name: 'Trailer Registration (Maine)',        notes: 'Register at your town office (Arundel/Kennebunk), not a BMV branch. Bring bill of sale + prior title/registration. Pay local excise tax + state fee. Plate must be on before towing on public roads.', cat: 'Equipment &amp; Vehicle', lean: 35,   std: 55 },
    { id: 'su-trailerlock',name: 'Coupler Lock, Safety Chains &amp; Wheel Chocks', notes: 'Coupler lock deters theft when the trailer is parked at a job site or home. Safety chains are required by Maine law as a backup to the hitch.', cat: 'Equipment &amp; Vehicle', lean: 30, std: 60 },
    { id: 'su-dolly',      name: 'Hand Truck + Appliance Dolly',        notes: 'Harbor Freight. Both essential.',                            cat: 'Equipment &amp; Vehicle', lean: 120,  std: 200 },
    { id: 'su-straps',     name: 'Moving Straps, Blankets &amp; Gloves',     notes: 'Amazon or Home Depot Biddeford.',                            cat: 'Equipment &amp; Vehicle', lean: 80,   std: 150 },
    { id: 'su-magnets',    name: 'Truck/Trailer Magnets (logo)',        notes: 'Signarama Biddeford or VistaPrint. 12x18" or 18x24" per door.', cat: 'Equipment &amp; Vehicle', lean: 80, std: 180 },
    { id: 'su-email',      name: 'Google Workspace Email (1 yr)',       notes: 'name@yourcompany.com looks professional everywhere.',       cat: 'Branding, Digital &amp; Resale Setup', lean: 72, std: 72 },
    { id: 'su-website',    name: 'Website (Squarespace annual)',        notes: 'Business plan for booking integration.',                    cat: 'Branding, Digital &amp; Resale Setup', lean: 192, std: 288 },
    { id: 'su-logo',       name: 'Logo Design (Canva Pro, 1 yr)',       notes: 'DIY in Canva for free, or Canva Pro for premium assets.',   cat: 'Branding, Digital &amp; Resale Setup', lean: 0,  std: 130 },
    { id: 'su-cards',      name: 'Business Cards (500 qty)',            notes: 'Vistaprint or local Minuteman Press Biddeford.',             cat: 'Branding, Digital &amp; Resale Setup', lean: 40,  std: 80 },
    { id: 'su-square',     name: 'Square Card Reader',                  notes: 'Free reader available by mail. 2.6% per swipe.',             cat: 'Branding, Digital &amp; Resale Setup', lean: 0,   std: 50 },
    { id: 'su-ebay',       name: 'eBay Starter Store (1 yr)',           notes: '$21.95/month. 250 free listings/month, lower final value fees.', cat: 'Branding, Digital &amp; Resale Setup', lean: 0, std: 263 },
    { id: 'su-ads',        name: 'Initial Facebook Ad Budget',          notes: 'York County geo-targeted. $10-15/day for 2-4 weeks.',        cat: 'Branding, Digital &amp; Resale Setup', lean: 200, std: 400 },
    { id: 'su-dumpres',    name: 'Dump Fee Reserve (first month)',      notes: 'Arundel Transfer Station: ~$40/yard construction debris.',      cat: 'Operating Reserves &amp; Buffer', lean: 300, std: 500 },
    { id: 'su-buyres',     name: 'Buying Reserve (first month)',        notes: 'Cash float to buy items at jobs.',                           cat: 'Operating Reserves &amp; Buffer', lean: 300, std: 500 },
    { id: 'su-misc',       name: 'Miscellaneous / Buffer',              notes: 'Tarps, bungee cords, work boots, first aid kit.',            cat: 'Operating Reserves &amp; Buffer', lean: 300, std: 300 }
  ];

  var MONTHLY_ITEMS = [
    { id: 'mo-dump',     name: 'Dump / Transfer Station Fees', notes: 'Scales with job volume; ~$75-100/load average.',      low: 300, high: 600, def: 450 },
    { id: 'mo-fuel',     name: 'Fuel (tow vehicle + trailer)', notes: '12-16 mpg towing, York County / Southern Maine driving.', low: 350, high: 600, def: 475 },
    { id: 'mo-gl',       name: 'General Liability Insurance',  notes: 'Monthly installment of annual premium.',                low: 80,  high: 120, def: 100 },
    { id: 'mo-phone',    name: 'Phone / Mobile Data',          notes: 'Business line or dedicated data plan for listings.',    low: 50,  high: 80,  def: 65 },
    { id: 'mo-ebayfees', name: 'eBay Store + Platform Fees',   notes: 'Store subscription + ~12-15% final value fee on sales.', low: 50, high: 100, def: 75 },
    { id: 'mo-fbfees',   name: 'Facebook / Mercari Selling Fees', notes: 'FB Marketplace 5% shipped; Mercari 10%.',             low: 20,  high: 60,  def: 40 },
    { id: 'mo-google',   name: 'Google Workspace / Website',   notes: 'Email + Squarespace hosting.',                          low: 30,  high: 45,  def: 38 },
    { id: 'mo-marketing',name: 'Ongoing Marketing (FB ads, boosted posts)', notes: 'Reduce or eliminate once organic referrals flow.', low: 100, high: 300, def: 150 },
    { id: 'mo-supplies', name: 'Supplies (bags, gloves, straps)', notes: 'Monthly replenishment.',                              low: 30,  high: 75,  def: 50 },
    { id: 'mo-maint',    name: 'Trailer Maintenance Reserve',  notes: 'Tires, bearing grease, lights.',                        low: 30,  high: 60,  def: 45 },
    { id: 'mo-books',    name: 'Bookkeeping (Wave / QuickBooks)', notes: 'Wave Accounting is free; upgrade as revenue grows.', low: 0,   high: 30,  def: 15 }
  ];

  var JOB_TYPES = [
    { id: 'single',   name: 'Single Item',                  priceLow: 50,   priceHigh: 90,   volume: 0.5, mattresses: 0 },
    { id: 'small',    name: 'Small Load (1/4 trailer)',     priceLow: 150,  priceHigh: 225,  volume: 1.5, mattresses: 0 },
    { id: 'medium',   name: 'Medium Load (1/2 trailer)',    priceLow: 275,  priceHigh: 375,  volume: 3,   mattresses: 0 },
    { id: 'full',     name: 'Full Load (full trailer)',     priceLow: 450,  priceHigh: 625,  volume: 5,   mattresses: 1 },
    { id: 'cleanout', name: 'Full Property Cleanout',       priceLow: 500,  priceHigh: 1500, volume: 10,  mattresses: 1 },
    { id: 'estate',   name: 'Estate / Whole-House Cleanout',priceLow: 1200, priceHigh: 3500, volume: 16,  mattresses: 2 },
    { id: 'hoarding', name: 'Hoarding / Severe Cleanout',   priceLow: 1500, priceHigh: 5000, volume: 22,  mattresses: 3 }
  ];

  var TEN_YEAR_OPTIMISTIC = [
    { yr: 1,  phase: 'Side Hustle',         ops: '2-3 jobs/wk; solo; trailer',                    grossLow: 35000,  grossHigh: 55000,  netLow: 20000,  netHigh: 35000,  milestone: '$5K/mo &middot; Prove model, build reviews, lock in agent referrals' },
    { yr: 2,  phase: 'Side-to-Full',        ops: '4-5 jobs/wk; occasional helper',                grossLow: 80000,  grossHigh: 130000, netLow: 50000,  netHigh: 85000,  milestone: '$10K/mo &middot; Full-time decision point; Month 12-18 transition' },
    { yr: 3,  phase: 'Full-Time',           ops: '5-6 jobs/wk; regular helper; dedicated truck',  grossLow: 160000, grossHigh: 230000, netLow: 95000,  netHigh: 145000, milestone: '$100K/yr &middot; First truck purchase; agent network fully producing' },
    { yr: 4,  phase: 'Growth',              ops: '6-8 jobs/wk; 1-2 helpers; 2 vehicles',          grossLow: 220000, grossHigh: 320000, netLow: 130000, netHigh: 200000, milestone: '$250K/yr &middot; Process and SOP development; crew lead hire' },
    { yr: 5,  phase: 'Scale',               ops: '2 trucks operating; crew lead; GM emerging',     grossLow: 350000, grossHigh: 540000, netLow: 200000, netHigh: 330000, milestone: '$500K/yr &middot; Consider second market: Portsmouth NH or Cumberland County' },
    { yr: 6,  phase: 'Multi-Market',        ops: '2 trucks across 2 markets; crew lead running daily ops', grossLow: 420000, grossHigh: 620000, netLow: 240000, netHigh: 370000, milestone: '$550K/yr &middot; Second market online (Portsmouth NH or Cumberland County)' },
    { yr: 7,  phase: 'Optimization',        ops: '3rd truck added; standardized pricing &amp; SOPs across markets', grossLow: 480000, grossHigh: 700000, netLow: 270000, netHigh: 410000, milestone: '$650K/yr &middot; Owner shifts toward oversight and sales' },
    { yr: 8,  phase: 'Regional Operator',   ops: '3 trucks; GM running daily ops; owner focused on growth', grossLow: 550000, grossHigh: 800000, netLow: 310000, netHigh: 470000, milestone: '$750K/yr &middot; Evaluate 3rd market or licensing/franchise model' },
    { yr: 9,  phase: 'Maturity',            ops: '3-4 trucks; established regional brand &amp; referral network', grossLow: 620000, grossHigh: 900000, netLow: 350000, netHigh: 530000, milestone: '$850K/yr &middot; Fleet refresh, larger yard/warehouse' },
    { yr: 10, phase: 'Established Brand',   ops: '4 trucks across 3 markets; full management layer', grossLow: 700000, grossHigh: 1000000, netLow: 400000, netHigh: 600000, milestone: '$1M/yr &middot; Decade mark: reinvest, sell, or franchise decision point' }
  ];

  var TEN_YEAR_REALISTIC = [
    { yr: 1,  phase: 'Side Hustle (Slow Start)', ops: '0-1 jobs/wk months 1-3, ramping to 2-3/wk by Q4; solo; trailer', grossLow: 18000,  grossHigh: 32000,  netLow: 10000,  netHigh: 20000,  milestone: 'Months 1-3 building reviews &amp; referrals before volume kicks in' },
    { yr: 2,  phase: 'Side-to-Full',        ops: '3-4 jobs/wk; occasional helper',                grossLow: 50000,  grossHigh: 85000,  netLow: 28000,  netHigh: 52000,  milestone: '$4-7K/mo avg &middot; Full-time decision delayed to Month 18-24' },
    { yr: 3,  phase: 'Approaching Full-Time', ops: '4-5 jobs/wk; helper part of the year',         grossLow: 100000, grossHigh: 160000, netLow: 58000,  netHigh: 98000,  milestone: '$60-90K/yr &middot; Dedicated truck purchase considered' },
    { yr: 4,  phase: 'Full-Time',           ops: '5-6 jobs/wk; 1 helper; dedicated truck',         grossLow: 160000, grossHigh: 240000, netLow: 92000,  netHigh: 150000, milestone: '$150K/yr &middot; First truck purchase; agent network maturing' },
    { yr: 5,  phase: 'Growth',              ops: '6-7 jobs/wk; 1-2 helpers; 2 vehicles',           grossLow: 230000, grossHigh: 340000, netLow: 130000, netHigh: 210000, milestone: '$250-300K/yr &middot; Second vehicle added' },
    { yr: 6,  phase: 'Scale',               ops: '2 trucks operating; crew lead emerging',         grossLow: 290000, grossHigh: 430000, netLow: 165000, netHigh: 265000, milestone: '$350K/yr &middot; Consider second market' },
    { yr: 7,  phase: 'Multi-Market',        ops: '2 trucks across 2 markets',                      grossLow: 350000, grossHigh: 520000, netLow: 200000, netHigh: 320000, milestone: '$450K/yr &middot; Second market online' },
    { yr: 8,  phase: 'Regional Operator',   ops: '2-3 trucks; GM role developing',                 grossLow: 410000, grossHigh: 610000, netLow: 235000, netHigh: 375000, milestone: '$550K/yr &middot; Standardize SOPs, evaluate 3rd truck' },
    { yr: 9,  phase: 'Maturity',            ops: '3 trucks; established referral network',         grossLow: 470000, grossHigh: 700000, netLow: 270000, netHigh: 430000, milestone: '$650K/yr &middot; Owner shifting toward oversight' },
    { yr: 10, phase: 'Established Brand',   ops: '3 trucks across 2-3 markets',                    grossLow: 540000, grossHigh: 800000, netLow: 310000, netHigh: 490000, milestone: '$750K/yr &middot; Decade mark: reinvest, sell, or franchise decision point' }
  ];

  var outlookScenario = 'realistic';

  var CHECKLIST = [
    {
      week: 'Week 1: Legal &amp; Financial Foundation',
      items: [
        { id: 'cl-1', text: 'Register Maine LLC at maine.gov/sos', cost: '$175', time: '1-2 hrs online' },
        { id: 'cl-2', text: 'Verify business name availability (SOS, Google, social, domain)', cost: '$0', time: '30 min' },
        { id: 'cl-3', text: 'Get EIN from IRS.gov', cost: '$0', time: '10 min' },
        { id: 'cl-4', text: 'Open business checking account', cost: '$0', time: '1 hr' },
        { id: 'cl-5', text: 'Purchase General Liability Insurance ($1M / $2M agg)', cost: '$800-1,400/yr', time: '1-2 hrs' }
      ]
    },
    {
      week: 'Week 2: Towing Setup, Equipment &amp; Identity',
      items: [
        { id: 'cl-6',  text: 'Source and purchase utility trailer (verify GVWR sticker vs. Durango tow rating)', cost: '$1,500-3,500', time: 'Variable' },
        { id: 'cl-6a', text: 'Confirm hitch receiver size (Durango tow package = 2in) and buy matching ball mount + ball + pin', cost: '$25-40', time: '15 min' },
        { id: 'cl-6b', text: 'Check for factory 4/7-pin wiring plug near the receiver and confirm whether the trailer has electric brakes; install adapter harness if missing, then test lights/brakes/turn signals', cost: '$0-60', time: '30-60 min' },
        { id: 'cl-6c', text: 'If trailer GVWR &gt; 3,000 lbs with electric brakes, install in-cab brake controller (plug-and-play 7-way wiring + controller kit, no splicing)', cost: '$0-380', time: '1-2 hrs (or shop install)' },
        { id: 'cl-6d', text: 'Attach safety chains, install coupler lock, pack wheel chocks', cost: '$30-60', time: '15 min' },
        { id: 'cl-7',  text: 'Register trailer at town office (bring bill of sale + prior title/registration, pay excise tax + plate fee)', cost: '$35-55', time: '1 hr' },
        { id: 'cl-8',  text: 'Design logo in Canva (navy + accent color)', cost: '$0-130/yr', time: '2-3 hrs' },
        { id: 'cl-9',  text: 'Order truck magnets', cost: '$80-180', time: '1 week lead' },
        { id: 'cl-10', text: 'Order business cards (500 qty)', cost: '$40-80', time: '1 week lead' },
        { id: 'cl-11', text: 'Buy equipment kit (dolly, straps, blankets, gloves, tarp, bags)', cost: '$180-350', time: '1-2 hrs' }
      ]
    },
    {
      week: 'Week 2-3: Digital Presence',
      items: [
        { id: 'cl-12', text: 'Set up &amp; verify Google Business Profile', cost: '$0', time: '45 min' },
        { id: 'cl-13', text: 'Create Facebook Business Page', cost: '$0', time: '30 min' },
        { id: 'cl-14', text: 'Create Instagram Business Account', cost: '$0', time: '20 min' },
        { id: 'cl-15', text: 'Build website (Home, Services + Pricing, How It Works, About, Contact)', cost: '$192-288/yr', time: '4-6 hrs' },
        { id: 'cl-16', text: 'Set up booking system (Acuity / Calendly)', cost: '$0-20/mo', time: '1 hr' },
        { id: 'cl-17', text: 'Set up Square for payments', cost: '$0', time: '20 min' }
      ]
    },
    {
      week: 'Week 3: Resale Platform Setup',
      items: [
        { id: 'cl-18', text: 'Create eBay Seller Account + Starter Store', cost: '$21.95/mo', time: '1 hr' },
        { id: 'cl-19', text: 'Set up Mercari account', cost: '$0', time: '20 min' },
        { id: 'cl-20', text: 'Set up Facebook Marketplace seller profile', cost: '$0', time: '15 min' }
      ]
    },
    {
      week: 'Week 4: Network Activation + First Job',
      items: [
        { id: 'cl-21', text: 'Call top real estate agent contacts (personal pitch, not email)', cost: '$0', time: '30 min' },
        { id: 'cl-22', text: 'Text/email full real estate agent contact list', cost: '$0', time: '1 hr' },
        { id: 'cl-23', text: 'Post intro in local Facebook community groups', cost: '$0', time: '30 min' },
        { id: 'cl-24', text: 'Run first Facebook ad campaign (lead gen, geo-targeted)', cost: '$150-300', time: '1 hr setup' },
        { id: 'cl-25', text: 'Complete first test job and document with photos/video', cost: 'Discounted', time: 'Variable' }
      ]
    },
    {
      week: 'Week 5-8: Reviews &amp; Momentum',
      items: [
        { id: 'cl-26', text: 'Aggressively collect Google reviews after every job', cost: '$0', time: 'Ongoing' },
        { id: 'cl-27', text: 'List all purchased items on eBay/FB/Mercari within 48 hrs', cost: '$0', time: '1-2 hrs/batch' },
        { id: 'cl-28', text: 'Post first before/after content (Reels)', cost: '$0', time: '30 min' },
        { id: 'cl-29', text: 'Join local REALTOR council events for referral visibility', cost: '$0-50', time: 'Ongoing' }
      ]
    }
  ];

  // ---------- HELPERS ----------

  function fmt(n) {
    var sign = n < 0 ? '-' : '';
    return sign + '$' + Math.round(Math.abs(n)).toLocaleString();
  }

  function $(id) {
    return document.getElementById(id);
  }

  function num(id) {
    var el = $(id);
    if (!el) return 0;
    var v = parseFloat(el.value);
    return isNaN(v) ? 0 : v;
  }

  var STORE_PREFIX = 'nh_planner_';

  function saveVal(id, val) {
    try {
      localStorage.setItem(STORE_PREFIX + id, val);
    } catch (e) { /* storage unavailable */ }
  }

  function loadVal(id) {
    try {
      return localStorage.getItem(STORE_PREFIX + id);
    } catch (e) {
      return null;
    }
  }

  function bindPersist(el) {
    var saved = loadVal(el.id);
    if (saved !== null) {
      if (el.type === 'checkbox') {
        el.checked = saved === 'true';
      } else {
        el.value = saved;
      }
    }
    var evt = (el.type === 'checkbox' || el.tagName === 'SELECT') ? 'change' : 'input';
    el.addEventListener(evt, function () {
      var v = el.type === 'checkbox' ? el.checked : el.value;
      saveVal(el.id, v);
    });
  }

  // ---------- STARTUP TABLE ----------

  function renderStartupTable() {
    var body = $('startup-body');
    var html = '';
    var lastCat = null;

    STARTUP_ITEMS.forEach(function (item) {
      if (item.cat !== lastCat) {
        html += '<tr class="cat-row"><td colspan="4">' + item.cat + '</td></tr>';
        lastCat = item.cat;
      }
      html += '<tr data-cat="' + item.cat + '">' +
        '<td class="cell-name">' + item.name + '<span class="cell-note">' + item.notes + '</span></td>' +
        '<td class="cell-range">' + fmt(item.lean) + ' &ndash; ' + fmt(item.std) + '</td>' +
        '<td class="cell-input"><div class="input-prefix">$<input type="number" min="0" step="5" id="' + item.id + '" class="cost-input" value="' + item.lean + '"></div></td>' +
        '<td class="cell-include"><label class="switch"><input type="checkbox" id="' + item.id + '-inc" checked><span class="slider"></span></label></td>' +
        '</tr>';
    });

    body.innerHTML = html;

    STARTUP_ITEMS.forEach(function (item) {
      bindPersist($(item.id));
      bindPersist($(item.id + '-inc'));
      $(item.id).addEventListener('input', updateStartupTotal);
      $(item.id + '-inc').addEventListener('change', updateStartupTotal);
    });

    updateStartupTotal();
  }

  function setStartupPreset(which) {
    STARTUP_ITEMS.forEach(function (item) {
      $(item.id).value = which === 'standard' ? item.std : item.lean;
      saveVal(item.id, $(item.id).value);
    });
    updateStartupTotal();
  }

  function updateStartupTotal() {
    var total = 0;
    var byCat = {};

    STARTUP_ITEMS.forEach(function (item) {
      var inc = $(item.id + '-inc').checked;
      var val = num(item.id);
      if (inc) {
        total += val;
        byCat[item.cat] = (byCat[item.cat] || 0) + val;
      }
    });

    $('startup-total').textContent = fmt(total);

    var breakdown = '';
    Object.keys(byCat).forEach(function (cat) {
      breakdown += '<div class="breakdown-row"><span>' + cat + '</span><span>' + fmt(byCat[cat]) + '</span></div>';
    });
    $('startup-breakdown').innerHTML = breakdown;

    // feed monthly overhead reserve cross-link
    updateRevenueDefaults();
  }

  // ---------- MONTHLY OVERHEAD TABLE ----------

  function renderMonthlyTable() {
    var body = $('monthly-body');
    var html = '';

    MONTHLY_ITEMS.forEach(function (item) {
      html += '<tr>' +
        '<td class="cell-name">' + item.name + '<span class="cell-note">' + item.notes + '</span></td>' +
        '<td class="cell-range">' + fmt(item.low) + ' &ndash; ' + fmt(item.high) + '</td>' +
        '<td class="cell-input"><div class="input-prefix">$<input type="number" min="0" step="5" id="' + item.id + '" class="cost-input" value="' + item.def + '"></div></td>' +
        '</tr>';
    });

    body.innerHTML = html;

    MONTHLY_ITEMS.forEach(function (item) {
      bindPersist($(item.id));
      $(item.id).addEventListener('input', updateMonthlyTotal);
    });

    updateMonthlyTotal();
  }

  function updateMonthlyTotal() {
    var total = 0;
    MONTHLY_ITEMS.forEach(function (item) {
      total += num(item.id);
    });
    $('monthly-total').textContent = fmt(total);
    $('monthly-total-annual').textContent = fmt(total * 12) + ' / year';
    updateRevenueDefaults();
    updateBreakeven();
  }

  // ---------- LOAD / JOB COST CALCULATOR ----------

  function populateJobTypeSelect() {
    var sel = $('job-type');
    var html = '';
    JOB_TYPES.forEach(function (jt) {
      html += '<option value="' + jt.id + '">' + jt.name + ' ($' + jt.priceLow + '–$' + jt.priceHigh + ')</option>';
    });
    sel.innerHTML = html;

    sel.addEventListener('change', function () {
      applyJobTypeDefaults();
      updateLoadCalc();
    });
  }

  function applyJobTypeDefaults() {
    var jt = JOB_TYPES.filter(function (j) { return j.id === $('job-type').value; })[0];
    if (!jt) return;
    var mid = Math.round((jt.priceLow + jt.priceHigh) / 2);
    $('job-fee').value = mid;
    $('job-volume').value = jt.volume;
    $('job-mattresses').value = jt.mattresses;
    $('job-range').textContent = 'Typical price range: $' + jt.priceLow.toLocaleString() + ' – $' + jt.priceHigh.toLocaleString();
    saveVal('job-fee', mid);
    saveVal('job-volume', jt.volume);
    saveVal('job-mattresses', jt.mattresses);
  }

  function updateLoadCalc() {
    var serviceFee   = num('job-fee');
    var distance     = num('job-distance');
    var mpg          = num('job-mpg') || 1;
    var fuelPrice    = num('job-fuelprice');
    var volume       = num('job-volume');
    var dumpRate     = num('job-dumprate');
    var mattresses   = num('job-mattresses');
    var mattressFee  = num('job-mattressfee');
    var appliances   = num('job-appliances');
    var applianceFee = num('job-appliancefee');
    var specialFees  = num('job-specialfees');
    var scrapCredit  = num('job-scrap');
    var resaleValue  = num('job-resale');
    var buyPct       = num('job-buypct');
    var sellFeePct   = num('job-sellfeepct');

    var dumpFee = volume * dumpRate + mattresses * mattressFee + appliances * applianceFee + specialFees;
    var fuelCost = (distance / mpg) * fuelPrice;
    var buyDiscount = resaleValue * (buyPct / 100);
    var cashCollected = serviceFee - buyDiscount;
    var sellFee = resaleValue * (sellFeePct / 100);
    var resaleMargin = resaleValue - buyDiscount - sellFee;
    var immediateNet = cashCollected + scrapCredit - dumpFee - fuelCost;
    var totalProfit = immediateNet + resaleMargin;
    var marginPct = serviceFee > 0 ? (totalProfit / serviceFee) * 100 : 0;

    $('out-dumpfee').textContent = fmt(dumpFee);
    $('out-fuelcost').textContent = fmt(fuelCost);
    $('out-cashcollected').textContent = fmt(cashCollected);
    $('out-buydiscount').textContent = fmt(buyDiscount);
    $('out-sellfee').textContent = fmt(sellFee);
    $('out-resalemargin').textContent = fmt(resaleMargin);
    $('out-immediatenet').textContent = fmt(immediateNet);
    $('out-totalprofit').textContent = fmt(totalProfit);
    $('out-marginpct').textContent = (isFinite(marginPct) ? marginPct.toFixed(0) : '0') + '%';

    var profitEl = $('out-totalprofit');
    profitEl.classList.toggle('negative', totalProfit < 0);
    profitEl.classList.toggle('positive', totalProfit >= 0);

    // store last computed averages for revenue projector "use this job" button
    window._lastJobProfit = totalProfit;
    window._lastJobCash = cashCollected + scrapCredit;
    window._lastJobResaleMargin = resaleMargin;
  }

  // ---------- REVENUE & BREAK-EVEN PROJECTOR ----------

  function updateRevenueDefaults() {
    // Pull monthly overhead total into projector if user hasn't customized
    var overheadTotal = 0;
    MONTHLY_ITEMS.forEach(function (item) { overheadTotal += num(item.id); });
    var overheadEl = $('rev-overhead');
    if (overheadEl && overheadEl.dataset.linked !== 'false') {
      overheadEl.value = Math.round(overheadTotal);
    }
    updateRevenueProjection();
  }

  function useLastJobForRevenue() {
    if (window._lastJobProfit === undefined) return;
    $('rev-profitperjob').value = Math.round(window._lastJobProfit);
    saveVal('rev-profitperjob', $('rev-profitperjob').value);
    updateRevenueProjection();
  }

  function updateRevenueProjection() {
    var jobsPerWeek = num('rev-jobsperweek');
    var profitPerJob = num('rev-profitperjob');
    var revenuePerJob = num('rev-revenueperjob');
    var overhead = num('rev-overhead');

    var weeksPerMonth = 4.345;

    var weeklyRevenue = jobsPerWeek * revenuePerJob;
    var monthlyRevenue = weeklyRevenue * weeksPerMonth;
    var annualRevenue = monthlyRevenue * 12;

    var monthlyJobProfit = jobsPerWeek * weeksPerMonth * profitPerJob;
    var monthlyNet = monthlyJobProfit - overhead;
    var annualNet = monthlyNet * 12;

    $('rev-weekly').textContent = fmt(weeklyRevenue);
    $('rev-monthly').textContent = fmt(monthlyRevenue);
    $('rev-annual').textContent = fmt(annualRevenue);
    $('rev-monthlynet').textContent = fmt(monthlyNet);
    $('rev-annualnet').textContent = fmt(annualNet) + ' / year';

    var netEl = $('rev-monthlynet');
    netEl.classList.toggle('negative', monthlyNet < 0);
    netEl.classList.toggle('positive', monthlyNet >= 0);

    updateBreakeven();
  }

  function updateBreakeven() {
    var profitPerJob = num('rev-profitperjob');
    var overhead = num('rev-overhead');
    var weeksPerMonth = 4.345;

    if (profitPerJob <= 0) {
      $('be-breakeven').textContent = 'N/A';
      $('be-target3k').textContent = 'N/A';
      $('be-target6k').textContent = 'N/A';
      return;
    }

    var breakevenJobsMonth = overhead / profitPerJob;
    var target3kJobsMonth = (overhead + 3000) / profitPerJob;
    var target6kJobsMonth = (overhead + 6000) / profitPerJob;

    $('be-breakeven').textContent = (breakevenJobsMonth / weeksPerMonth).toFixed(1) + ' jobs/week';
    $('be-target3k').textContent = (target3kJobsMonth / weeksPerMonth).toFixed(1) + ' jobs/week';
    $('be-target6k').textContent = (target6kJobsMonth / weeksPerMonth).toFixed(1) + ' jobs/week';
  }

  // ---------- 10-YEAR OUTLOOK ----------

  function renderFiveYear() {
    var data = outlookScenario === 'optimistic' ? TEN_YEAR_OPTIMISTIC : TEN_YEAR_REALISTIC;
    var body = $('fiveyear-body');
    var maxGross = Math.max.apply(null, TEN_YEAR_OPTIMISTIC.map(function (y) { return y.grossHigh; }));
    var html = '';

    data.forEach(function (y) {
      var lowPct = (y.grossLow / maxGross) * 100;
      var highPct = (y.grossHigh / maxGross) * 100;
      html += '<tr>' +
        '<td class="fy-year">Year ' + y.yr + '<span class="fy-phase">' + y.phase + '</span></td>' +
        '<td class="fy-ops">' + y.ops + '</td>' +
        '<td class="fy-bar-cell">' +
          '<div class="fy-bar-track">' +
            '<div class="fy-bar" style="left:' + lowPct + '%; width:' + (highPct - lowPct) + '%;"></div>' +
          '</div>' +
          '<span class="fy-bar-label">' + fmt(y.grossLow) + ' &ndash; ' + fmt(y.grossHigh) + '</span>' +
        '</td>' +
        '<td class="fy-net">' + fmt(y.netLow) + ' &ndash; ' + fmt(y.netHigh) + '</td>' +
        '<td class="fy-milestone">' + y.milestone + '</td>' +
        '</tr>';
    });

    body.innerHTML = html;
  }

  function setOutlookScenario(which) {
    outlookScenario = which;
    saveVal('outlook-scenario', which);
    $('btn-outlook-realistic').classList.toggle('active', which === 'realistic');
    $('btn-outlook-optimistic').classList.toggle('active', which === 'optimistic');
    $('outlook-scenario-note').textContent = which === 'optimistic'
      ? 'Optimistic: assumes near-flawless execution from week one, with no slow ramp-up period.'
      : 'Realistic: accounts for a slow ramp-up and a growth curve about a year behind the optimistic plan.';
    renderFiveYear();
  }

  // ---------- LAUNCH CHECKLIST ----------

  function renderChecklist() {
    var container = $('checklist-container');
    var html = '';
    var totalItems = 0;

    CHECKLIST.forEach(function (group) {
      html += '<div class="checklist-group">';
      html += '<h3>' + group.week + '</h3>';
      group.items.forEach(function (item) {
        totalItems++;
        html += '<label class="checklist-item" for="' + item.id + '">' +
          '<input type="checkbox" id="' + item.id + '">' +
          '<span class="checklist-box" aria-hidden="true">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' +
          '</span>' +
          '<span class="checklist-text">' + item.text + '</span>' +
          '<span class="checklist-meta"><span class="checklist-cost">' + item.cost + '</span><span class="checklist-time">' + item.time + '</span></span>' +
          '</label>';
      });
      html += '</div>';
    });

    container.innerHTML = html;

    CHECKLIST.forEach(function (group) {
      group.items.forEach(function (item) {
        var el = $(item.id);
        bindPersist(el);
        el.addEventListener('change', updateChecklistProgress);
      });
    });

    $('checklist-total').textContent = totalItems;
    updateChecklistProgress();
  }

  function updateChecklistProgress() {
    var done = 0;
    var total = 0;
    CHECKLIST.forEach(function (group) {
      group.items.forEach(function (item) {
        total++;
        if ($(item.id).checked) done++;
      });
    });
    var pct = total > 0 ? Math.round((done / total) * 100) : 0;
    $('checklist-done').textContent = done;
    $('checklist-progress-bar').style.width = pct + '%';
    $('checklist-progress-pct').textContent = pct + '%';
  }

  // ---------- TAB / SCROLL NAV ----------

  function setupTabNav() {
    var links = document.querySelectorAll('.planner-nav a');
    var sections = [];
    links.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var section = $(id);
      if (section) sections.push({ link: link, section: section });
    });

    function onScroll() {
      var scrollPos = window.scrollY + 140;
      var current = sections[0];
      sections.forEach(function (s) {
        if (s.section.offsetTop <= scrollPos) current = s;
      });
      sections.forEach(function (s) {
        s.link.classList.toggle('active', s === current);
      });
    }

    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  // ---------- RESET ----------

  function resetAll() {
    if (!window.confirm('Reset all planner values to defaults? This cannot be undone.')) return;
    try {
      Object.keys(localStorage).forEach(function (key) {
        if (key.indexOf(STORE_PREFIX) === 0) localStorage.removeItem(key);
      });
    } catch (e) { /* ignore */ }
    location.reload();
  }

  // ---------- PRICE CHECK ----------

  // Set this to your deployed pricing worker URL (see /worker/wrangler.toml).
  var PRICE_API_URL = 'https://nethauls-pricing-api.YOUR-SUBDOMAIN.workers.dev';

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
  }

  function formatPriceUSD(value, currency) {
    if (typeof value !== 'number') return '—';
    try {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency || 'USD' }).format(value);
    } catch (e) {
      return '$' + value.toFixed(2);
    }
  }

  function renderPriceCheckLoading(query) {
    $('pc-results').innerHTML =
      '<div class="pc-status">' +
        '<div class="pc-spinner"></div>' +
        '<p>Searching live listings for &ldquo;' + escapeHtml(query) + '&rdquo;&hellip;</p>' +
      '</div>';
  }

  function renderPriceCheckError(message) {
    $('pc-results').innerHTML =
      '<div class="pc-status is-error">' +
        '<p>' + escapeHtml(message) + '</p>' +
      '</div>';
  }

  function renderPriceCheckResults(data) {
    var stats = data.stats;
    var items = data.items || [];

    if (items.length === 0) {
      $('pc-results').innerHTML =
        '<p class="pc-empty">No comparable listings found. Try a more general search term, or just the brand and item type.</p>';
      return;
    }

    var currency = items[0].currency;
    var summaryHtml = '';
    if (stats) {
      summaryHtml =
        '<div class="be-grid">' +
          '<div class="be-card pc-stat highlight">' +
            '<p class="be-label">Suggested Range</p>' +
            '<p class="be-value">' + formatPriceUSD(stats.suggestedLow, currency) + ' &ndash; ' + formatPriceUSD(stats.suggestedHigh, currency) + '</p>' +
          '</div>' +
          '<div class="be-card pc-stat">' +
            '<p class="be-label">Median Asking</p>' +
            '<p class="be-value">' + formatPriceUSD(stats.median, currency) + '</p>' +
          '</div>' +
          '<div class="be-card pc-stat">' +
            '<p class="be-label">Low / High</p>' +
            '<p class="be-value">' + formatPriceUSD(stats.min, currency) + ' &ndash; ' + formatPriceUSD(stats.max, currency) + '</p>' +
          '</div>' +
        '</div>';
    }

    var cardsHtml = items.map(function (item) {
      return (
        '<div class="pc-card">' +
          '<div class="pc-card-thumb">' +
            (item.image ? '<img src="' + escapeHtml(item.image) + '" alt="' + escapeHtml(item.title) + '" loading="lazy">' : '') +
            (item.condition ? '<span class="pc-card-condition">' + escapeHtml(item.condition) + '</span>' : '') +
          '</div>' +
          '<div class="pc-card-body">' +
            '<p class="pc-card-title">' + escapeHtml(item.title) + '</p>' +
            '<p class="pc-card-price">' + formatPriceUSD(item.price, item.currency) + '</p>' +
            '<a class="pc-card-link" href="' + escapeHtml(item.url) + '" target="_blank" rel="noopener">View on eBay &rarr;</a>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    $('pc-results').innerHTML =
      summaryHtml +
      '<p class="pc-meta">' + items.length + ' comparable listing' + (items.length === 1 ? '' : 's') + ' for &ldquo;' + escapeHtml(data.query) + '&rdquo;</p>' +
      '<div class="pc-grid">' + cardsHtml + '</div>' +
      '<p class="pc-disclaimer">Prices reflect current eBay asking prices, not confirmed sale prices. Use as a starting point for your offer and resale price.</p>';
  }

  function setupPriceCheck() {
    var form = $('pc-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var query = $('pc-query').value.trim();
      if (!query) return;

      var submitBtn = $('pc-submit');
      submitBtn.disabled = true;
      renderPriceCheckLoading(query);

      fetch(PRICE_API_URL + '?q=' + encodeURIComponent(query))
        .then(function (res) {
          return res.json().then(function (data) {
            if (!res.ok) throw new Error(data.error || 'Something went wrong.');
            return data;
          });
        })
        .then(renderPriceCheckResults)
        .catch(function (err) {
          renderPriceCheckError(err.message || 'Network error — please try again.');
        })
        .finally(function () {
          submitBtn.disabled = false;
        });
    });
  }

  // ---------- INIT ----------

  document.addEventListener('DOMContentLoaded', function () {
    renderStartupTable();
    renderMonthlyTable();
    populateJobTypeSelect();
    setOutlookScenario(loadVal('outlook-scenario') || 'realistic');
    renderChecklist();
    setupTabNav();

    // Bind persisted simple inputs in load calculator + revenue projector
    ['job-fee', 'job-distance', 'job-mpg', 'job-fuelprice', 'job-volume', 'job-dumprate',
     'job-mattresses', 'job-mattressfee', 'job-appliances', 'job-appliancefee', 'job-specialfees',
     'job-scrap', 'job-resale', 'job-buypct', 'job-sellfeepct',
     'rev-jobsperweek', 'rev-profitperjob', 'rev-revenueperjob', 'rev-overhead'].forEach(function (id) {
      var el = $(id);
      if (!el) return;
      bindPersist(el);
    });

    var jobTypeSaved = loadVal('job-type');
    if (jobTypeSaved) $('job-type').value = jobTypeSaved;
    if (loadVal('job-fee') === null) {
      applyJobTypeDefaults();
    } else {
      var jt = JOB_TYPES.filter(function (j) { return j.id === $('job-type').value; })[0];
      if (jt) $('job-range').textContent = 'Typical price range: $' + jt.priceLow.toLocaleString() + ' – $' + jt.priceHigh.toLocaleString();
    }
    $('job-type').addEventListener('change', function () { saveVal('job-type', $('job-type').value); });

    ['job-fee', 'job-distance', 'job-mpg', 'job-fuelprice', 'job-volume', 'job-dumprate',
     'job-mattresses', 'job-mattressfee', 'job-appliances', 'job-appliancefee', 'job-specialfees',
     'job-scrap', 'job-resale', 'job-buypct', 'job-sellfeepct'].forEach(function (id) {
      $(id).addEventListener('input', updateLoadCalc);
    });
    updateLoadCalc();

    // overhead link toggle: if user edits overhead manually, stop auto-syncing
    $('rev-overhead').dataset.linked = loadVal('rev-overhead-linked') || 'true';
    if ($('rev-overhead').dataset.linked === 'false' && loadVal('rev-overhead') !== null) {
      $('rev-overhead').value = loadVal('rev-overhead');
    }
    $('rev-overhead').addEventListener('input', function () {
      $('rev-overhead').dataset.linked = 'false';
      saveVal('rev-overhead-linked', 'false');
    });

    ['rev-jobsperweek', 'rev-profitperjob', 'rev-revenueperjob', 'rev-overhead'].forEach(function (id) {
      $(id).addEventListener('input', updateRevenueProjection);
    });

    updateRevenueDefaults();
    updateRevenueProjection();

    $('btn-preset-lean').addEventListener('click', function () { setStartupPreset('lean'); });
    $('btn-preset-standard').addEventListener('click', function () { setStartupPreset('standard'); });
    $('btn-outlook-realistic').addEventListener('click', function () { setOutlookScenario('realistic'); });
    $('btn-outlook-optimistic').addEventListener('click', function () { setOutlookScenario('optimistic'); });
    $('btn-use-job-profit').addEventListener('click', useLastJobForRevenue);
    $('btn-reset-all').addEventListener('click', resetAll);

    setupPriceCheck();

    // ---------- Scroll progress + reveal (visual polish) ----------
    var progressBar = $('scroll-progress');
    function updateProgress() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    }
    window.addEventListener('scroll', updateProgress);
    updateProgress();

    var revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      revealEls.forEach(function (el) { revealObserver.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('active'); });
    }

    // Mobile nav toggle
    var navToggle = $('nav-toggle');
    var navLinks = $('planner-nav-links');
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', function () {
        var active = navLinks.classList.toggle('active');
        navToggle.classList.toggle('active', active);
      });
      navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          navLinks.classList.remove('active');
          navToggle.classList.remove('active');
        });
      });
    }
  });

})();
