import React, { useState } from "react";

export default function Filters({ data, setFilteredData }) {
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const applyFilters = () => {
    let filtered = [...data];
  
    if (selectedCounty) {
      filtered = filtered.filter((ev) => ev.County === selectedCounty);
    }
    if (selectedYear) {
      filtered = filtered.filter((ev) => ev["Model Year"] === selectedYear);
    }
    if (selectedType) {
      filtered = filtered.filter((ev) => ev["Electric Vehicle Type"] === selectedType);
    }
  
    if (filtered.length === 0) {
      // Reset to main page (all data)
      setFilteredData(data);
  
      // Show popup
      alert("No results found. Showing all data again.");
    } else {
      setFilteredData(filtered);
    }
  };
  

  const counties = [...new Set(data.map((ev) => ev.County))];
  const years = [...new Set(data.map((ev) => ev["Model Year"]))];
  const types = [...new Set(data.map((ev) => ev["Electric Vehicle Type"]))];

  const selectStyle = {
    backgroundColor: "#1f1f1f",
    color: "#ffffff",
    border: "1px solid #333",
    borderRadius: "8px",
    padding: "10px 12px",
    marginRight: "10px",
    fontSize: "0.95rem",
    outline: "none",
  };

  const buttonStyle = {
    backgroundColor: "#4F46E5",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "12px",
    backgroundColor: "#121212",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "30px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
  };

  return (
    <div style={containerStyle}>
      <select
        onChange={(e) => setSelectedCounty(e.target.value)}
        value={selectedCounty}
        style={selectStyle}
      >
        <option value="">Select County</option>
        {counties.map((county) => (
          <option key={county} value={county}>
            {county}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => setSelectedYear(e.target.value)}
        value={selectedYear}
        style={selectStyle}
      >
        <option value="">Select Year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => setSelectedType(e.target.value)}
        value={selectedType}
        style={selectStyle}
      >
        <option value="">Select EV Type</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <button
        onClick={applyFilters}
        style={buttonStyle}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#4338ca")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#4F46E5")}
      >
        Apply Filters
      </button>
    </div>
  );
}
