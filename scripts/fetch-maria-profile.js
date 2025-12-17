const fs = require("fs");
const path = require("path");

// Load environment variables
require("dotenv").config({ path: ".env.local" });

const MARIA_PROFILE_URL = "https://www.zillow.com/profile/maria%20woodsca";

async function fetchMariasProfile() {
  try {
    console.log("🔍 Fetching Maria's Zillow profile for actual listings...");
    console.log("Profile URL:", MARIA_PROFILE_URL);
    
    // Use fetch with realistic headers
    const response = await fetch(MARIA_PROFILE_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const html = await response.text();
    console.log(`📄 Page loaded (${html.length} characters)`);
    
    // Save the HTML for debugging
    const debugPath = path.join(__dirname, "debug-maria-profile.html");
    fs.writeFileSync(debugPath, html);
    console.log(`💾 Saved HTML to ${debugPath} for debugging`);
    
    // Look for Maria's actual listings in the HTML
    console.log("🔍 Analyzing page content...");
    
    // Check if this is actually Maria's profile
    const profileIndicators = [
      /maria\s+woods/i,
      /maria\s+woodsca/i,
      /real\s+estate\s+agent/i,
      /la\s+jolla/i,
    ];
    
    let isMariaProfile = false;
    for (const indicator of profileIndicators) {
      if (html.match(indicator)) {
        console.log(`✅ Confirmed Maria's profile: ${indicator}`);
        isMariaProfile = true;
      }
    }
    
    if (!isMariaProfile) {
      console.log("⚠️ This might not be Maria's profile page");
    }
    
    // Look for listing data patterns
    const listingPatterns = [
      // JSON data in script tags
      /"listings":\s*(\[.*?\])/,
      /"agentListings":\s*(\[.*?\])/,
      /"properties":\s*(\[.*?\])/,
      
      // Specific listing elements
      /data-testid="[^"]*listing[^"]*"/g,
      /class="[^"]*listing[^"]*"/g,
      /class="[^"]*property[^"]*"/g,
    ];
    
    let foundListings = [];
    
    for (const pattern of listingPatterns) {
      const matches = [...html.matchAll(pattern)];
      if (matches.length > 0) {
        console.log(`📋 Found ${matches.length} potential listing elements`);
        foundListings.push(...matches);
      }
    }
    
    // Look for addresses and prices
    const addressPattern = /\b\d+\s+[A-Za-z\s]+(?:Ave|St|Blvd|Dr|Rd|Ln|Way|Ct|Pl),?\s*La\s*Jolla[^,]*,?\s*CA/gi;
    const pricePattern = /\$[\d,]+(?:,\d{3})*(?:\.\d{2})?/g;
    
    const addresses = [...html.matchAll(addressPattern)];
    const prices = [...html.matchAll(pricePattern)];
    
    console.log(`🏠 Found ${addresses.length} potential La Jolla addresses`);
    console.log(`💰 Found ${prices.length} potential prices`);
    
    if (addresses.length > 0) {
      console.log("Addresses found:");
      addresses.slice(0, 10).forEach((addr, i) => {
        console.log(`  ${i + 1}. ${addr[0]}`);
      });
    }
    
    if (prices.length > 0) {
      console.log("Prices found:");
      const uniquePrices = [...new Set(prices.map(p => p[0]))];
      uniquePrices.slice(0, 15).forEach((price, i) => {
        console.log(`  ${i + 1}. ${price}`);
      });
    }
    
    // Look for listing count indicators
    const listingCountPattern = /(\d+)\s*(?:active\s*)?(?:listings?|properties?)/i;
    const countMatch = html.match(listingCountPattern);
    if (countMatch) {
      console.log(`📊 Found listing count: ${countMatch[0]} (${countMatch[1]} listings)`);
    }
    
    // Check for specific Zillow listing URLs
    const zillowUrlPattern = /https:\/\/www\.zillow\.com\/homedetails\/[^"'\s]+/g;
    const zillowUrls = [...html.matchAll(zillowUrlPattern)];
    
    if (zillowUrls.length > 0) {
      console.log(`🔗 Found ${zillowUrls.length} Zillow listing URLs:`);
      zillowUrls.slice(0, 5).forEach((url, i) => {
        console.log(`  ${i + 1}. ${url[0]}`);
      });
    }
    
    // Look for any blocked/error indicators
    const errorIndicators = [
      /blocked/i,
      /captcha/i,
      /robot/i,
      /access denied/i,
      /rate limit/i,
      /error/i,
    ];
    
    for (const indicator of errorIndicators) {
      const match = html.match(indicator);
      if (match) {
        console.log(`⚠️ Potential issue detected: ${match[0]}`);
      }
    }
    
    // Try to extract structured data
    let structuredListings = [];
    
    // Look for JSON-LD structured data
    const jsonLdPattern = /<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gi;
    const jsonLdMatches = [...html.matchAll(jsonLdPattern)];
    
    for (const match of jsonLdMatches) {
      try {
        const data = JSON.parse(match[1]);
        if (data['@type'] === 'RealEstateAgent' || data.hasOwnProperty('listings')) {
          console.log("📋 Found structured data for real estate agent");
          structuredListings.push(data);
        }
      } catch (e) {
        // Ignore JSON parse errors
      }
    }
    
    return {
      success: true,
      isMariaProfile,
      htmlLength: html.length,
      addressCount: addresses.length,
      priceCount: prices.length,
      zillowUrlCount: zillowUrls.length,
      addresses: addresses.slice(0, 5).map(a => a[0]),
      prices: [...new Set(prices.map(p => p[0]))].slice(0, 10),
      zillowUrls: zillowUrls.slice(0, 3).map(u => u[0]),
      structuredListings,
      debugFile: debugPath,
      listingCount: countMatch ? countMatch[1] : null
    };
    
  } catch (error) {
    console.error("❌ Error fetching Maria's profile:", error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// Run the fetcher
fetchMariasProfile().then(result => {
  console.log("\n📋 PROFILE ANALYSIS SUMMARY:");
  console.log("============================");
  console.log(JSON.stringify(result, null, 2));
  
  if (result.success) {
    console.log("\n💡 FINDINGS:");
    console.log(`- Profile confirmed: ${result.isMariaProfile ? 'YES' : 'NO'}`);
    console.log(`- Addresses found: ${result.addressCount}`);
    console.log(`- Prices found: ${result.priceCount}`);
    console.log(`- Zillow URLs found: ${result.zillowUrlCount}`);
    console.log(`- Listing count: ${result.listingCount || 'Not found'}`);
    
    if (result.addresses.length > 0 || result.zillowUrls.length > 0) {
      console.log("\n🎉 SUCCESS: Found potential listing data!");
      console.log("Next step: Use this data to create real listings");
    } else {
      console.log("\n⚠️ No clear listing data found");
      console.log("Maria might not have active listings, or they're loaded dynamically");
    }
  }
}).catch(error => {
  console.error("Failed to fetch:", error);
  process.exit(1);
});