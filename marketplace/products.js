/*
  NETHAULS MARKETPLACE — PRODUCT CATALOG
  =======================================

  HOW TO ADD A NEW LISTING
  -------------------------
  1. Drop a photo of the item into the marketplace/images/ folder
     (e.g. marketplace/images/oak-dresser.jpg). Square or 4:3 photos
     work best. You can include multiple photos per item as an array.

  2. Copy one of the objects below and add it to the PRODUCTS array.
     Fill in:
       - id:          a short unique slug, no spaces (e.g. "oak-dresser")
       - title:       short item name
       - price:       number, no dollar sign (e.g. 85)
       - category:    one of the CATEGORIES listed below (or add a new one
                       to the CATEGORIES array too)
       - condition:   "New", "Like New", "Good", "Fair", or "For Parts"
       - description: a sentence or two about the item
       - images:      array of file paths inside images/, e.g.
                       ["images/oak-dresser-1.jpg", "images/oak-dresser-2.jpg"]
       - location:    town where the item can be picked up
       - sold:        false (set to true once it sells — sold items
                       still show but are marked SOLD and can't be inquired about)

  3. Save this file and push to GitHub. The new item appears automatically
     at the top of the marketplace (newest listings show first).

  4. To remove a listing entirely, just delete its object from the array.

  If you don't have a photo yet, leave images as ["images/placeholder.svg"]
  and swap it in later.
*/

const CATEGORIES = [
  "Furniture",
  "Tools & Equipment",
  "Electronics & Appliances",
  "Outdoor & Sporting Goods",
  "Antiques & Collectibles",
  "Home & Decor",
  "Other"
];

const PRODUCTS = [
  {
    id: "sample-dresser",
    title: "Solid Oak 6-Drawer Dresser",
    price: 165,
    category: "Furniture",
    condition: "Good",
    description: "Heavy, well-built oak dresser with dovetail joints. Minor surface scratches on top, drawers slide smoothly. Pulled from a Kennebunk property during a buying program walkthrough.",
    images: ["images/placeholder.svg"],
    location: "Kennebunk, ME",
    sold: false
  },
  {
    id: "sample-generator",
    title: "Champion 3500W Portable Generator",
    price: 240,
    category: "Tools & Equipment",
    condition: "Like New",
    description: "Runs great, low hours. Comes with original manual and oil. Great for camp, job sites, or backup power.",
    images: ["images/placeholder.svg"],
    location: "Wells, ME",
    sold: false
  },
  {
    id: "sample-grill",
    title: "Weber Genesis Gas Grill",
    price: 195,
    category: "Outdoor & Sporting Goods",
    condition: "Good",
    description: "Three-burner gas grill, clean grates, igniter works. Cover included. Great condition for the price.",
    images: ["images/placeholder.svg"],
    location: "Biddeford, ME",
    sold: false
  },
  {
    id: "sample-recliner",
    title: "Leather Recliner Chair",
    price: 110,
    category: "Furniture",
    condition: "Fair",
    description: "Comfortable brown leather recliner. Some wear on the armrests but mechanism works perfectly. Smoke-free home.",
    images: ["images/placeholder.svg"],
    location: "Sanford, ME",
    sold: true
  }
];
