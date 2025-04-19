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
        <div style={styles.footer}>
  <p style={styles.footerText}>© 2025. All Rights Reserved.</p>
</div>

      </>
    ) : (
      <div style={styles.loaderContainer}>
        <div style={styles.spinner}></div>
        <p style={{ color: "#ccc", marginTop: "10px" }}>Loading data...</p>
      </div>
    )}
    
  </div>
  
  
  );
}
const styles = {
  loaderContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
  spinner: {
    border: "4px solid #333",
    borderTop: "4px solid #00C49F", // You can change this color
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite",
  },
  footer: {
    height: "180px", // Adjust height as needed
    backgroundColor: "rgb(35, 35, 35)", // Footer background color
    display: "flex",
    alignItems: "center", // Vertically center the text
    justifyContent: "center", // Horizontally center the text
    color: "#fff",
    width: "100%", 
    marginTop: "20px", // Optional: Space above the footer
    position: "absolute",
    // bottom: 0, // Stick it to the bottom of the screen
    left: 0, // Ensure it starts at the left edge of the screen
  },
  footerText: {
    fontSize: "20px",
    textAlign: "center",
  },
};

export default App;
