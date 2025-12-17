const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Interactive CLI to add Maria's real listings
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function addRealListing() {
  console.log("🏠 Add Maria's Real Listing");
  console.log("===========================");
  console.log("Enter the details from Maria's actual Zillow listing:\n");

  try {
    // Collect listing information
    const zillowUrl = await askQuestion("Zillow listing URL: ");
    const address = await askQuestion("Full address: ");
    const price = await askQuestion("Price (e.g., $2,500,000): ");
    const bedrooms = await askQuestion("Bedrooms: ");
    const bathrooms = await askQuestion("Bathrooms: ");
    const sqft = await askQuestion("Square feet: ");
    const propertyType = await askQuestion("Property type (Single Family Home/Condo/Townhouse): ");
    const status = await askQuestion("Status (For Sale/New Listing/Pending): ");

    // Extract ZPID from URL if possible
    const zpidMatch = zillowUrl.match(/\/(\d+)_zpid/);
    const zpid = zpidMatch ? zpidMatch[1] : `manual_${Date.now()}`;

    // Create listing object
    const newListing = {
      zpid: zpid,
      address: address,
      price: price.startsWith('$') ? price : `$${price}`,
      bedrooms: parseInt(bedrooms) || 0,
      bathrooms: parseFloat(bathrooms) || 0,
      livingArea: parseInt(sqft.replace(/,/g, '')) || 0,
      propertyType: propertyType || "Single Family Home",
      homeStatus: status || "For Sale",
      photos: ["/hero.jpg"], // Default photo
      listingUrl: zillowUrl,
      daysOnZillow: 1
    };

    console.log("\n📋 Listing to add:");
    console.log(JSON.stringify(newListing, null, 2));

    const confirm = await askQuestion("\nAdd this listing? (y/n): ");
    
    if (confirm.toLowerCase() === 'y' || confirm.toLowerCase() === 'yes') {
      // Read current listings
      const apiPath = path.join(__dirname, "../lib/zillow-api.ts");
      let currentContent = "";
      
      if (fs.existsSync(apiPath)) {
        currentContent = fs.readFileSync(apiPath, 'utf8');
      }

      // Extract current listings array
      const listingsMatch = currentContent.match(/export const mariaCurrentListings: ZillowListing\[\] = (\[[\s\S]*?\]);/);
      let currentListings = [];
      
      if (listingsMatch) {
        try {
          currentListings = JSON.parse(listingsMatch[1]);
        } catch (e) {
          console.log("⚠️ Could not parse existing listings, starting fresh");
        }
      }

      // Add new listing
      currentListings.push(newListing);

      // Generate updated file content
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

// Maria's current listings - Updated with real data
export const mariaCurrentListings: ZillowListing[] = ${JSON.stringify(currentListings, null, 2)};

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

      // Write updated file
      fs.writeFileSync(apiPath, fileContent, 'utf8');
      
      console.log(`\n✅ Added listing to ${apiPath}`);
      console.log(`📊 Total listings: ${currentListings.length}`);
      console.log("\n🚀 Run 'npm run dev' to see the updated listing on the website!");
      
    } else {
      console.log("❌ Listing not added");
    }

  } catch (error) {
    console.error("❌ Error adding listing:", error.message);
  } finally {
    rl.close();
  }
}

// Show current listings first
function showCurrentListings() {
  const apiPath = path.join(__dirname, "../lib/zillow-api.ts");
  
  if (fs.existsSync(apiPath)) {
    const content = fs.readFileSync(apiPath, 'utf8');
    const listingsMatch = content.match(/export const mariaCurrentListings: ZillowListing\[\] = (\[[\s\S]*?\]);/);
    
    if (listingsMatch) {
      try {
        const listings = JSON.parse(listingsMatch[1]);
        console.log(`\n📋 Current listings (${listings.length}):`);
        listings.forEach((listing, index) => {
          console.log(`${index + 1}. ${listing.price} - ${listing.address}`);
        });
        console.log("");
      } catch (e) {
        console.log("⚠️ Could not parse current listings");
      }
    } else {
      console.log("📋 No current listings found\n");
    }
  } else {
    console.log("📋 No listings file found\n");
  }
}

// Run the script
console.log("🏠 Maria's Real Estate Listing Manager");
console.log("=====================================");
showCurrentListings();
addRealListing();