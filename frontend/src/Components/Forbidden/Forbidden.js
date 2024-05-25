import React from "react";

const Forbidden = () => {
  const containerStyle = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    textAlign: "center",
    overflow: "hidden",
  };

  const textStyle = {
    fontSize: "6rem",
    fontWeight: "bold",
    margin: 0,
    color: "#ff4c4c",
  };

  const messageStyle = {
    fontSize: "1.5rem",
    color: "#6c757d",
  };

  return (
    <div style={containerStyle}>
      <h1 style={textStyle}>403</h1>
      <p style={messageStyle}>You don't have access to this page</p>
    </div>
  );
};

export default Forbidden;
