// src/components/EVChoroplethMap.jsx
import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./EVChoroplethMap.css"; // Custom styles for legend, etc.

export default function EVChoroplethMap({ data }) {
  const [countyGeoJSON, setCountyGeoJSON] = useState(null);
  const [countyCounts, setCountyCounts] = useState({});
  const geoJsonRef = useRef();
  const mapRef = useRef(); // 1. Create a map ref


  // Load GeoJSON
  useEffect(() => {
    fetch("/geo/wa-counties.geojson")
      .then((res) => res.json())
      .then((geo) => {
        setCountyGeoJSON(geo);
  
        // 3. Fit bounds to the counties
        if (mapRef.current) {
          const geoLayer = L.geoJSON(geo);
          mapRef.current.fitBounds(geoLayer.getBounds());
        }
      })
      .catch((err) => console.error("Failed to load GeoJSON:", err));
  }, []);
  
  // Count EVs per county
  useEffect(() => {
    const counts = {};
    data.forEach((ev) => {
      const county = ev.County?.toUpperCase().replace(" COUNTY", "").trim();
      if (county) counts[county] = (counts[county] || 0) + 1;
    });
    setCountyCounts(counts);
  }, [data]);

  // Color scale
  const getColor = (d) => {
    return d > 1000 ? "rgb(255, 0, 0)" :
           d > 500  ? "rgb(255, 69, 69)" :
           d > 200  ? "rgb(253, 125, 125)" :
           d > 100  ? "rgb(255, 165, 165)" :
           d > 50   ? "rgb(255, 107, 38)" :
           d > 10   ? "rgb(255, 234, 1)" :
           d > 0    ? "rgb(255, 157, 0)" :
                      " #f7fcfd";
  };

  const onEachFeature = (feature, layer) => {
    const geoCounty = feature.properties.coty_name?.[0]?.toUpperCase().trim();
    const count = countyCounts[geoCounty] || 0;

    layer.setStyle({
      fillColor: getColor(count),
      fillOpacity: 0.6,
      weight: 1,
      color: "#333",
    });

    layer.bindPopup(`<strong>${geoCounty}</strong><br/>EV Count: ${count}`);
  };

  // Add legend using a custom component
  const Legend = () => {
    const map = useMap();

    useEffect(() => {
      const legend = L.control({ position: "bottomright" });

      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        const grades = [0, 10, 50, 100, 200, 500, 1000];
      
        div.style.backgroundColor = "white";
        div.style.padding = "10px";
        div.style.borderRadius = "8px";
        div.style.color = "black"; // 👈 sets text color
      
        div.innerHTML += `<h4 style="color: black;">EV Count</h4>`;
        for (let i = 0; i < grades.length; i++) {
          div.innerHTML +=
            `<i style="background:${getColor(grades[i] + 1)}; width: 18px; height: 18px; display: inline-block; margin-right: 8px;"></i>` +
            `${grades[i]}${grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+"}`;
        }
        return div;
      };
      

      legend.addTo(map);
      return () => {
        legend.remove();
      };
    }, [map]);

    return null;
  };

  return (
    <div style={{
      height: "600px",
      width: "100%",
      marginTop: "2rem",
      borderRadius: "12px",
      overflow: "hidden",
      backgroundColor: "#1c1c1e",
      marginBottom:"50px"
    }}>
     <MapContainer
  center={[47.5, -120.5]}
  zoom={7}
  dragging={false}
  boxZoom={false}
  keyboard={false}
  scrollWheelZoom={false}
  doubleClickZoom={false}
  touchZoom={false}
  zoomControl={false} // Optional: hides the "+" and "−" buttons
  minZoom={7}
  maxZoom={7} // 🔒 Lock zoom level
  maxBounds={[[45.5, -125], [49, -115]]}
  maxBoundsViscosity={1.0}
  whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
  style={{ height: "100%", width: "100%" }}
  className="leaflet-container"
>

        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {countyGeoJSON && (
          <GeoJSON
            ref={geoJsonRef}
            data={countyGeoJSON}
            onEachFeature={onEachFeature}
          />
        )}
        <Legend />
      </MapContainer>
    </div>
  );
}
