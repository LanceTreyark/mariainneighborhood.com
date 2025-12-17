const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Load environment variables
require("dotenv").config({ path: ".env.local" });

const MARIA_PROFILE_URL = "https://www.zillow.com/profile/maria%20woodsca";

async function scrapeMariasProfile() {
  try {
    console.log("🔍 Scraping Maria's Zillow profile for actual listings...");
    console.log("Profile URL:", MARIA_PROFILE_URL);
    
    // Use curl to fetch the profile page with realistic headers
    const curlCommand = `curl -s -L \\
      -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \\
      -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8" \\
      -H "Accept-Language: en-US,en;q=0.9" \\
      -H "Accept-Encoding: gzip, deflate, br" \\
      -H "Cache-Control: no-cache" \\
      -H "Pragma: no-cache" \\
      -H "Sec-Fetch-Dest: document" \\
      -H "Sec-Fetch-Mode: navigate" \\
      -H "Sec-Fetch-Site: none" \\
      -H "Sec-Fetch-User: ?1" \\
      -H "Upgrade-Insecure-Requests: 1" \\
      "${MARIA_PROFILE_URL}"`;
    
    console.log("📡 Fetching profile page...");
    const html = execSync(curlCommand, { encoding: 'utf8', maxBuffer: 1024 * 1024 * 10 });
    
    console.log(`📄 Page loaded (${html.length} characters)`);
    
    // Save the HTML for debugging
    const debugPath = path.join(__dirname, "debug-maria-profile.html");
    fs.writeFileSync(debugPath, html);
    console.log(`💾 Saved HTML to ${debugPath} for debugging`);
    
    // Look for different patterns that might contain listing data
    const patterns = [
      // JSON data patterns
      /"listingData":\s*(\[.*?\])/,
      /"listings":\s*(\[.*?\])/,
      /"agentListings":\s*(\[.*?\])/,
      /"properties":\s*(\[.*?\])/,
      
      // Script tag patterns
      /window\.__INITIAL_STATE__\s*=\s*({.*?});/,
      /window\.__NEXT_DATA__\s*=\s*({.*?});/,
      
      // Agent data patterns
      /"agent":\s*({.*?"listings".*?})/,
      /"profile":\s*({.*?"listings".*?})/,
    ];
    
    let foundData = null;
    let patternUsed = null;
    
    for (let i = 0; i < patterns.length; i++) {
      const match = html.match(patterns[i]);
      if (match) {
        try {
          foundData = JSON.parse(match[1]);
          patternUsed = `Pattern ${i + 1}`;
          console.log(`✅ Found data using ${patternUsed}`);
          break;
        } catch (parseError) {
          console.log(`⚠️ Pattern ${i + 1} matched but failed to parse JSON`);
        }
      }
    }
    
    if (!foundData) {
      console.log("🔍 No JSON patterns found, looking for HTML elements...");
      
      // Look for specific HTML patterns that might contain listing info
      const htmlPatterns = [
        /class="[^"]*listing[^"]*"[^>]*>(.*?)<\/[^>]+>/gi,
        /class="[^"]*property[^"]*"[^>]*>(.*?)<\/[^>]+>/gi,
        /data-testid="[^"]*listing[^"]*"[^>]*>(.*?)<\/[^>]+>/gi,
      ];
      
      for (const pattern of htmlPatterns) {
        const matches = [...html.matchAll(pattern)];
        if (matches.length > 0) {
          console.log(`📋 Found ${matches.length} HTML elements that might contain listings`);
          // Save first few matches for analysis
          matches.slice(0, 3).forEach((match, index) => {
            console.log(`Element ${index + 1}:`, match[1].substring(0, 200) + "...");
          });
        }
      }
    }
    
    // Look for any mention of specific addresses or prices
    const addressPattern = /\b\d+\s+[A-Za-z\s]+(?:Ave|St|Blvd|Dr|Rd|Ln|Way|Ct|Pl),?\s*La\s*Jolla/gi;
    const pricePattern = /\$[\d,]+(?:,\d{3})*(?:\.\d{2})?/g;
    
    const addresses = [...html.matchAll(addressPattern)];
    const prices = [...html.matchAll(pricePattern)];
    
    if (addresses.length > 0) {
      console.log(`🏠 Found ${addresses.length} potential addresses:`);
      addresses.slice(0, 5).forEach((addr, i) => {
        console.log(`  ${i + 1}. ${addr[0]}`);
      });
    }
    
    if (prices.length > 0) {
      console.log(`💰 Found ${prices.length} potential prices:`);
      const uniquePrices = [...new Set(prices.map(p => p[0]))];
      uniquePrices.slice(0, 10).forEach((price, i) => {
        console.log(`  ${i + 1}. ${price}`);
      });
    }
    
    // Check if the page indicates Maria has listings
    const hasListingsIndicators = [
      /(\d+)\s*(?:active\s*)?listings?/i,
      /(\d+)\s*(?:properties?\s*)?for\s*sale/i,
      /currently\s*representing/i,
      /agent\s*listings/i,
    ];
    
    for (const indicator of hasListingsIndicators) {
      const match = html.match(indicator);
      if (match) {
        console.log(`📊 Found listing indicator: "${match[0]}"`);
        if (match[1]) {
          console.log(`📈 Potential listing count: ${match[1]}`);
        }
      }
    }
    
    // Check if we're being blocked
    const blockingIndicators = [
      /blocked/i,
      /captcha/i,
      /robot/i,
      /access denied/i,
      /rate limit/i,
    ];
    
    for (const indicator of blockingIndicators) {
      if (html.match(indicator)) {
        console.log(`🚫 Potential blocking detected: ${indicator}`);
      }
    }
    
    // Return summary
    return {
      success: true,
      htmlLength: html.length,
      foundJsonData: !!foundData,
      patternUsed,
      addressCount: addresses.length,
      priceCount: prices.length,
      addresses: addresses.slice(0, 5).map(a => a[0]),
      prices: [...new Set(prices.map(p => p[0]))].slice(0, 10),
      debugFile: debugPath
    };
    
  } catch (error) {
    console.error("❌ Error scraping Maria's profile:", error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// Run the scraper
scrapeMariasProfile().then(result => {
  console.log("\n📋 SCRAPING SUMMARY:");
  console.log("===================");
  console.log(JSON.stringify(result, null, 2));
  
  if (result.success) {
    console.log("\n💡 NEXT STEPS:");
    console.log("1. Check the debug HTML file for Maria's actual listings");
    console.log("2. Look for patterns in the addresses and prices found");
    console.log("3. Update the scraper based on the actual page structure");
  }
}).catch(error => {
  console.error("Failed to scrape:", error);
  process.exit(1);
});