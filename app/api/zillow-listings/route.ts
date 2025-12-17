import { NextResponse } from 'next/server';
import { mariaCurrentListings } from '@/lib/zillow-api';

// GET /api/zillow-listings
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');

    let listings = mariaCurrentListings;

    if (limit) {
      listings = listings.slice(0, parseInt(limit));
    }
    
    return NextResponse.json(listings);
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    );
  }
}

// POST /api/zillow-listings (for adding new listings)
export async function POST(request: Request) {
  try {
    const newListing = await request.json();
    
    // This endpoint generates code that needs to be manually added to zillow-api.ts
    // Following the same pattern as the existing scripts
    
    const listingCode = `  {
    "zpid": "${newListing.zpid}",
    "address": "${newListing.address}",
    "price": "${newListing.price}",
    "bedrooms": ${newListing.bedrooms},
    "bathrooms": ${newListing.bathrooms},
    "livingArea": ${newListing.livingArea},
    "propertyType": "${newListing.propertyType}",
    "homeStatus": "${newListing.homeStatus}",
    "photos": ${JSON.stringify(newListing.photos || ["/hero.jpg"], null, 6)},
    "listingUrl": "${newListing.listingUrl}",
    "daysOnZillow": ${newListing.daysOnZillow || 1}
  },`;
    
    return NextResponse.json({ 
      success: true, 
      message: 'Listing code generated. Add this to lib/zillow-api.ts manually.',
      code: listingCode,
      listing: newListing
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate listing code' },
      { status: 500 }
    );
  }
}