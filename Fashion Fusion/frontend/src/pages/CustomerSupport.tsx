import React from 'react';

function CustomerSupport() {
  return (
    <div>
      <h1 style={{ fontWeight: 'bold', marginBottom: '5px', fontSize: '28px' }}>About us</h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: '1' }}>
          <p style={{ marginTop: '5px', fontSize: '20px', textIndent: '80px' }}>
            Welcome to Fashion Fusion, your go-to destination for trendy and stylish clothing for men and women. Our carefully curated collection features a wide range of apparel, from casual essentials to chic statement pieces, designed to help you express your individuality with confidence.
            <br />
            For men, we offer a diverse selection of on-trend pieces, including classic shirts, comfortable jeans, sleek jackets, and sophisticated suits. Ladies, explore our women's collection for flattering dresses, fashionable tops, stylish skirts, and more, perfect for every occasion.
            <br />
            But Fashion Fusion is more than just a clothing store; it's a community of fashion enthusiasts sharing their passion for style. Dive into our blog for insightful articles, fashion tips, and trend forecasts to keep you inspired and ahead of the curve.
            <br />
            With a user-friendly website, secure payment options, and reliable customer support, shopping at Fashion Fusion is convenient and enjoyable. Join us in redefining fashion and expressing your personal style with flair at Fashion Fusion!
          </p>
        </div>
        <div style={{ flex: '1', textAlign: 'center' }}>
          <img 
            src="https://i.pinimg.com/736x/fe/45/a9/fe45a9c51f067a26b9035be75dcca96a.jpg" // Replace with your image URL
            alt="Description of your web" 
            style={{ width: '100%', height: 'auto' }} // Adjust the style here
          />
        </div>
      </div>
      
      <h1 style={{ fontWeight: 'bold', marginTop: '20px', marginBottom: '5px', fontSize: '28px' }}>Customer Support</h1>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        <img 
          src="https://img.freepik.com/free-vector/instagram-icon_1057-2227.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1708732800&semt=ais" 
          alt="Instagram" 
          style={{ width: '2em', height: '2em', marginRight: '0.5em' }} // Adjust the style here
        />
        <a 
          href="https://www.instagram.com/thebeautyaesthetics_/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', color: 'inherit', fontSize: '20px' }} // Style for link
        >
          Instagram
        </a>
      </div>
      <p style={{ textIndent: '80px' }}>Contact us at +977 9860343359 for assistance.</p>
    </div>
  );
}

export default CustomerSupport;
