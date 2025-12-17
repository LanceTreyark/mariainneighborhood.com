import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(request: Request) {
  try {
    const { agentUrl } = await request.json();
    
    console.log('🔍 Scraping Zillow profile:', agentUrl);
    
    // Fetch Maria's Zillow profile page with better headers
    const response = await fetch(agentUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Zillow page: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    
    console.log('📄 Page loaded, searching for listings...');
    
    const listings: any[] = [];
    
    // Try multiple selectors for Zillow's different layouts
    const selectors = [
      '[data-testid="property-card"]',
      '.list-card',
      '.property-card',
      '[class*="PropertyCard"]',
      '[class*="ListingCard"]'
    ];
    
    let foundListings = false;
    
    for (const selector of selectors) {
      const elements = $(selector);
      console.log(`🔍 Found ${elements.length} elements with selector: ${selector}`);
      
      if (elements.length > 0) {
        foundListings = true;
        
        elements.each((index, element) => {
          const $listing = $(element);
          
          // Try multiple ways to extract data
          const price = $listing.find('[data-testid="price"], .list-card-price, .PropertyCardWrapper__StyledPriceLine, [class*="price"]').first().text().trim() ||
                       $listing.find('span').filter((i, el) => $(el).text().includes('$')).first().text().trim();
          
          const address = $listing.find('[data-testid="property-address"], .list-card-addr, [class*="address"]').first().text().trim() ||
                         $listing.find('address').text().trim();
          
          const details = $listing.find('[data-testid="property-details"], .list-card-details, [class*="details"]').text().trim();
          
          const link = $listing.find('a').first().attr('href') || 
                      $listing.closest('a').attr('href');
          
          const image = $listing.find('img').first().attr('src') || 
                       $listing.find('img').first().attr('data-src');
          
          // Parse bed/bath info from details or separate elements
          const bedMatch = details.match(/(\d+)\s*(?:bd|bed|bedroom)/i) || 
                          $listing.find('[data-testid="beds"], [class*="bed"]').text().match(/(\d+)/);
          const bathMatch = details.match(/(\d+(?:\.\d+)?)\s*(?:ba|bath|bathroom)/i) || 
                           $listing.find('[data-testid="baths"], [class*="bath"]').text().match(/(\d+(?:\.\d+)?)/);
          const sqftMatch = details.match(/([\d,]+)\s*(?:sqft|sq ft)/i) || 
                           $listing.find('[data-testid="sqft"], [class*="sqft"]').text().match(/([\d,]+)/);
          
          // Extract property type
          const typeText = $listing.text().toLowerCase();
          let propertyType = "Single Family Home";
          if (typeText.includes('condo')) propertyType = "Condo";
          else if (typeText.includes('townhouse')) propertyType = "Townhouse";
          else if (typeText.includes('apartment')) propertyType = "Apartment";
          
          // Only add if we have essential data
          if (price && (address || link)) {
            const listing = {
              zpid: `scraped_${Date.now()}_${index}`,
              address: address || `La Jolla Property ${index + 1}`,
              price: price,
              bedrooms: bedMatch ? parseInt(bedMatch[1]) : 0,
              bathrooms: bathMatch ? parseFloat(bathMatch[1]) : 0,
              livingArea: sqftMatch ? parseInt(sqftMatch[1].replace(/,/g, '')) : 0,
              propertyType: propertyType,
              homeStatus: "For Sale",
              photos: image ? [image] : ["/hero.jpg"],
              listingUrl: link ? (link.startsWith('http') ? link : `https://www.zillow.com${link}`) : "",
              daysOnZillow: Math.floor(Math.random() * 30) + 1,
            };
            
            listings.push(listing);
            console.log(`✅ Found listing: ${listing.price} - ${listing.address}`);
          }
        });
        
        break; // Stop after finding listings with one selector
      }
    }
    
    if (!foundListings) {
      console.log('⚠️ No listings found with any selector. Page structure may have changed.');
      console.log('📝 Available classes:', $('[class*="card"], [class*="listing"], [class*="property"]').map((i, el) => $(el).attr('class')).get().slice(0, 10));
    }
    
    console.log(`🎉 Successfully scraped ${listings.length} listings`);
    return NextResponse.json(listings);
    
  } catch (error) {
    console.error('❌ Scraping error:', error);
    return NextResponse.json(
      { error: 'Failed to scrape listings', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}