import React from "react";
import { useNavigate } from "react-router-dom";

function CheckoutConfirmation() {
  const navigate = useNavigate();

  const handleDone = () => {
    // Navigate to the order confirmation page (replace "/order-confirmation" with the actual URL of your order confirmation page)
    navigate("/order-confirmation");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        src="src\assets\paisa.jpg" // Add your confirmation image URL here
        alt="Confirmation"
        className="mb-8"
        style={{ maxWidth: "25%" }}
      />
      <p className="mb-4">
      Please ensure clarity by including your name and email address in the remarks section when making payment for your order.      </p>
      <button
        className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold"
        onClick={handleDone}
      >
        Done
      </button>
    </div>
  );
}

export default CheckoutConfirmation;
