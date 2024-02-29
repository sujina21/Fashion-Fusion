import React from "react";
import Card from "./Card";

const Men: React.FC = () => {
  const product = {
    id: 1,
    title: "Shirt",
    description: "men's shirt",
    price: 4500,
    image: "https://thefoomer.in/cdn/shop/products/jpeg-optimizer_PATP5270.jpg?v=1680164001&width=1200",
    style: {
      backgroundColor: "white",
      border: "1px solid black",
      padding: "10px",
      borderRadius: "5px",
    },
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://previews.123rf.com/images/kasto/kasto1609/kasto160900185/62701564-sporty-active-man-looking-in-distance-enjoying-beauty-of-nature-freedom-and-life-at-beautiful.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#000",
        fontSize: "24px",
        position: "relative",
      }}
    >
      {product ? (
        <div style={{ position: "absolute", top: "20px", left: "20px" }}>
          <Card data={product} />
        </div>
        
      ) : (
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h1>This is the men's page.</h1>
          <p>No items added yet.</p>
        </div>
      )}
    </div>
  );
};

export default Men;
