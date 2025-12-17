import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { images, zpid } = await request.json();
    
    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json({ error: 'No images provided' }, { status: 400 });
    }
    
    console.log(`📥 Downloading ${images.length} images for ZPID: ${zpid}`);
    
    // Create listings directory if it doesn't exist
    const listingsDir = path.join(process.cwd(), 'public', 'listings');
    if (!fs.existsSync(listingsDir)) {
      fs.mkdirSync(listingsDir, { recursive: true });
    }
    
    // Create specific directory for this listing
    const listingDir = path.join(listingsDir, zpid || 'temp');
    if (!fs.existsSync(listingDir)) {
      fs.mkdirSync(listingDir, { recursive: true });
    }
    
    const downloadedImages: string[] = [];
    
    for (let i = 0; i < Math.min(images.length, 5); i++) { // Limit to 5 images
      const imageUrl = images[i];
      
      try {
        console.log(`📸 Downloading image ${i + 1}/${images.length}: ${imageUrl}`);
        
        // Fetch the image with proper headers
        const response = await fetch(imageUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Referer': 'https://www.zillow.com/',
            'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120"',
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': '"Windows"',
            'Sec-Fetch-Dest': 'image',
            'Sec-Fetch-Mode': 'no-cors',
            'Sec-Fetch-Site': 'cross-site',
          }
        });
        
        if (!response.ok) {
          console.log(`⚠️ Failed to fetch image ${i + 1}: ${response.status}`);
          continue;
        }
        
        // Get the image buffer
        const imageBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(imageBuffer);
        
        // Determine file extension from URL or content type
        let extension = 'jpg';
        const contentType = response.headers.get('content-type');
        if (contentType?.includes('png')) extension = 'png';
        else if (contentType?.includes('webp')) extension = 'webp';
        else if (imageUrl.includes('.png')) extension = 'png';
        else if (imageUrl.includes('.webp')) extension = 'webp';
        
        // Generate filename
        const filename = `image-${i + 1}.${extension}`;
        const filepath = path.join(listingDir, filename);
        
        // Save the image
        fs.writeFileSync(filepath, buffer);
        
        // Add to downloaded images list (relative path for web)
        const webPath = `/listings/${zpid || 'temp'}/${filename}`;
        downloadedImages.push(webPath);
        
        console.log(`✅ Saved image ${i + 1}: ${webPath}`);
        
      } catch (imageError) {
        console.error(`❌ Error downloading image ${i + 1}:`, imageError);
        continue;
      }
    }
    
    console.log(`🎉 Successfully downloaded ${downloadedImages.length}/${images.length} images`);
    
    return NextResponse.json({
      success: true,
      downloadedImages,
      count: downloadedImages.length,
      zpid: zpid || 'temp'
    });
    
  } catch (error) {
    console.error('❌ Error downloading images:', error);
    return NextResponse.json(
      { 
        error: 'Failed to download images', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}