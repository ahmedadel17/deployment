"use client";

import LocationPicker from "./map";
import { useState } from "react";

export default function LocationPage() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  return (
    <div>
      <h1>Select Location</h1>
      <LocationPicker
        onLocationSelect={(lat, lng) => {
          setLocation({ lat, lng });
        }}
      />
      {location && (
        <p>
          Selected Location: {location.lat}, {location.lng}
        </p>
      )}
    </div>
  );
}
