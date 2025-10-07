"use client";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useCallback, useState } from "react";

type Props = {
  onLocationSelect: (lat: number, lng: number, address?: string) => void;
};

export default function LocationPicker({ onLocationSelect }: Props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
  });

  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const cleanMapStyle: google.maps.MapTypeStyle[] = [
    {
      featureType: "poi", // points of interest (restaurants, shops, etc.)
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit", // bus stops, train stations
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "administrative", // country/state/city borders
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road", // keep roads visible but remove labels
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "all",
      elementType: "labels.icon", // remove all small icons
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "landscape.man_made", // remove 3D buildings
      stylers: [{ visibility: "off" }],
    },
  ];
  

  // Build a human-friendly address without street numbers
  const buildFriendlyAddress = (
    components: google.maps.GeocoderAddressComponent[] | undefined,
    formatted?: string
  ): string | undefined => {
    if (!components || !components.length) return formatted;
    let route = '';
    let sublocality = '';
    let neighborhood = '';
    let locality = '';
    let admin1 = '';

    for (const comp of components) {
      if (comp.types.includes('route')) route = comp.long_name;
      else if (comp.types.includes('sublocality') || comp.types.includes('sublocality_level_1')) sublocality = comp.long_name;
      else if (comp.types.includes('neighborhood')) neighborhood = comp.long_name;
      else if (comp.types.includes('locality')) locality = comp.long_name;
      else if (comp.types.includes('administrative_area_level_1')) admin1 = comp.long_name;
    }

    const parts = [route, sublocality || neighborhood, locality || admin1].filter(Boolean);
    const friendly = parts.join(', ');
    return friendly || formatted;
  };

  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarker({ lat, lng });

      // Reverse geocode to get human-readable address
      try {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            const best = results.find(r => r.types.includes('establishment') || r.types.includes('point_of_interest')) || results[0];
            const friendly = buildFriendlyAddress(best.address_components, best.formatted_address);
            onLocationSelect(lat, lng, friendly);
          } else {
            onLocationSelect(lat, lng, undefined);
          }
        });
      } catch {
        onLocationSelect(lat, lng, undefined);
      }
    }
  }, [onLocationSelect]);

  if (!isLoaded) return <p>Loading Map...</p>;

  return (
    <GoogleMap
      zoom={5}
      center={{ lat: 30.0444, lng: 31.2357 }} // Egypt default center
      mapContainerStyle={{ width: "100%", height: "400px" }}
      onClick={handleMapClick}
    >
      {marker && <Marker position={marker} draggable onDragEnd={handleMapClick} />}
    </GoogleMap>
  );
}
