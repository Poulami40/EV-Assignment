// src/App.js
import { useEffect, useState } from "react";
import { loadCSV } from "./utils/loadData";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const [evData, setEvData] = useState([]);

  useEffect(() => {
    const cachedData = localStorage.getItem("evData");

    if (cachedData) {
      // Load from localStorage if available
      setEvData(JSON.parse(cachedData));
    } else {
      // Otherwise, fetch and cache it
      loadCSV("/ev_data.csv")
        .then((data) => {
          const cleaned = data.filter(row => row['VIN (1-10)']); // Remove empty rows
          setEvData(cleaned);
          localStorage.setItem("evData", JSON.stringify(cleaned)); // Cache it
        })
        .catch((err) => {
          console.error("CSV loading error:", err);
        });
    }
  }, []);

  return (
    <div className="container">
    <h1 style={{ fontSize: "60px" }}>DASHBOARD</h1>
    <p
        style={{
          marginTop: "30px",
          fontSize: "20px",
          color: "#ccc",
          textAlign: "center",
          maxWidth: "1100px",
          marginLeft: "auto",
          marginRight: "auto",
          lineHeight: "1.6",
        }}
      >
        This interactive dashboard offers a comprehensive overview of electric vehicle adoption trends across various counties and model years. 
        Explore detailed statistics, vehicle types, and electric range progressions to gain insights into the growing impact and distribution of EV technology 
        across the region. 
      </p>
    {evData.length > 0 ? (
      <>
        <Dashboard data={evData} />
       
      </>
    ) : (
      <p>Loading data...</p>
    )}
  </div>
  
  
  );
}

export default App;
