import { Metadata } from "next";
import ListingsManager from "@/components/admin/listings-manager";
import { mariaCurrentListings } from "@/lib/zillow-api";

export const metadata: Metadata = {
  title: "Manage Listings - Maria Woods Real Estate",
  description: "Admin interface for managing real estate listings",
};

export default function AdminListingsPage() {
  const handleUpdate = (listings: any[]) => {
    console.log('Listings updated:', listings);
    // In a real app, this would save to a database
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Listings</h1>
          <p className="text-gray-600 mt-2">
            Add, edit, or remove Maria's current real estate listings
          </p>
        </div>
        
        <ListingsManager 
          initialListings={mariaCurrentListings}
          onUpdate={handleUpdate}
        />
        
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Add from Zillow</h3>
          <p className="text-gray-600 mb-4">
            To add a listing from Zillow:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
            <li>Go to the property page on Zillow</li>
            <li>Copy the URL and basic details</li>
            <li>Click "Add Listing" above and fill in the information</li>
            <li>Save changes to update the website</li>
          </ol>
        </div>
      </div>
    </div>
  );
}