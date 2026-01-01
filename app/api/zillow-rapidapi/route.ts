import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Using RapidAPI's Zillow API
    const rapidApiKey = process.env.RAPIDAPI_KEY;
    
    if (!rapidApiKey) {
      throw new Error('RAPIDAPI_KEY not configured');
    }
    
    // First, search for Maria's agent profile
    const agentResponse = await fetch('https://zillow-com1.p.rapidapi.com/agent/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com'
      },
      body: JSON.stringify({
        agent_name: "Maria Woods",
        location: "La Jolla, CA"
      })
    });
    
    if (!agentResponse.ok) {
      throw new Error('Failed to find agent');
    }
    
    const agentData = await agentResponse.json();
    const agentId = agentData.agents?.[0]?.agent_id;
    
    if (!agentId) {
      throw new Error('Agent not found');
    }
    
    // Get agent's listings
    const listingsResponse = await fetch('https://zillow-com1.p.rapidapi.com/agent/listings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com'
      },
      body: JSON.stringify({
        agent_id: agentId
      })
    });
    
    if (!listingsResponse.ok) {
      throw new Error('Failed to fetch listings');
    }
    
    const listingsData = await listingsResponse.json();
    
    // Transform to our format
    const listings = listingsData.listings?.map((listing: any) => ({
      zpid: listing.zpid,
      address: `${listing.address.streetAddress}, ${listing.address.city}, ${listing.address.state} ${listing.address.zipcode}`,
      price: `$${listing.price?.toLocaleString()}`,
      bedrooms: listing.bedrooms || 0,
      bathrooms: listing.bathrooms || 0,
      livingArea: listing.livingArea || 0,
      propertyType: listing.homeType || "Single Family Home",
      homeStatus: listing.homeStatus || "For Sale",
      photos: listing.photos?.map((photo: any) => photo.url) || ["/hero.jpg"],
      listingUrl: listing.detailUrl || "",
      daysOnZillow: listing.daysOnZillow || 0,
      priceHistory: listing.priceHistory || []
    })) || [];
    
    return NextResponse.json(listings);
    
  } 
  
  catch (error: unknown) {
  console.error('RapidAPI error:', error);

  // Safely extract message
  const message = error instanceof Error ? error.message : String(error);

  return NextResponse.json(
    { error: 'Failed to fetch listings via API', details: message },
    { status: 500 }
  );
}

  /*
  catch (error) {
    console.error('RapidAPI error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listings via API', details: error.message },
      { status: 500 }
    );
  }
*/


}