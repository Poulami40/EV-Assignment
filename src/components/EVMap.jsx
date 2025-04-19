// src/components/EVMap.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

export default function EVMap({ data }) {
  return (
    <div className="map-container">
      <h2>EV Locations</h2>
      <MapContainer
        center={[47.610365, -122.30839]} // Default location, adjust based on your data
        zoom={10}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {data.map((ev) => {
          const coords = ev["Vehicle Location"].replace("POINT (", "").replace(")", "").split(" ");
          const lat = parseFloat(coords[1]);
          const lon = parseFloat(coords[0]);

          return (
            <Marker key={ev["VIN (1-10)"]} position={[lat, lon]}>
              <Popup>{ev.Make} {ev.Model}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
