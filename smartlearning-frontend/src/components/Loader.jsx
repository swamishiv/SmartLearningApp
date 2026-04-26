import React from "react";

const Loader = () => {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.3)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999
    }}>
      <div style={{ color: "#fff", fontSize: "20px" }}>
        ⏳ Loading...
      </div>
    </div>
  );
};

export default Loader;