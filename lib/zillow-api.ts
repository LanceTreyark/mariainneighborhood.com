export interface ZillowListing {
  zpid: string;
  address: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  livingArea: number;
  propertyType: string;
  homeStatus: string;
  photos: string[];
  listingUrl: string;
  daysOnZillow: number;
  priceHistory?: Array<{
    date: string;
    price: number;
    event: string;
  }>;
}

// Helper function to get status badge color
export function getStatusBadgeColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'new listing':
      return 'bg-green-100 text-green-800';
    case 'for sale':
      return 'bg-blue-100 text-blue-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'sold':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-blue-100 text-blue-800';
  }
}

// Main listings array - automatically updated from Zillow
export const mariaCurrentListings: ZillowListing[] = [
  {
    "zpid": "16778600",
    "address": "3971 Via Cangrejo San Diego CA 92130",
    "price": "$2,650,000",
    "bedrooms": 4,
    "bathrooms": 2,
    "livingArea": 2796,
    "propertyType": "Single Family Home",
    "homeStatus": "For Sale",
    "photos": [
      "/listings/zillow.webp"
    ],
    "listingUrl": "https://www.zillow.com/homedetails/3971-Via-Cangrejo-San-Diego-CA-92130/16778600_zpid/",
    "daysOnZillow": 1
  },
];

// Streamlined listing functions
export const listingService = {
  // Get all listings
  getAll: (): ZillowListing[] => mariaCurrentListings,

  // Get featured listing (first one)
  getFeatured: (): ZillowListing | null => mariaCurrentListings[0] || null,

  // Get latest listings with limit
  getLatest: (count: number = 3): ZillowListing[] => mariaCurrentListings.slice(0, count),

  // Get listings by status
  getByStatus: (status: string): ZillowListing[] =>
    mariaCurrentListings.filter(listing =>
      listing.homeStatus.toLowerCase() === status.toLowerCase()
    ),

  // Get listings in price range
  getByPriceRange: (minPrice: number, maxPrice: number): ZillowListing[] =>
    mariaCurrentListings.filter(listing => {
      const price = parseFloat(listing.price.replace(/[$,]/g, ''));
      return price >= minPrice && price <= maxPrice;
    }),

  // Search listings by address
  searchByAddress: (query: string): ZillowListing[] =>
    mariaCurrentListings.filter(listing =>
      listing.address.toLowerCase().includes(query.toLowerCase())
    ),

  // Get listing by zpid
  getById: (zpid: string): ZillowListing | null =>
    mariaCurrentListings.find(listing => listing.zpid === zpid) || null,

  // Get total count
  getCount: (): number => mariaCurrentListings.length,

  // Format price for display
  formatPrice: (price: string): string => {
    const numPrice = parseFloat(price.replace(/[$,]/g, ''));
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numPrice);
  }
};

// Legacy functions for backward compatibility
export function getFeaturedListing(): ZillowListing | null {
  return listingService.getFeatured();
}

export function getLatestListings(count: number = 3): ZillowListing[] {
  return listingService.getLatest(count);
}

export function getAllListings(): ZillowListing[] {
  return listingService.getAll();
}

// Utility functions for managing listings
export const listingManager = {
  // Add a new listing
  addListing: (listing: ZillowListing): void => {
    mariaCurrentListings.unshift(listing); // Add to beginning
  },

  // Remove a listing by zpid
  removeListing: (zpid: string): boolean => {
    const index = mariaCurrentListings.findIndex(listing => listing.zpid === zpid);
    if (index > -1) {
      mariaCurrentListings.splice(index, 1);
      return true;
    }
    return false;
  },

  // Update a listing
  updateListing: (zpid: string, updates: Partial<ZillowListing>): boolean => {
    const index = mariaCurrentListings.findIndex(listing => listing.zpid === zpid);
    if (index > -1) {
      mariaCurrentListings[index] = { ...mariaCurrentListings[index], ...updates };
      return true;
    }
    return false;
  },

  // Create a new listing template
  createListingTemplate: (address: string, price: string): ZillowListing => ({
    zpid: `custom_${Date.now()}`,
    address,
    price,
    bedrooms: 0,
    bathrooms: 0,
    livingArea: 0,
    propertyType: "Single Family Home",
    homeStatus: "For Sale",
    photos: ["/hero.jpg"],
    listingUrl: "https://www.zillow.com/profile/maria%20woodsca",
    daysOnZillow: 1
  })
};