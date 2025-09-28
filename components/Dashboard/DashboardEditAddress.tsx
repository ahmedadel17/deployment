'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import DashboardSidebar from './DashboardSidebar'

interface AddressFormData {
  title: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude: string;
  longitude: string;
}

interface DashboardEditAddressProps {
  user?: {
    name: string;
    email: string;
    initials: string;
  };
  initialAddress?: AddressFormData;
}

// Declare Google Maps types for TypeScript
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

function DashboardEditAddress({ 
  user = { name: 'Ahmed Al-Rashid', email: 'ahmed@example.com', initials: 'AR' },
  initialAddress
}: DashboardEditAddressProps) {
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const geocoderRef = useRef<any>(null);
  
  const [formData, setFormData] = useState<AddressFormData>({
    title: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    latitude: '',
    longitude: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [errors, setErrors] = useState<Partial<AddressFormData>>({});

  // Check if we're editing an existing address
  const addressId = searchParams.get('id');
  const isEditing = Boolean(addressId);

  useEffect(() => {
    // Load Google Maps script
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyBJfohIso1D_UllVzMFdpckDQVC5SkuEjk'}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setMapLoaded(true);
        initMap();
      };
      document.head.appendChild(script);
    } else {
      setMapLoaded(true);
      initMap();
    }

    // Load existing address data if editing
    if (isEditing && initialAddress) {
      setFormData(initialAddress);
    }

    return () => {
      // Cleanup
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
    };
  }, [isEditing, initialAddress]);

  const initMap = () => {
    if (!mapRef.current || !window.google) return;

    // Initialize the map centered on a default location
    const defaultCenter = {
      lat: parseFloat(formData.latitude) || 24.7136, // Riyadh coordinates
      lng: parseFloat(formData.longitude) || 46.6753
    };

    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 12,
    });

    // Initialize the geocoder service
    geocoderRef.current = new window.google.maps.Geocoder();

    // Add a marker that can be moved
    markerRef.current = new window.google.maps.Marker({
      map: mapInstanceRef.current,
      position: defaultCenter,
      draggable: true
    });

    // Initial population of the lat/lng fields
    updateLatLngInputs(defaultCenter);

    // Listen for a click on the map
    mapInstanceRef.current.addListener("click", (e: any) => {
      geocodeLatLng(e.latLng);
      updateLatLngInputs(e.latLng);
    });

    // Listen for the marker to be dragged
    markerRef.current.addListener("dragend", () => {
      geocodeLatLng(markerRef.current.getPosition());
      updateLatLngInputs(markerRef.current.getPosition());
    });
  };

  const geocodeLatLng = (latLng: any) => {
    if (!geocoderRef.current) return;

    geocoderRef.current.geocode({
      location: latLng
    }, (results: any, status: any) => {
      if (status === "OK") {
        if (results[0]) {
          // Update the marker position and zoom level
          mapInstanceRef.current.setZoom(16);
          markerRef.current.setPosition(latLng);

          // Call a function to fill the form fields
          fillFormWithAddress(results[0].address_components);
        } else {
          alert("No results found");
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
  };

  const updateLatLngInputs = (latLng: any) => {
    setFormData(prev => ({
      ...prev,
      latitude: latLng.lat().toString(),
      longitude: latLng.lng().toString()
    }));
  };

  const fillFormWithAddress = (components: any[]) => {
    let streetNumber = '';
    let route = '';

    const newFormData = { ...formData };

    for (const component of components) {
      const type = component.types[0];
      switch (type) {
        case 'street_number':
          streetNumber = component.long_name;
          break;
        case 'route':
          route = component.long_name;
          break;
        case 'locality':
          newFormData.city = component.long_name;
          break;
        case 'administrative_area_level_1':
          newFormData.state = component.short_name;
          break;
        case 'postal_code':
          newFormData.postalCode = component.long_name;
          break;
        case 'country':
          newFormData.country = component.long_name;
          break;
      }
    }
    
    newFormData.addressLine1 = `${streetNumber} ${route}`.trim();
    setFormData(newFormData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof AddressFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<AddressFormData> = {};

    if (!formData.title.trim()) newErrors.title = 'Address title is required';
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address line 1 is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State/Province is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Saving address:', formData);
      
      // Here you would typically call your API to save the address
      // const response = await axios.post('/api/addresses', formData);
      
      alert(isEditing ? 'Address updated successfully!' : 'Address added successfully!');
      router.push('/dashboard/addresses');
      
    } catch (error) {
      console.error('Failed to save address:', error);
      alert('Failed to save address. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="lg:col-span-3 space-y-8">
        
        {/* Edit Address Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-600">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isEditing ? 'Edit Address' : 'Add New Address via Map'}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Click on the map or drag the marker to set your address location
            </p>
          </div>
          
          <div className="p-6">
            {/* Google Map */}
            <div 
              ref={mapRef}
              className="h-96 w-full rounded-lg mb-6 border border-gray-300"
              style={{ minHeight: '384px' }}
            >
              {!mapLoaded && (
                <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-2"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading map...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Address Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Address Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.title ? 'border-red-500' : ''
                  }`}
                  placeholder="e.g., Home, Work, Shipping"
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              </div>

              <div>
                <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Address Line 1 *
                </label>
                <input
                  type="text"
                  id="addressLine1"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.addressLine1 ? 'border-red-500' : ''
                  }`}
                  placeholder="Street address"
                />
                {errors.addressLine1 && <p className="mt-1 text-sm text-red-600">{errors.addressLine1}</p>}
              </div>

              <div>
                <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Address Line 2
                </label>
                <input
                  type="text"
                  id="addressLine2"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Apartment, suite, unit, building, floor, etc."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.city ? 'border-red-500' : ''
                    }`}
                    placeholder="City"
                  />
                  {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    State/Province *
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.state ? 'border-red-500' : ''
                    }`}
                    placeholder="State/Province"
                  />
                  {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.postalCode ? 'border-red-500' : ''
                    }`}
                    placeholder="Postal Code"
                  />
                  {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>}
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Country *
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.country ? 'border-red-500' : ''
                    }`}
                  >
                    <option value="United States">United States</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Oman">Oman</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Egypt">Egypt</option>
                  </select>
                  {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Latitude
                  </label>
                  <input
                    type="text"
                    id="latitude"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    readOnly
                  />
                </div>

                <div>
                  <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Longitude
                  </label>
                  <input
                    type="text"
                    id="longitude"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    readOnly
                  />
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`te-btn te-btn-primary ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {isEditing ? 'Updating...' : 'Saving...'}
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {isEditing ? 'Update Address' : 'Save Address'}
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="te-btn te-btn-default"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Map Instructions */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Map Instructions
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Click anywhere on the map to set your address location</li>
            <li>• Drag the red marker to fine-tune the position</li>
            <li>• The form will automatically fill with address details</li>
            <li>• You can manually edit any field if needed</li>
          </ul>
        </div>

      </div>
    </>
  );
}

export default DashboardEditAddress;

