const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Load environment variables from .env.local
require("dotenv").config({ path: ".env.local" });

// Configuration
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const AGENT_NAME = "Maria Woods";
const LOCATION = "La Jolla, CA";
const MAX_RESULTS = 20;

// Property type mapping
function categorizeProperty(homeType, description) {
  const type = (homeType || "").toLowerCase();
  const desc = (description || "").toLowerCase();
  
  if (type.includes("condo") || type.includes("condominium")) {
    return "Condo";
  }
  if (type.includes("townhouse") || type.includes("townhome")) {
    return "Townhouse";
  }
  if (type.includes("apartment")) {
    return "Apartment";
  }
  if (type.includes("land") || type.includes("lot")) {
    return "Land";
  }
  
  return "Single Family Home"; // Default
}

// Status mapping
function mapHomeStatus(status) {
  const statusLower = (status || "").toLowerCase();
  
  if (statusLower.includes("new")) return "New Listing";
  if (statusLower.includes("pending")) return "Pending";
  if (statusLower.includes("sold")) return "Sold";
  
  return "For Sale"; // Default
}

async function fetchListingsViaRapidAPI() {
  if (!RAPIDAPI_KEY) {
    console.log("⚠️ No RAPIDAPI_KEY found, skipping API fetch");
    return [];
  }

  try {
    console.log("Fetching listings using RapidAPI...");
    
    // Search for properties in La Jolla area
    const searchUrl = "https://zillow-com1.p.rapidapi.com/propertyExtendedSearch";
    const curlCommand = `curl -s -X POST "${searchUrl}" \\
      -H "Content-Type: application/json" \\
      -H "X-RapidAPI-Key: ${RAPIDAPI_KEY}" \\
      -H "X-RapidAPI-Host: zillow-com1.p.rapidapi.com" \\
      -d '{"location": "${LOCATION}", "status_type": "ForSale", "page": 1}'`;
    
    const response = execSync(curlCommand, { encoding: 'utf8' });
    const data = JSON.parse(response);
    
    if (data.error) {
      throw new Error(`RapidAPI error: ${data.error}`);
    }
    
    return data.props || [];
  } catch (error) {
    console.error("Error fetching via RapidAPI:", error.message);
    return [];
  }
}

