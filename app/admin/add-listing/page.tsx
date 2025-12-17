"use client";

import { useState } from "react";
import { Plus, Copy, Check, Download } from "lucide-react";

export default function AddListingPage() {
  const [formData, setFormData] = useState({
    zillowUrl: "",
    address: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    propertyType: "Single Family Home",
    status: "For Sale",
    imageUrl: ""
  });
  
  const [generatedCode, setGeneratedCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [extractionStatus, setExtractionStatus] = useState("");
  const [downloadingImages, setDownloadingImages] = useState(false);
  const [downloadedImages, setDownloadedImages] = useState<string[]>([]);
  const [passphrase, setPassphrase] = useState("");
  const [addingDirect, setAddingDirect] = useState(false);
  const [directAddStatus, setDirectAddStatus] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Extract ZPID from URL
    const zpidMatch = formData.zillowUrl.match(/\/(\d+)_zpid/);
    const zpid = zpidMatch ? zpidMatch[1] : `manual_${Date.now()}`;
    
    // Create listing object
    const newListing = {
      zpid: zpid,
      address: formData.address,
      price: formData.price.startsWith('$') ? formData.price : `$${formData.price}`,
      bedrooms: parseInt(formData.bedrooms) || 0,
      bathrooms: parseFloat(formData.bathrooms) || 0,
      livingArea: parseInt(formData.sqft.replace(/,/g, '')) || 0,
      propertyType: formData.propertyType,
      homeStatus: formData.status,
      photos: downloadedImages.length > 0 ? downloadedImages : (formData.imageUrl ? [formData.imageUrl] : ["/hero.jpg"]),
      listingUrl: formData.zillowUrl,
      daysOnZillow: 1
    };
    
    // Generate code directly (following the existing pattern)
    const code = `  {
    "zpid": "${newListing.zpid}",
    "address": "${newListing.address}",
    "price": "${newListing.price}",
    "bedrooms": ${newListing.bedrooms},
    "bathrooms": ${newListing.bathrooms},
    "livingArea": ${newListing.livingArea},
    "propertyType": "${newListing.propertyType}",
    "homeStatus": "${newListing.homeStatus}",
    "photos": ${JSON.stringify(newListing.photos)},
    "listingUrl": "${newListing.listingUrl}",
    "daysOnZillow": ${newListing.daysOnZillow}
  },`;
    
    setGeneratedCode(code);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const extractZillowData = async (url: string) => {
    if (!url || !url.includes('zillow.com/homedetails/')) {
      setExtractionStatus("Please enter a valid Zillow listing URL");
      return;
    }
    
    setLoading(true);
    setExtractionStatus("Extracting property details...");
    
    try {
      const response = await fetch('/api/extract-zillow-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zillowUrl: url })
      });
      
      const result = await response.json();
      console.log('Extraction result:', result);
      
      if (result.success && result.data) {
        const data = result.data;
        
        // Auto-fill form with extracted data
        setFormData(prev => ({
          ...prev,
          address: data.address || prev.address,
          price: data.price || prev.price,
          bedrooms: data.bedrooms?.toString() || prev.bedrooms,
          bathrooms: data.bathrooms?.toString() || prev.bathrooms,
          sqft: data.livingArea?.toLocaleString() || prev.sqft,
          imageUrl: data.images?.[0] || prev.imageUrl
        }));
        
        // Download images if available
        if (data.images && data.images.length > 0) {
          await downloadImages(data.images, data.zpid || url.match(/\/(\d+)_zpid/)?.[1] || 'temp');
        }
        
        setExtractionStatus(`✅ Extracted ${Object.keys(data).filter(k => data[k]).length} property details`);
        
      } else if (result.blocked) {
        // Handle blocked case with partial data
        if (result.extractedFromUrl) {
          setFormData(prev => ({
            ...prev,
            address: result.extractedFromUrl.address || prev.address
          }));
        }
        
        setExtractionStatus("⚠️ Zillow blocked extraction. Please fill details manually.");
        
      } else {
        setExtractionStatus("❌ Could not extract data. Please fill manually.");
      }
      
    } catch (error) {
      console.error('Extraction error:', error);
      setExtractionStatus("❌ Extraction failed. Please fill manually.");
    } finally {
      setLoading(false);
      // Clear status after 5 seconds
      setTimeout(() => setExtractionStatus(""), 5000);
    }
  };

  const downloadImages = async (imageUrls: string[], zpid: string) => {
    if (!imageUrls || imageUrls.length === 0) return;
    
    setDownloadingImages(true);
    console.log(`📥 Downloading ${imageUrls.length} images for ZPID: ${zpid}`);
    
    try {
      const response = await fetch('/api/download-property-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          images: imageUrls, 
          zpid: zpid 
        })
      });
      
      const result = await response.json();
      
      if (result.success && result.downloadedImages) {
        setDownloadedImages(result.downloadedImages);
        console.log(`✅ Downloaded ${result.downloadedImages.length} images locally:`, result.downloadedImages);
        
        // Update form with first downloaded image
        if (result.downloadedImages.length > 0) {
          setFormData(prev => ({
            ...prev,
            imageUrl: result.downloadedImages[0]
          }));
        }
      } else {
        console.error('❌ Failed to download images:', result.error);
      }
    } catch (error) {
      console.error('❌ Error downloading images:', error);
    } finally {
      setDownloadingImages(false);
    }
  };

  const addListingDirect = async () => {
    if (!passphrase.trim()) {
      setDirectAddStatus("❌ Please enter the admin passphrase");
      return;
    }

    // Create listing object
    const zpidMatch = formData.zillowUrl.match(/\/(\d+)_zpid/);
    const zpid = zpidMatch ? zpidMatch[1] : `manual_${Date.now()}`;
    
    const newListing = {
      zpid: zpid,
      address: formData.address,
      price: formData.price.startsWith('$') ? formData.price : `$${formData.price}`,
      bedrooms: parseInt(formData.bedrooms) || 0,
      bathrooms: parseFloat(formData.bathrooms) || 0,
      livingArea: parseInt(formData.sqft.replace(/,/g, '')) || 0,
      propertyType: formData.propertyType,
      homeStatus: formData.status,
      photos: downloadedImages.length > 0 ? downloadedImages : (formData.imageUrl ? [formData.imageUrl] : ["/hero.jpg"]),
      listingUrl: formData.zillowUrl,
      daysOnZillow: 1
    };

    setAddingDirect(true);
    setDirectAddStatus("Adding listing to website...");

    try {
      const response = await fetch('/api/add-listing-direct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          listing: newListing, 
          passphrase: passphrase 
        })
      });

      const result = await response.json();

      if (result.success) {
        setDirectAddStatus("✅ Listing added to website successfully!");
        // Clear form after successful add
        setTimeout(() => {
          setFormData({
            zillowUrl: "",
            address: "",
            price: "",
            bedrooms: "",
            bathrooms: "",
            sqft: "",
            propertyType: "Single Family Home",
            status: "For Sale",
            imageUrl: ""
          });
          setDownloadedImages([]);
          setGeneratedCode("");
          setPassphrase("");
        }, 2000);
      } else {
        setDirectAddStatus(`❌ ${result.error}`);
      }
    } catch (error) {
      console.error('Error adding listing:', error);
      setDirectAddStatus("❌ Failed to add listing");
    } finally {
      setAddingDirect(false);
      // Clear status after 5 seconds
      setTimeout(() => setDirectAddStatus(""), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add Real Listing</h1>
          <p className="text-gray-600 mt-2">
            Add Maria's actual Zillow listing to the website
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Listing Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zillow Listing URL *
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    value={formData.zillowUrl}
                    onChange={(e) => setFormData({ ...formData, zillowUrl: e.target.value })}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#dcbbb4] focus:border-transparent"
                    placeholder="https://www.zillow.com/homedetails/..."
                  />
                  <button
                    type="button"
                    onClick={() => extractZillowData(formData.zillowUrl)}
                    disabled={!formData.zillowUrl || loading}
                    className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    title="Extract property details from Zillow"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span className="text-sm">Extract</span>
                      </>
                    )}
                  </button>
                </div>
                {extractionStatus && (
                  <p className={`text-sm mt-2 ${
                    extractionStatus.includes('✅') ? 'text-green-600' : 
                    extractionStatus.includes('⚠️') ? 'text-yellow-600' : 
                    extractionStatus.includes('❌') ? 'text-red-600' : 'text-blue-600'
                  }`}>
                    {extractionStatus}
                  </p>
                )}
                
                {downloadingImages && (
                  <div className="flex items-center gap-2 text-blue-600 mt-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-sm">Downloading property images...</span>
                  </div>
                )}
                
                {downloadedImages.length > 0 && (
                  <div className="mt-3 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700 mb-2">✅ Downloaded {downloadedImages.length} images locally</p>
                    <div className="grid grid-cols-4 gap-2">
                      {downloadedImages.slice(0, 4).map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Downloaded ${index + 1}`}
                          className="w-full h-12 object-cover rounded border border-green-300"
                        />
                      ))}
                    </div>
                    {downloadedImages.length > 4 && (
                      <p className="text-xs text-green-600 mt-1">+{downloadedImages.length - 4} more images</p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#dcbbb4] focus:border-transparent"
                  placeholder="123 Main St, La Jolla, CA 92037"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#dcbbb4] focus:border-transparent"
                    placeholder="$2,500,000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Square Feet
                  </label>
                  <input
                    type="text"
                    value={formData.sqft}
                    onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#dcbbb4] focus:border-transparent"
                    placeholder="2,500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#dcbbb4] focus:border-transparent"
                    placeholder="4"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#dcbbb4] focus:border-transparent"
                    placeholder="3.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Image URL (optional)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#dcbbb4] focus:border-transparent"
                    placeholder="https://photos.zillowstatic.com/..."
                  />
                  {formData.imageUrl && (
                    <div className="w-16 h-12 border border-gray-300 rounded overflow-hidden">
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#dcbbb4] focus:border-transparent"
                  >
                    <option value="Single Family Home">Single Family Home</option>
                    <option value="Condo">Condo</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Land">Land</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#dcbbb4] focus:border-transparent"
                  >
                    <option value="For Sale">For Sale</option>
                    <option value="New Listing">New Listing</option>
                    <option value="Pending">Pending</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-md bg-[#dcbbb4] px-6 py-4 font-medium text-black transition-colors hover:bg-[#ccaaa4]"
              >
                <Plus className="w-5 h-5" />
                Generate Listing Code
              </button>
            </form>

            {/* Direct Add Section */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-medium text-green-900 mb-3">🚀 Quick Add to Website</h3>
              <p className="text-sm text-green-700 mb-4">
                Skip the code copying - add this listing directly to your website with one click!
              </p>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-green-800 mb-2">
                    Admin Passphrase
                  </label>
                  <input
                    type="password"
                    value={passphrase}
                    onChange={(e) => setPassphrase(e.target.value)}
                    className="w-full px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter admin passphrase"
                  />
                </div>
                
                <button
                  type="button"
                  onClick={addListingDirect}
                  disabled={!passphrase.trim() || addingDirect || !formData.address}
                  className="w-full flex items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-3 font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addingDirect ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Adding to Website...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add Listing to Website</span>
                    </>
                  )}
                </button>
                
                {directAddStatus && (
                  <p className={`text-sm ${
                    directAddStatus.includes('✅') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {directAddStatus}
                  </p>
                )}
              </div>
            </div>


          </div>

          {/* Generated Code */}
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Generated Code</h2>
            
            {generatedCode ? (
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <button
                    onClick={copyToClipboard}
                    className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <pre className="text-green-400 text-sm overflow-x-auto pr-8">
                    <code>{generatedCode}</code>
                  </pre>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">How to add this listing:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                    <li>Copy the code above</li>
                    <li>Open <code>lib/zillow-api.ts</code></li>
                    <li>Find the <code>mariaCurrentListings</code> array</li>
                    <li>Add the code inside the array (before the closing <code>]</code>)</li>
                    <li>Save the file</li>
                    <li>The listing will appear on the website immediately!</li>
                  </ol>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Plus className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Fill out the form to generate listing code</p>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Start Guide</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">1. Extract Property Data</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Paste Zillow listing URL</li>
                <li>• Click "Extract" to auto-fill details</li>
                <li>• Images will be downloaded automatically</li>
                <li>• Review and edit any details as needed</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">2. Add to Website</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Click "Generate Listing Code"</li>
                <li>• Copy the generated code</li>
                <li>• Add to lib/zillow-api.ts file</li>
                <li>• Save and refresh your website</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">🔐 Quick Add Setup</h4>
              <p className="text-sm text-blue-700 mb-2">
                To use the "Add Listing to Website" feature, set your admin passphrase in <code>.env.local</code>:
              </p>
              <code className="text-xs bg-blue-100 px-2 py-1 rounded">ADMIN_PASSPHRASE=your_secure_passphrase</code>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">⚠️ Development Note</h4>
              <p className="text-sm text-yellow-700">
                Zillow may block extraction requests from localhost. If extraction fails, 
                you can manually fill in the details or deploy to a production domain for better success rates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}