import React from "react";
import { Link } from "react-router-dom";

function OrderConfirmation() {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{
        backgroundImage: `url('src/assets/background.jpg')`, // Add your background image URL here
        backgroundSize: "cover",
      }}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg text-center"
        style={{ maxWidth: "80%" }}
      >
        <h2 className="text-3xl font-bold mb-4">Order Confirmation</h2>
        <p className="text-lg">
        Your order has been successfully processed. Expect a call at your provided phone number to confirm the delivery location. Please remain attentive, as we may contact you at any moment.
        </p>
        <p className="text-lg mt-2">
          Thankyou for buying from us!
        </p>
        <Link to="/home" className="text-blue-500 mt-4 underline">
        Let's Discover More!
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmation;
