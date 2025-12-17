import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { zillowUrl } = await request.json();
    
    if (!zillowUrl || !zillowUrl.includes('zillow.com')) {
      return NextResponse.json({ error: 'Invalid Zillow URL' }, { status: 400 });
    }
    
    console.log('🏠 Extracting data from:', zillowUrl);
    
    // Method 1: Try different approaches based on environment
    const isLocalhost = process.env.NODE_ENV === 'development';
    
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
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
      // Add referer to look more legitimate
      'Referer': 'https://www.google.com/',
    };
    
    if (isLocalhost) {
      console.log('⚠️ Running on localhost - Zillow may block requests');
    }
    
    let html = '';
    
    try {
      const response = await fetch(zillowUrl, { headers });
      
      if (response.status === 403) {
        // If still blocked, try a proxy approach or return structured error
        console.log('⚠️ Direct access blocked, trying alternative method...');
        
        // Method 2: Try to get data from Zillow's API endpoints (if available)
        const zpidMatch = zillowUrl.match(/\/(\d+)_zpid/);
        if (zpidMatch) {
          const zpid = zpidMatch[1];
          
          // Try Zillow's internal API (this might work)
          try {
            const apiUrl = `https://www.zillow.com/graphql/?zpid=${zpid}`;
            const apiResponse = await fetch(apiUrl, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'application/json',
              }
            });
            
            if (apiResponse.ok) {
              const apiData = await apiResponse.json();
              console.log('✅ Got data from API');
              
              // Parse API response for property data
              return NextResponse.json({
                success: true,
                method: 'api',
                data: {
                  zpid: zpid,
                  // Extract from API response structure
                  address: apiData.property?.address || null,
                  price: apiData.property?.price || null,
                  bedrooms: apiData.property?.bedrooms || null,
                  bathrooms: apiData.property?.bathrooms || null,
                  livingArea: apiData.property?.livingArea || null,
                  images: apiData.property?.photos || []
                }
              });
            }
          } catch (apiError) {
            console.log('API method failed:', apiError);
          }
        }
        
        // Method 3: Return what we can extract from URL + manual input prompt
        const zpidMatch2 = zillowUrl.match(/\/(\d+)_zpid/);
        const addressMatch = zillowUrl.match(/homedetails\/([^\/]+)/);
        
        return NextResponse.json({
          success: false,
          blocked: true,
          extractedFromUrl: {
            zpid: zpidMatch2 ? zpidMatch2[1] : null,
            address: addressMatch ? addressMatch[1].replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) : null
          },
          message: 'Zillow blocked direct access. Please fill in details manually or try the browser extension method.',
          instructions: [
            '1. Open the Zillow listing in your browser',
            '2. Right-click → Inspect Element',
            '3. Look for JSON data in script tags',
            '4. Or manually copy the details from the page'
          ]
        });
      }
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      html = await response.text();
      
    } catch (fetchError) {
      console.error('Fetch failed:', fetchError);
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch page',
        details: fetchError instanceof Error ? fetchError.message : 'Unknown error'
      }, { status: 500 });
    }
    
    // Method 4: Parse HTML if we got it
    if (html) {
      const extractedData: any = {};
      
      // Extract ZPID
      const zpidMatch = zillowUrl.match(/\/(\d+)_zpid/);
      extractedData.zpid = zpidMatch ? zpidMatch[1] : null;
      
      // Look for JSON-LD data
      const jsonLdMatch = html.match(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/g);
      if (jsonLdMatch) {
        for (const match of jsonLdMatch) {
          try {
            const jsonContent = match.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
            const data = JSON.parse(jsonContent);
            
            if (data['@type'] === 'SingleFamilyResidence' || data['@type'] === 'House') {
              extractedData.address = data.address?.streetAddress || data.name;
              extractedData.price = data.offers?.price;
              extractedData.bedrooms = data.numberOfRooms || data.numberOfBedrooms;
              extractedData.bathrooms = data.numberOfBathroomsTotal;
              extractedData.livingArea = data.floorSize?.value;
              break;
            }
          } catch (e) {
            continue;
          }
        }
      }
      
      // Look for embedded data in script tags
      const scriptMatches = html.match(/<script[^>]*>(.*?)<\/script>/g);
      if (scriptMatches) {
        for (const script of scriptMatches) {
          // Look for property data patterns
          const priceMatch = script.match(/["']price["']:\s*["']?\$?([\d,]+)/);
          const bedroomsMatch = script.match(/["']bedrooms["']:\s*(\d+)/);
          const bathroomsMatch = script.match(/["']bathrooms["']:\s*([\d.]+)/);
          const sqftMatch = script.match(/["']livingArea["']:\s*([\d,]+)/);
          
          if (priceMatch && !extractedData.price) {
            extractedData.price = `$${priceMatch[1]}`;
          }
          if (bedroomsMatch && !extractedData.bedrooms) {
            extractedData.bedrooms = parseInt(bedroomsMatch[1]);
          }
          if (bathroomsMatch && !extractedData.bathrooms) {
            extractedData.bathrooms = parseFloat(bathroomsMatch[1]);
          }
          if (sqftMatch && !extractedData.livingArea) {
            extractedData.livingArea = parseInt(sqftMatch[1].replace(/,/g, ''));
          }
        }
      }
      
      // Extract images
      const imageMatches = html.match(/https:\/\/photos\.zillowstatic\.com[^"'\s]*/g);
      if (imageMatches) {
        const uniqueImages = [...new Set(imageMatches)]
          .filter(url => !url.includes('_xs.') && !url.includes('_s.'))
          .slice(0, 5);
        extractedData.images = uniqueImages;
      }
      
      console.log('✅ Extracted data:', extractedData);
      
      return NextResponse.json({
        success: true,
        method: 'html_parsing',
        data: extractedData
      });
    }
    
    return NextResponse.json({
      success: false,
      error: 'No data could be extracted'
    }, { status: 500 });
    
  } catch (error) {
    console.error('❌ Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Extraction failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}