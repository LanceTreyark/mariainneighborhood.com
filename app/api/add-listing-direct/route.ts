import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ADMIN_PASSPHRASE = process.env.ADMIN_PASSPHRASE || 'maria2024';

export async function POST(request: Request) {
  try {
    const { listing, passphrase } = await request.json();
    
    // Verify passphrase
    if (passphrase !== ADMIN_PASSPHRASE) {
      return NextResponse.json({ error: 'Invalid passphrase' }, { status: 401 });
    }
    
    console.log('🔐 Passphrase verified, adding listing directly...');
    
    // Read current zillow-api.ts file
    const apiFilePath = path.join(process.cwd(), 'lib', 'zillow-api.ts');
    
    if (!fs.existsSync(apiFilePath)) {
      return NextResponse.json({ error: 'zillow-api.ts file not found' }, { status: 404 });
    }
    
    let fileContent = fs.readFileSync(apiFilePath, 'utf8');
    
    // Find the mariaCurrentListings array
    const arrayStartPattern = /export const mariaCurrentListings: ZillowListing\[\] = \[/;
    const arrayStartMatch = fileContent.match(arrayStartPattern);
    
    if (!arrayStartMatch) {
      return NextResponse.json({ error: 'Could not find mariaCurrentListings array' }, { status: 400 });
    }
    
    // Find the closing bracket of the array
    const arrayStart = arrayStartMatch.index! + arrayStartMatch[0].length;
    let bracketCount = 1;
    let arrayEnd = arrayStart;
    
    for (let i = arrayStart; i < fileContent.length; i++) {
      if (fileContent[i] === '[') bracketCount++;
      if (fileContent[i] === ']') bracketCount--;
      if (bracketCount === 0) {
        arrayEnd = i;
        break;
      }
    }
    
    // Check if array is empty or has existing listings
    const arrayContent = fileContent.substring(arrayStart, arrayEnd).trim();
    const isEmpty = arrayContent === '' || arrayContent === '\n';
    
    // Create the new listing code
    const newListingCode = `  {
    "zpid": "${listing.zpid}",
    "address": "${listing.address}",
    "price": "${listing.price}",
    "bedrooms": ${listing.bedrooms},
    "bathrooms": ${listing.bathrooms},
    "livingArea": ${listing.livingArea},
    "propertyType": "${listing.propertyType}",
    "homeStatus": "${listing.homeStatus}",
    "photos": ${JSON.stringify(listing.photos)},
    "listingUrl": "${listing.listingUrl}",
    "daysOnZillow": ${listing.daysOnZillow}
  }`;
    
    // Insert the new listing
    let newContent;
    if (isEmpty) {
      // Array is empty, add as first item
      newContent = fileContent.substring(0, arrayStart) + 
                   '\n' + newListingCode + '\n' + 
                   fileContent.substring(arrayEnd);
    } else {
      // Array has items, add as first item (prepend)
      newContent = fileContent.substring(0, arrayStart) + 
                   '\n' + newListingCode + ',' + 
                   fileContent.substring(arrayStart);
    }
    
    // Write the updated file
    fs.writeFileSync(apiFilePath, newContent, 'utf8');
    
    console.log('✅ Successfully added listing to zillow-api.ts');
    
    return NextResponse.json({
      success: true,
      message: 'Listing added successfully to zillow-api.ts',
      listing: listing
    });
    
  } catch (error) {
    console.error('❌ Error adding listing:', error);
    return NextResponse.json({
      error: 'Failed to add listing',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}