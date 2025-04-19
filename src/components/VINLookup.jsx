import React, { useState } from "react";

export default function VINLookup({ data }) {
  const [vinInput, setVinInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = () => {
    setError("");
    const filtered = data.filter((item) =>
      item["VIN (1-10)"]?.toLowerCase().includes(vinInput.toLowerCase())
    );

    if (filtered.length > 0) {
      setResult(filtered[0]);
    } else {
      setResult(null);
      setError("No EV found for that VIN prefix.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "rgb(23, 23, 23)",
        color: "#f1f1f1",
        padding: "2rem",
        borderRadius: "16px",
        margin: "2rem auto",
        maxWidth: "700px",
        border: "1px solid #2e2e3e",
        boxShadow: "0 0 20px rgba(0, 255, 150, 0.15)",
      }}
    >
      <h2
        style={{
          marginBottom: "1.5rem",
          fontSize: "1.8rem",
          fontWeight: "600",
          color: "rgb(255, 255, 255)",
          textAlign: "center",
        }}
      >
        🔍 VIN Lookup Tool
      </h2>
      <p
  style={{
    fontSize: "1rem",
    color: "#ccc",
    textAlign: "center",
    marginBottom: "1.5rem",
  }}
>
  Enter the first 10 characters of a VIN to retrieve detailed information about the electric vehicle.
</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Enter first 10 characters of VIN"
          value={vinInput}
          onChange={(e) => setVinInput(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            border: "1px solid #333",
            backgroundColor: "rgb(0, 0, 0)",
            color: "#e0e0e0",
            fontSize: "1rem",
          }}
        />

        <button
          onClick={handleSearch}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            border: "none",
            background: "linear-gradient(135deg, #00f5a0, #00d9f5)",
            color: "#0f0f0f",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "1rem",
            boxShadow: "0 0 10px rgba(0, 255, 200, 0.3)",
            transition: "transform 0.2s ease",
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          Search
        </button>
      </div>

      {error && (
        <p
          style={{
            color: "#fb7185",
            marginTop: "1.5rem",
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          {error}
        </p>
      )}

      {result && (
        <div
          style={{
            marginTop: "2rem",
            padding: "1.5rem",
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            lineHeight: "1.8",
          }}
        >
          <p>
            <strong>🔹 Make:</strong> {result.Make}
          </p>
          <p>
            <strong>🔹 Model:</strong> {result.Model}
          </p>
          <p>
            <strong>🔹 Year:</strong> {result["Model Year"]}
          </p>
          <p>
            <strong>🔹 County:</strong> {result.County}
          </p>
          <p>
            <strong>🔹 EV Type:</strong> {result["Electric Vehicle Type"]}
          </p>
          <p>
            <strong>🔹 Range:</strong> {result["Electric Range"]} miles
          </p>
          <p>
            <strong>🔹 MSRP:</strong> ${result["Base MSRP"]}
          </p>
          <p>
            <strong>🔹 CAFV Eligible:</strong>{" "}
            {result["Clean Alternative Fuel Vehicle (CAFV) Eligibility"]}
          </p>
        </div>
      )}
    </div>
  );
}
