"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Bed, Bath, Square, Heart, ExternalLink, RefreshCw } from "lucide-react";
import { ZillowListing, getStatusBadgeColor, listingService } from "@/lib/zillow-api";

export default function FeaturedListings() {
  const [listings, setListings] = useState<ZillowListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchListings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/zillow-listings?limit=3');
      if (!response.ok) {
        throw new Error('Failed to fetch listings');
      }
      
      const data = await response.json();
      setListings(Array.isArray(data) ? data : []);
    } catch (err) {
      // Fallback to local listings if API fails
      setListings(listingService.getLatest(3));
      setError(null); // Don't show error since we have fallback data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleListingClick = (listing: ZillowListing) => {
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'featured_listing_click', {
        listing_price: listing.price,
        listing_address: listing.address,
        zpid: listing.zpid
      });
    }
    
    // Open the specific listing URL if available, otherwise Maria's profile
    const url = listing.listingUrl || 'https://www.zillow.com/profile/maria%20woodsca';
    window.open(url, '_blank');
  };

  return (
    <section className="bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-3xl font-bold text-gray-900">
              Maria's Current Listings
            </h2>
            <button
              onClick={fetchListings}
              disabled={loading}
              className="rounded-full bg-[#dcbbb4] p-2 text-black transition-colors hover:bg-[#ccaaa4] disabled:opacity-50"
              title="Refresh listings"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore Maria's current property listings in La Jolla
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#dcbbb4] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading Maria's latest listings...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">Failed to load listings: {error}</p>
            <button
              onClick={fetchListings}
              className="rounded-md bg-[#dcbbb4] px-4 py-2 font-medium text-black transition-colors hover:bg-[#ccaaa4]"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Listings Grid */}
        {!loading && !error && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing, index) => (
              <motion.div
                key={listing.zpid}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => handleListingClick(listing)}
              >
                <div className="rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={listing.photos[0] || "/hero.jpg"}
                      alt={listing.address}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadgeColor(listing.homeStatus)}`}>
                        {listing.homeStatus}
                      </span>
                    </div>

                    {/* Days on Market Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="rounded-full bg-black/70 px-2 py-1 text-xs font-medium text-white">
                        {listing.daysOnZillow} days
                      </span>
                    </div>

                    {/* Heart Icon */}
                    <button className="absolute bottom-4 right-4 rounded-full bg-white/80 p-2 hover:bg-white transition-colors">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>

                    {/* View Details Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="rounded-full bg-white px-4 py-2 flex items-center gap-2 text-sm font-medium">
                          View Details
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-2">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {listing.price}
                      </h3>
                      <p className="text-gray-600">{listing.address}</p>
                      <p className="text-sm text-gray-500">{listing.propertyType}</p>
                    </div>

                    {/* Property Details */}
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        <span>{listing.bedrooms} beds</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="w-4 h-4" />
                        <span>{listing.bathrooms} baths</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Square className="w-4 h-4" />
                        <span>{listing.livingArea.toLocaleString()} sqft</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Button */}
        {!loading && !error && listings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button
              onClick={() => {
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'view_all_listings_click', {
                    page_location: window.location.href
                  });
                }
                window.open('https://www.zillow.com/profile/maria%20woodsca', '_blank');
              }}
              className="rounded-md bg-[#dcbbb4] px-8 py-4 font-medium text-black transition-colors hover:bg-[#ccaaa4]"
            >
              View All Listings on Zillow
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}