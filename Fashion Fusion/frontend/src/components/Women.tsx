import React from "react";

function Women() {
  return (
    <div
      style={{
        backgroundImage: `url("https://watermark.lovepik.com/photo/20211203/large/lovepik-girl-looking-into-the-distance-picture_501459577.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top', // Move the background image to center top
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#000', // Set text color to black
        fontSize: '24px', // Increase font size
      }}
    >
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '20px', borderRadius: '10px' }}>
        <h1>This is the Women's page.</h1>
        <p>No items added yet.</p>
      </div>
    </div>
  );
}

export default Women;