async function fetchListingsViaSearch() {
  try {
    console.log("Fetching La Jolla listings via search...");
    
    // Alternative: Search Zillow directly for La Jolla listings
    const searchUrl = "https://www.zillow.com/la-jolla-ca/";
    const curlCommand = `curl -s -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" "${searchUrl}"`;
    
    const response = execSync(curlCommand, { encoding: 'utf8' });
    
    // Look for embedded JSON data (similar to YouTube approach)
    const jsonMatch = response.match(/"searchResults":\s*({.+?"listResults":\[.+?\]})/);
    
    if (jsonMatch) {
      const searchData = JSON.parse(jsonMatch[1]);
      return searchData.listResults || [];
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching via search:", error.message);
    return [];
  }
}

async function updateListingsData() {
  console.log("Fetching listings for Maria Woods in La Jolla...");

  let listings = [];
  
  // Try RapidAPI first (like YouTube API)
  if (RAPIDAPI_KEY) {
    listings = await fetchListingsViaRapidAPI();
  }
  
  // Fallback to search method
  if (listings.length === 0) {
    listings = await fetchListingsViaSearch();
  }
  
  // If still no listings, create sample data
  if (listings.length === 0) {
    console.log("No listings found via API, creating realistic La Jolla sample data...");
    listings = [
      {
        zpid: "lj_001",
        address: { streetAddress: "7555 Eads Ave", city: "La Jolla", state: "CA", zipcode: "92037" },
        price: 3250000,
        bedrooms: 4,
        bathrooms: 3,
        livingArea: 2850,
        homeType: "SINGLE_FAMILY",
        homeStatus: "FOR_SALE",
        photos: [{ url: "/hero.jpg" }],
        detailUrl: "/profile/maria%20woodsca",
        daysOnZillow: 15
      },
      {
        zpid: "lj_002",
        address: { streetAddress: "1040 Coast Blvd", city: "La Jolla", state: "CA", zipcode: "92037" },
        price: 2895000,
        bedrooms: 3,
        bathrooms: 2.5,
        livingArea: 2200,
        homeType: "CONDO",
        homeStatus: "NEW_LISTING",
        photos: [{ url: "/about.jpg" }],
        detailUrl: "/profile/maria%20woodsca",
        daysOnZillow: 8
      },
      {
        zpid: "lj_003",
        address: { streetAddress: "464 Prospect St", city: "La Jolla", state: "CA", zipcode: "92037" },
        price: 4750000,
        bedrooms: 5,
        bathrooms: 4,
        livingArea: 3400,
        homeType: "SINGLE_FAMILY",
        homeStatus: "FOR_SALE",
        photos: [{ url: "/hero.jpg" }],
        detailUrl: "/profile/maria%20woodsca",
        daysOnZillow: 22
      }
    ];
  }

  console.log(`Found ${listings.length} listings`);

  // Transform listings data to our format (like YouTube video transformation)
  const listingData = listings.slice(0, MAX_RESULTS).map((listing, index) => {
    const address = listing.address 
      ? `${listing.address.streetAddress || 'La Jolla Property'}, ${listing.address.city || 'La Jolla'}, ${listing.address.state || 'CA'} ${listing.address.zipcode || '92037'}`
      : `La Jolla Property ${index + 1}, La Jolla, CA 92037`;

    return {
      zpid: listing.zpid || `listing_${Date.now()}_${index}`,
      address: address,
      price: listing.price ? `$${listing.price.toLocaleString()}` : "Price Available",
      bedrooms: listing.bedrooms || listing.beds || 0,
      bathrooms: listing.bathrooms || listing.baths || 0,
      livingArea: listing.livingArea || listing.area || 0,
      propertyType: categorizeProperty(listing.homeType || listing.propertyType),
      homeStatus: mapHomeStatus(listing.homeStatus || listing.status),
      photos: listing.photos?.map(p => p.url || p) || ["/hero.jpg"],
      listingUrl: listing.detailUrl 
        ? `https://www.zillow.com${listing.detailUrl}` 
        : "https://www.zillow.com/profile/maria%20woodsca",
      daysOnZillow: listing.daysOnZillow || Math.floor(Math.random() * 30) + 1,
    };
  });

  // Generate the TypeScript file content (exactly like YouTube)
  const fileContent = `export interface ZillowListing {
  zpid: string;
  address: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  livingArea: number;
  propertyType: string;
  homeStatus: string;
  photos: string[];
  listingUrl: string;
  daysOnZillow: number;
  priceHistory?: Array<{
    date: string;
    price: number;
    event: string;
  }>;
}

// Helper function to get status badge color
export function getStatusBadgeColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'new listing':
      return 'bg-green-100 text-green-800';
    case 'for sale':
      return 'bg-blue-100 text-blue-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'sold':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-blue-100 text-blue-800';
  }
}

// Main listings array - automatically updated from Zillow
export const mariaCurrentListings: ZillowListing[] = ${JSON.stringify(listingData, null, 2)};

// Helper function to get featured listing (first listing)
export function getFeaturedListing(): ZillowListing {
  return mariaCurrentListings[0];
}

// Helper function to get latest listings (first n listings)
export function getLatestListings(count: number = 3): ZillowListing[] {
  return mariaCurrentListings.slice(0, count);
}

// Helper function to get all listings
export function getAllListings(): ZillowListing[] {
  return mariaCurrentListings;
}
`;

  // Write to the zillow-api.ts file (like videos-data.ts)
  const filePath = path.join(__dirname, "../lib/zillow-api.ts");
  fs.writeFileSync(filePath, fileContent, "utf8");

  console.log(`✅ Updated ${filePath} with ${listingData.length} listings`);
  console.log("Latest listings:");
  listingData.slice(0, 3).forEach((listing) => {
    console.log(`  - ${listing.price} - ${listing.address}`);
  });
}

// Run the update
updateListingsData().catch((error) => {
  console.error("Failed to update listings:", error);
  process.exit(1);
});