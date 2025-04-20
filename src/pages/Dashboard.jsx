// src/pages/Dashboard.jsx
import React, { useState } from "react";
import EVSummary from "../components/EVSummary";
import EVMakeChart from "../components/EVMakeChart";
import EVRangeHistogram from "../components/EVRangeHistogram";
import SplineEmbed from "../components/SplineEmbed";
import EVChoroplethMap from "../components/EVChoroplethMap";
import EVAdoptionTrends from "../components/EVAdoptionTrends";
import CAFVPieChart from "../components/CAFVPieChart";
import CAFVBarByMake from "../components/CAFVBarByMake";
import EVRangeProgressionChart from "../components/EVRangeProgressionChart";
import EVCostVsRange from "../components/EVCostVsRange"; 
import VINLookup from "../components/VINLookup";



export default function Dashboard({ data }) {
    const [filteredData] = useState(data);

    if (!filteredData || filteredData.length === 0) {
        return (
          <div style={styles.loaderContainer}>
            <div style={styles.spinner}></div>
            <p style={{ color: "#ccc", marginTop: "10px" }}>Loading data...</p>
          </div>
        );
      }
      

  return (
    <div>
        <div className="spline-wrapper">
        <SplineEmbed url="https://prod.spline.design/pqKmWCbW0z9HBsKs/scene.splinecode" />
        </div>
        
        <div>
        <VINLookup data={data} />
      <EVSummary data={data} />

      <h2 style={styles.sectionHeader}>Overview</h2>
      <p style={styles.description}>Discover the top 10 electric vehicle makes and how their electric ranges compare.
      Get insights into key EV metrics and emerging trends in adoption and performance.</p>
      <div className="charts-container">
        <EVMakeChart data={data} />
        <EVRangeHistogram data={filteredData} />
      </div>

      <div className="dashboard-container">
        <h2 style={styles.sectionHeader}>Geographical analysis of electric vehicle count</h2>
        <p style={styles.description}>This section explores the geographical distribution of electric vehicles across all 39 counties in Washington.
        Gain insights into regional adoption patterns, highlighting areas with the highest and lowest EV presence.</p>
        <EVChoroplethMap data={filteredData} />
      </div>


      <h2 style={styles.sectionHeader}>EV Adoption and Range Progression</h2>
      <p style={styles.description}>Get insights into how electric vehicle adoption is growing over time.
      Explore the evolving range capabilities of available EV models.</p>
      <div className="charts-container">
        <div className="chart-wrapper">
          <EVAdoptionTrends data={filteredData} />
        </div>
        <div className="chart-wrapper">
          <EVRangeProgressionChart data={filteredData} />
        </div>
      </div>

      <h2 style={styles.sectionHeader}>CAFV Eligibility Analysis</h2>
      <p style={styles.description}>An in-depth analysis of Clean Alternative Fuel Vehicle (CAFV) eligibility trends.
      Understand how eligibility varies across EV makes and adoption patterns.</p>
      <div className="charts-container">
        <div className="chart-wrapper">
          <CAFVPieChart data={filteredData} />
        </div>
        <div className="chart-wrapper">
          <CAFVBarByMake data={filteredData} />
        </div>
      </div>

      <h2 style={styles.sectionHeader}>Market Analysis</h2>
      <p style={styles.description}> This chart shows the relationship between an EV’s cost (Base MSRP) and its electric range.<br />
      The bubble size represents the popularity of each model, helping compare affordability, efficiency, and adoption.</p>
      <EVCostVsRange data={filteredData} />
      
    </div>
       
    </div>
  );
  
}
const styles = {
    sectionHeader: {
        fontSize: "40px",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: "140px",
        marginBottom: "30px",
        textTransform: "uppercase",
        background: "linear-gradient(90deg,rgb(0, 255, 208),rgb(203, 200, 255))",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        borderBottom: "3px solid rgb(47, 47, 47)", // underline color here
  paddingBottom: "5px", // space between text and underline
      },
      
    description: {
        fontSize: "20px",
        color: "#ccc",
        textAlign: "center",
        marginBottom: "140px",
      },
      loaderContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      },
      spinner: {
        border: "4px solid #333",
        borderTop: "4px solid #00C49F", // you can pick any color
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        animation: "spin 1s linear infinite",
      },
  };
  