# 🏠 Property Listing Guide

Complete guide for adding and managing property listings on Maria's real estate website.

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Admin Panel Access](#admin-panel-access)
3. [Adding New Listings](#adding-new-listings)
4. [Manual Code Method](#manual-code-method)
5. [One-Click Direct Add](#one-click-direct-add)
6. [Image Management](#image-management)
7. [Troubleshooting](#troubleshooting)
8. [Technical Details](#technical-details)

---

## 🚀 Quick Start

### Prerequisites
- Access to the website admin panel
- Zillow listing URL
- Admin passphrase (for direct add feature)

### Basic Workflow
1. **Go to Admin Panel**: Navigate to `/admin/add-listing`
2. **Extract Data**: Paste Zillow URL and click "Extract"
3. **Review Details**: Check auto-filled information
4. **Add to Website**: Use either method below:
   - **One-Click**: Enter passphrase + click "Add Listing to Website"
   - **Manual**: Generate code + copy to `lib/zillow-api.ts`

---

## 🔐 Admin Panel Access

### URL
```
https://mariainneighborhood.com/admin/add-listing
```

### Features
- ✅ **Auto-extraction** from Zillow URLs
- ✅ **Image downloading** and local storage
- ✅ **Form validation** and preview
- ✅ **Code generation** for manual addition
- ✅ **One-click deployment** with passphrase

---

## 🏡 Adding New Listings

### Step 1: Extract Property Data

1. **Get Zillow URL**
   ```
   Example: https://www.zillow.com/homedetails/3971-Via-Cangrejo-San-Diego-CA-92130/16778600_zpid/
   ```

2. **Paste URL** in the admin panel

3. **Click "Extract"** button
   - System automatically fills: address, price, beds, baths, sqft
   - Downloads property images locally
   - Shows extraction status

### Step 2: Review & Edit

**Auto-filled fields:**
- ✅ Address
- ✅ Price
- ✅ Bedrooms
- ✅ Bathrooms  
- ✅ Square footage
- ✅ Property images

**Manual fields:**
- Property Type (dropdown)
- Status (dropdown)
- Additional image URL (optional)

### Step 3: Add to Website

Choose one of two methods:

#### Method A: One-Click Direct Add ⚡
1. Enter admin passphrase
2. Click "Add Listing to Website"
3. ✅ Done! Listing appears immediately

#### Method B: Manual Code Addition 📝
1. Click "Generate Listing Code"
2. Copy the generated code
3. Open `lib/zillow-api.ts`
4. Paste code in `mariaCurrentListings` array
5. Save file

---

## 📝 Manual Code Method

### File Location
```
lib/zillow-api.ts
```

### Code Structure
```typescript
export const mariaCurrentListings: ZillowListing[] = [
  {
    "zpid": "16778600",
    "address": "3971 Via Cangrejo, San Diego, CA 92130",
    "price": "$2,650,000",
    "bedrooms": 4,
    "bathrooms": 3,
    "livingArea": 2850,
    "propertyType": "Single Family Home",
    "homeStatus": "For Sale",
    "photos": ["/listings/16778600/image-1.jpg"],
    "listingUrl": "https://www.zillow.com/homedetails/...",
    "daysOnZillow": 1
  },
  // Add new listings here
];
```

### Adding New Listing
1. **Copy generated code** from admin panel
2. **Open** `lib/zillow-api.ts`
3. **Find** the `mariaCurrentListings` array
4. **Add code** inside the array (before closing `]`)
5. **Add comma** after previous listing
6. **Save file**

---

## 🚀 One-Click Direct Add

### Setup (One Time)

1. **Create `.env.local`** file in project root:
   ```env
   ADMIN_PASSPHRASE=your_secure_passphrase_here
   ```

2. **Restart development server**:
   ```bash
   npm run dev
   ```

### Usage

1. **Fill out listing form** (or use Extract)
2. **Enter passphrase** in green "Quick Add" section
3. **Click "Add Listing to Website"**
4. **✅ Done!** Listing appears immediately

### Security Features
- 🔐 **Passphrase protection** - Only authorized users can add
- 🛡️ **Server-side validation** - Passphrase verified on backend
- 📝 **File integrity** - Original code structure preserved
- 🔒 **Environment variable** - Passphrase stored securely

---

## 📸 Image Management

### Automatic Image Download

When using the Extract feature:
1. **Images detected** from Zillow listing
2. **Downloaded locally** to `/public/listings/{zpid}/`
3. **Organized by property** - each listing gets own folder
4. **Web-optimized paths** - `/listings/{zpid}/image-1.jpg`

### Image Storage Structure
```
public/
└── listings/
    └── 16778600/
        ├── image-1.jpg
        ├── image-2.jpg
        └── image-3.jpg
```

### Manual Image Addition
1. **Right-click** on Zillow property image
2. **Copy image address**
3. **Paste URL** in "Property Image URL" field
4. **Preview appears** automatically

### Image Benefits
- ✅ **Fast loading** - served from your server
- ✅ **Reliable** - no broken external links
- ✅ **SEO friendly** - proper image optimization
- ✅ **Backup** - images preserved locally

---

## 🔧 Troubleshooting

### Extraction Issues

**Problem**: "Zillow blocked extraction"
- **Cause**: Zillow blocks localhost requests
- **Solution**: Fill details manually or deploy to production

**Problem**: "No images found"
- **Cause**: Zillow changed page structure
- **Solution**: Add image URL manually

**Problem**: "Could not extract data"
- **Cause**: Invalid URL or network issue
- **Solution**: Check URL format and try again

### Direct Add Issues

**Problem**: "Invalid passphrase"
- **Solution**: Check `.env.local` file and restart server

**Problem**: "Failed to add listing"
- **Solution**: Check file permissions and server logs

### Display Issues

**Problem**: Listing not showing on website
- **Solution**: Check `lib/zillow-api.ts` syntax and restart server

**Problem**: Images not loading
- **Solution**: Verify image paths and file existence

---

## ⚙️ Technical Details

### File Structure
```
├── lib/
│   └── zillow-api.ts          # Main listings data
├── app/
│   ├── admin/
│   │   └── add-listing/
│   │       └── page.tsx       # Admin panel
│   └── api/
│       ├── extract-zillow-data/     # Data extraction
│       ├── download-property-images/ # Image download
│       └── add-listing-direct/      # Direct add API
├── components/
│   └── featured-listings.tsx  # Frontend display
└── public/
    └── listings/              # Downloaded images
```

### API Endpoints

**Extract Property Data**
```
POST /api/extract-zillow-data
Body: { zillowUrl: "https://..." }
```

**Download Images**
```
POST /api/download-property-images  
Body: { images: [...], zpid: "123" }
```

**Direct Add Listing**
```
POST /api/add-listing-direct
Body: { listing: {...}, passphrase: "..." }
```

### Data Types

```typescript
interface ZillowListing {
  zpid: string;           // Zillow Property ID
  address: string;        // Full address
  price: string;          // Formatted price
  bedrooms: number;       // Number of bedrooms
  bathrooms: number;      // Number of bathrooms
  livingArea: number;     // Square footage
  propertyType: string;   // Property type
  homeStatus: string;     // Listing status
  photos: string[];       // Image URLs/paths
  listingUrl: string;     // Zillow listing URL
  daysOnZillow: number;   // Days on market
}
```

### Environment Variables

```env
# Required for direct add feature
ADMIN_PASSPHRASE=your_secure_passphrase

# Optional - for better extraction
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

---

## 📞 Support

### Common Commands

**Start development server:**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```

**Update listings via script:**
```bash
npm run update-listings
```

### File Locations
- **Admin Panel**: `/admin/add-listing`
- **Listings Data**: `lib/zillow-api.ts`
- **Environment**: `.env.local`
- **Images**: `public/listings/`

### Best Practices
1. **Always backup** `zillow-api.ts` before manual edits
2. **Test extraction** on localhost before production
3. **Use descriptive** image alt text
4. **Keep passphrases** secure and unique
5. **Regular updates** to keep listings current

---

## 🎯 Quick Reference

| Task | Method | Time |
|------|--------|------|
| Add new listing | One-click direct | 30 seconds |
| Add new listing | Manual code | 2 minutes |
| Extract property data | Auto-extract | 10 seconds |
| Download images | Automatic | 30 seconds |
| Update existing listing | Edit code | 1 minute |

**Need help?** Check the troubleshooting section or contact the development team.