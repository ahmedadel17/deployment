"use client";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    google: any;
  }
}

export default function LocationPicker() {
  const mapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);

  useEffect(() => {
    // Load Google Maps Script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.body.appendChild(script);
  }, []);

  const initMap = () => {
    const center = { lat: 30.0444, lng: 31.2357 }; // Cairo as default
    const google = window.google;

    // Create map
    const mapInstance = new google.maps.Map(mapRef.current, {
      center,
      zoom: 10,
    });
    setMap(mapInstance);

    // Create marker
    const markerInstance = new google.maps.Marker({
      position: center,
      map: mapInstance,
    });
    setMarker(markerInstance);

    // Setup autocomplete
    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: "eg" }, // restrict to Egypt
      fields: ["geometry", "formatted_address"],
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) return;

      const location = place.geometry.location;
      mapInstance.setCenter(location);
      mapInstance.setZoom(15);
      markerInstance.setPosition(location);
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search for a location..."
        className="border rounded-md p-2 w-full max-w-md"
      />
      <div ref={mapRef} className="w-full h-[500px] rounded-lg shadow" />
    </div>
  );
}
