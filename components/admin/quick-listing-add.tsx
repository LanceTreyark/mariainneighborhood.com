"use client";

import { useState } from "react";
import { Plus, ExternalLink } from "lucide-react";

export default function QuickListingAdd() {
  const [zillowUrl, setZillowUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleZillowUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!zillowUrl.includes('zillow.com')) {
      alert('Please enter a valid Zillow URL');
      return;
    }

    setIsProcessing(true);
    
    // Extract basic info from Zillow URL
    try {
      // This is a simplified approach - in reality, you'd need to scrape or manually enter
      const zpid = zillowUrl.match(/\/(\d+)_zpid/)?.[1] || Date.now().toString();
      
      const newListing = {
        zpid: zpid,
        address: "New Listing - Please Update Address",
        price: "$0 - Please Update Price",
        bedrooms: 0,
        bathrooms: 0,
        livingArea: 0,
        propertyType: "Single Family Home",
        homeStatus: "For Sale",
        photos: ["/hero.jpg"],
        listingUrl: zillowUrl,
        daysOnZillow: 1,
      };

      // In a real app, this would save to database
      console.log('New listing to add:', newListing);
      alert('Listing template created! Please update the details in the form above.');
      
    } catch (error) {
      alert('Failed to process Zillow URL');
    } finally {
      setIsProcessing(false);
      setZillowUrl("");
    }
  };

  return (
    <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Plus className="w-5 h-5 text-blue-600" />
        Quick Add from Zillow
      </h3>
      
      <form onSubmit={handleZillowUrlSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Zillow Listing URL
          </label>
          <input
            type="url"
            value={zillowUrl}
            onChange={(e) => setZillowUrl(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://www.zillow.com/homedetails/..."
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isProcessing}
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Processing...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Create Listing Template
            </>
          )}
        </button>
      </form>
      
      <div className="mt-4 text-sm text-gray-600">
        <p><strong>How to use:</strong></p>
        <ol className="list-decimal list-inside space-y-1 mt-2">
          <li>Copy the Zillow URL of Maria's listing</li>
          <li>Paste it above and click "Create Template"</li>
          <li>Update the details in the main form</li>
          <li>Save to make it live on the website</li>
        </ol>
      </div>
    </div>
  );
}