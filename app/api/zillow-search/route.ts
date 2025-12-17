import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('🔍 Searching for La Jolla listings...');
    
    // Alternative approach: Search for listings in La Jolla area
    // This doesn't require scraping agent profiles
    const searchUrl = 'https://www.zillow.com/la-jolla-ca/';
    
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch search page: ${response.status}`);
    }
    
    const html = await response.text();
    
    // Look for JSON data in the page (Zillow often embeds listing data)
    const jsonMatches = html.match(/window\.__INITIAL_STATE__\s*=\s*({.+?});/);
    const searchDataMatches = html.match(/"searchResults":\s*({.+?"listResults":\[.+?\])/);
    
    let listings: any[] = [];
    
    if (searchDataMatches) {
      try {
        const searchData = JSON.parse(searchDataMatches[1]);
        const listResults = searchData.listResults || [];
        
        listings = listResults.slice(0, 6).map((listing: any, index: number) => ({
          zpid: listing.zpid || `search_${index}`,
          address: `${listing.address || 'La Jolla Property'}, La Jolla, CA`,
          price: listing.price ? `$${listing.price.toLocaleString()}` : 'Price Available',
          bedrooms: listing.beds || 0,
          bathrooms: listing.baths || 0,
          livingArea: listing.area || 0,
          propertyType: listing.homeType || "Single Family Home",
          homeStatus: listing.homeStatus || "For Sale",
          photos: listing.imgSrc ? [listing.imgSrc] : ["/hero.jpg"],
          listingUrl: listing.detailUrl ? `https://www.zillow.com${listing.detailUrl}` : "",
          daysOnZillow: listing.daysOnZillow || Math.floor(Math.random() * 30) + 1,
        }));
        
        console.log(`✅ Found ${listings.length} La Jolla listings`);
      } catch (parseError) {
        console.log('⚠️ Failed to parse search data');
      }
    }
    
    // If no listings found, create sample La Jolla listings
    if (listings.length === 0) {
      console.log('📝 Creating sample La Jolla listings');
      listings = [
        {
          zpid: "sample_1",
          address: "Beautiful La Jolla Home, La Jolla, CA 92037",
          price: "$2,850,000",
          bedrooms: 4,
          bathrooms: 3,
          livingArea: 2800,
          propertyType: "Single Family Home",
          homeStatus: "For Sale",
          photos: ["/hero.jpg"],
          listingUrl: "https://www.zillow.com/profile/maria%20woodsca",
          daysOnZillow: 12,
        },
        {
          zpid: "sample_2", 
          address: "Luxury La Jolla Condo, La Jolla, CA 92037",
          price: "$1,950,000",
          bedrooms: 3,
          bathrooms: 2,
          livingArea: 2200,
          propertyType: "Condo",
          homeStatus: "New Listing",
          photos: ["/about.jpg"],
          listingUrl: "https://www.zillow.com/profile/maria%20woodsca",
          daysOnZillow: 5,
        }
      ];
    }
    
    return NextResponse.json(listings);
    
  } catch (error) {
    console.error('❌ Search error:', error);
    return NextResponse.json(
      { error: 'Failed to search listings', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}