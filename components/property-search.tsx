"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Home, DollarSign, Bed, Bath } from "lucide-react";

export default function PropertySearch() {
  const [searchData, setSearchData] = useState({
    location: "La Jolla, CA",
    priceMin: "",
    priceMax: "",
    beds: "",
    baths: "",
    propertyType: "any"
  });

  const handleZillowSearch = () => {
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'property_search_click', {
        page_location: window.location.href,
        search_location: searchData.location,
        price_range: `${searchData.priceMin}-${searchData.priceMax}`,
        beds: searchData.beds,
        baths: searchData.baths
      });
    }
    
    // Construct functional Zillow search URL with filters
    let searchUrl = "https://www.zillow.com/la-jolla-ca/";
    const params = new URLSearchParams();
    
    // Add price filters
    if (searchData.priceMin) {
      params.append('price_min', searchData.priceMin);
    }
    if (searchData.priceMax) {
      params.append('price_max', searchData.priceMax);
    }
    
    // Add bedroom filter
    if (searchData.beds) {
      params.append('beds_min', searchData.beds);
    }
    
    // Add bathroom filter
    if (searchData.baths) {
      params.append('baths_min', searchData.baths);
    }
    
    // Add property type filter
    if (searchData.propertyType !== 'any') {
      params.append('home_type', searchData.propertyType);
    }
    
    // Add search parameters to URL
    if (params.toString()) {
      searchUrl += '?' + params.toString();
    }
    
    // Also add Maria's agent parameter to track referrals
    const separator = searchUrl.includes('?') ? '&' : '?';
    searchUrl += `${separator}agent_name=maria%20woods`;
    
    window.open(searchUrl, '_blank');
  };

  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Find Your Perfect La Jolla Home
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search through the latest listings with Maria's expert guidance
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
              {/* Location */}
              <div className="xl:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location
                </label>
                <input
                  type="text"
                  value={searchData.location}
                  onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#dcbbb4] focus:border-transparent"
                  placeholder="La Jolla, CA"
                />
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Home className="w-4 h-4 inline mr-1" />
                  Type
                </label>
                <select
                  value={searchData.propertyType}
                  onChange={(e) => setSearchData({ ...searchData, propertyType: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#dcbbb4] focus:border-transparent"
                >
                  <option value="any">Any Type</option>
                  <option value="house">House</option>
                  <option value="condo">Condo</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="land">Land</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Min Price
                </label>
                <select
                  value={searchData.priceMin}
                  onChange={(e) => setSearchData({ ...searchData, priceMin: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#dcbbb4] focus:border-transparent"
                >
                  <option value="">No Min</option>
                  <option value="500000">$500K</option>
                  <option value="750000">$750K</option>
                  <option value="1000000">$1M</option>
                  <option value="1500000">$1.5M</option>
                  <option value="2000000">$2M</option>
                  <option value="3000000">$3M+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Price
                </label>
                <select
                  value={searchData.priceMax}
                  onChange={(e) => setSearchData({ ...searchData, priceMax: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#dcbbb4] focus:border-transparent"
                >
                  <option value="">No Max</option>
                  <option value="1000000">$1M</option>
                  <option value="1500000">$1.5M</option>
                  <option value="2000000">$2M</option>
                  <option value="3000000">$3M</option>
                  <option value="5000000">$5M</option>
                  <option value="10000000">$10M+</option>
                </select>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Bed className="w-4 h-4 inline mr-1" />
                  Beds
                </label>
                <select
                  value={searchData.beds}
                  onChange={(e) => setSearchData({ ...searchData, beds: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#dcbbb4] focus:border-transparent"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>

              {/* Bathrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Bath className="w-4 h-4 inline mr-1" />
                  Baths
                </label>
                <select
                  value={searchData.baths}
                  onChange={(e) => setSearchData({ ...searchData, baths: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#dcbbb4] focus:border-transparent"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>
            </div>

            {/* Search Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleZillowSearch}
                className="flex items-center justify-center gap-2 rounded-md bg-[#dcbbb4] px-8 py-4 font-medium text-black transition-colors hover:bg-[#ccaaa4]"
              >
                <Search className="w-5 h-5" />
                Search Properties on Zillow
              </button>
              
              <button
                onClick={() => {
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'maria_listings_click', {
                      page_location: window.location.href,
                      cta_label: 'view_maria_listings'
                    });
                  }
                  window.open('https://www.zillow.com/profile/maria%20woodsca', '_blank');
                }}
                className="flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-8 py-4 font-medium text-gray-700 transition-colors hover:border-[#dcbbb4] hover:text-[#dcbbb4]"
              >
                <Home className="w-5 h-5" />
                View Maria's Listings
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          {[
            "Luxury Homes",
            "Ocean View Properties",
            "La Jolla Cove",
            "Bird Rock",
            "Muirlands",
            "La Jolla Shores"
          ].map((area, index) => (
            <button
              key={index}
              onClick={() => {
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'quick_search_click', {
                    search_term: area
                  });
                }
                
                // Create area-specific search URLs
                const areaSearchUrls: Record<string, string> = {
                  "Luxury Homes": "https://www.zillow.com/la-jolla-ca/?price_min=2000000&agent_name=maria%20woods",
                  "Ocean View Properties": "https://www.zillow.com/la-jolla-ca/?keywords=ocean%20view&agent_name=maria%20woods",
                  "La Jolla Cove": "https://www.zillow.com/la-jolla-cove-la-jolla-ca/?agent_name=maria%20woods",
                  "Bird Rock": "https://www.zillow.com/bird-rock-la-jolla-ca/?agent_name=maria%20woods",
                  "Muirlands": "https://www.zillow.com/muirlands-la-jolla-ca/?agent_name=maria%20woods",
                  "La Jolla Shores": "https://www.zillow.com/la-jolla-shores-la-jolla-ca/?agent_name=maria%20woods"
                };
                
                const searchUrl = areaSearchUrls[area] || `https://www.zillow.com/la-jolla-ca/?agent_name=maria%20woods`;
                window.open(searchUrl, '_blank');
              }}
              className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-[#dcbbb4] hover:text-[#dcbbb4]"
            >
              {area}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}