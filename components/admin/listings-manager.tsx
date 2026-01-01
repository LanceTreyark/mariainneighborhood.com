"use client";

import { useState } from "react";
import { ZillowListing } from "@/lib/zillow-api";
import { Plus, Save, Trash2 } from "lucide-react";

interface ListingsManagerProps {
  initialListings: ZillowListing[];
  //onUpdate: (listings: ZillowListing[]) => void;
}

export default function ListingsManager({ initialListings }: ListingsManagerProps) {
  const [listings, setListings] = useState<ZillowListing[]>(initialListings);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
//export default function ListingsManager({ initialListings, onUpdate }: ListingsManagerProps) {
//  const [listings, setListings] = useState<ZillowListing[]>(initialListings);
//  const [isEditing, setIsEditing] = useState(false);

  const addNewListing = () => {
    const newListing: ZillowListing = {
      zpid: `new_${Date.now()}`,
      address: "",
      price: "$0",
      bedrooms: 0,
      bathrooms: 0,
      livingArea: 0,
      propertyType: "Single Family Home",
      homeStatus: "For Sale",
      photos: ["/hero.jpg"],
      listingUrl: "",
      daysOnZillow: 0
    };
    
    setListings([...listings, newListing]);
    setIsEditing(true);
  };

  const updateListing = (index: number, field: keyof ZillowListing, value: any) => {
    const updated = [...listings];
    updated[index] = { ...updated[index], [field]: value };
    setListings(updated);
  };

  const deleteListing = (index: number) => {
    const updated = listings.filter((_, i) => i !== index);
    setListings(updated);
  };

    const saveListings = async () => {
    try {
      setIsSaving(true);

      const response = await fetch("/api/zillow-listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listings }),
      });

      if (!response.ok) {
        throw new Error("Save failed");
      }

      console.log("Listings saved:", listings);
      setIsEditing(false);
      alert("Listings updated successfully!");
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to update listings");
    } finally {
      setIsSaving(false);
    }
  };
  /*
  const saveListings = async () => {
    try {
      const response = await fetch('/api/zillow-listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listings })
      });
      
      if (response.ok) {
        onUpdate(listings);
        setIsEditing(false);
        alert('Listings updated successfully!');
      }
    } catch (error) {
      alert('Failed to update listings');
    }
  };
  */

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Manage Listings</h3>
        <div className="flex gap-2">
          <button
            onClick={addNewListing}
            className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            <Plus className="w-4 h-4" />
            Add Listing
          </button>
          {isEditing && (
            <button
              onClick={saveListings}
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {listings.map((listing, index) => (
          <div key={listing.zpid} className="border border-gray-200 rounded-lg p-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={listing.address}
                  onChange={(e) => updateListing(index, 'address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="123 Main St, La Jolla, CA"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="text"
                  value={listing.price}
                  onChange={(e) => updateListing(index, 'price', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="$1,000,000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                <input
                  type="number"
                  value={listing.bedrooms}
                  onChange={(e) => updateListing(index, 'bedrooms', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                <input
                  type="number"
                  value={listing.bathrooms}
                  onChange={(e) => updateListing(index, 'bathrooms', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Square Feet</label>
                <input
                  type="number"
                  value={listing.livingArea}
                  onChange={(e) => updateListing(index, 'livingArea', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                <select
                  value={listing.propertyType}
                  onChange={(e) => updateListing(index, 'propertyType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Single Family Home">Single Family Home</option>
                  <option value="Condo">Condo</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Land">Land</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={listing.homeStatus}
                  onChange={(e) => updateListing(index, 'homeStatus', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="For Sale">For Sale</option>
                  <option value="New Listing">New Listing</option>
                  <option value="Pending">Pending</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={() => deleteListing(index)}
                  className="flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Zillow URL</label>
              <input
                type="url"
                value={listing.listingUrl}
                onChange={(e) => updateListing(index, 'listingUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="https://www.zillow.com/homedetails/..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}