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

    if (!filteredData || filteredData.length === 0) return <p>Loading data...</p>;

  return (
    <div>
        <div className="spline-wrapper">
        <SplineEmbed url="https://prod.spline.design/pqKmWCbW0z9HBsKs/scene.splinecode" />
        </div>
        
        <div>
      <EVSummary data={data} />

      <h2 style={styles.sectionHeader}>Overview</h2>
      <p style={styles.description}>A quick summary of key electric vehicle metrics and trends.</p>
      <div className="charts-container">
        <EVMakeChart data={data} />
        <EVRangeHistogram data={filteredData} />
      </div>

      <div className="dashboard-container">
        <h1>Geographical analysis of electric vehicle count</h1>
        <p style={styles.description}>This section explores the geographical distribution of electric vehicles.</p>
        <EVChoroplethMap data={filteredData} />
      </div>


      <h2 style={styles.sectionHeader}>EV Adoption and Range Progression</h2>
      <p style={styles.description}>Insights into how EV adoption is growing and the range of available EVs.</p>
      <div className="charts-container">
        <div className="chart-wrapper">
          <EVAdoptionTrends data={filteredData} />
        </div>
        <div className="chart-wrapper">
          <EVRangeProgressionChart data={filteredData} />
        </div>
      </div>

      <h2 style={styles.sectionHeader}>CAFV Eligibility Analysis</h2>
      <p style={styles.description}>An analysis of Clean Alternative Fuel Vehicle (CAFV) eligibility trends.</p>
      <div className="charts-container">
        <div className="chart-wrapper">
          <CAFVPieChart data={filteredData} />
        </div>
        <div className="chart-wrapper">
          <CAFVBarByMake data={filteredData} />
        </div>
      </div>

      <h2 style={styles.sectionHeader}>Market Analysis</h2>
      <p style={styles.description}>Evaluating the market for electric vehicles based on cost and other factors.</p>
      <EVCostVsRange data={filteredData} />
      <VINLookup data={data} />
    </div>
       
    </div>
  );
  
}
const styles = {
    sectionHeader: {
      fontSize: "36px",
      fontWeight: "bold",
      color: "#e5e5e5",
      textAlign: "center",
      marginTop: "80px",
      marginBottom: "20px",
    },
    description: {
        fontSize: "20px",
        color: "#ccc",
        textAlign: "center",
        marginBottom: "80px",
      }
  };
  