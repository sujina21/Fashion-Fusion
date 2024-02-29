import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import backgroundImage from "../assets/clean interior.jpg"; // Import the image file

function AdminPanel() {
  return (
    <>
      <Navigation />
      <div
        style={{
          backgroundImage: `url($"/src/assets/clean interior.jpg")`, // Set the background image
          backgroundSize: 'cover', // Cover the entire container
          backgroundPosition: 'center', // Center the background image
          minHeight: '100vh', // Set minimum height to full viewport height
          display: 'flex', // Use flexbox for layout
          flexDirection: 'column', // Stack elements vertically
          justifyContent: 'flex-start', // Align items at the top
          alignItems: 'center', // Center items horizontally
          paddingTop: '20px', // Add padding at the top for spacing
        }}
      >
        <div className='flex gap-6 items-center'>
          <button className='underline text-2xl font-bold'>
            <Link to='/admin/add-to-cart'>Create Product</Link>
          </button>
          <button className='underline text-2xl font-bold'>
            <Link to='/admin/products'>All Products</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminPanel;
