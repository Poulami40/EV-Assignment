// src/components/SplineEmbed.jsx
import React, { useEffect, useRef } from "react";

const SplineEmbed = ({ url }) => {
  const viewerRef = useRef(null);

  useEffect(() => {
    if (viewerRef.current && url) {
      viewerRef.current.setAttribute("url", url);
    }
  }, [url]);

  return (
    <div
    style={{
      position: "relative",
      left: 0,
      top: 0,
      width: "100vw",
      height: "100vh",
      margin: 0,
      padding: 0,
      overflow: "hidden",
      boxSizing: "border-box",
      marginLeft: "-180px",
        marginBottom: "-140px",
        zIndex: -1,
    }}
  >
    <spline-viewer
      ref={viewerRef}
      url="https://prod.spline.design/pqKmWCbW0z9HBsKs/scene.splinecode"
      style={{
        width: "100vw",   // Ensure full viewport width
        height: "60vh",  // Ensure full viewport height
        display: "block",
        border: "none",
        transform: "scale(1.3)"
      }}
    ></spline-viewer>
  </div>
  

  );
};

export default SplineEmbed;
