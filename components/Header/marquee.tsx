import React from 'react'

function Marquee() {
  return (
    <div className="marquee-container overflow-hidden bg-primary-500 py-2">
      <div className="marquee-content">
        <div className="marquee-text">
          <span className="text-white hover:text-primary-200 mx-4 transition-colors duration-300 ease-in-out">Free Shipping on Orders Over $50</span>
          <span className="text-white hover:text-primary-200 mx-4 transition-colors duration-300 ease-in-out">30-Day Return Policy</span>
          <span className="text-white hover:text-primary-200 mx-4 transition-colors duration-300 ease-in-out">24/7 Customer Support</span>
          <span className="text-white hover:text-primary-200 mx-4 transition-colors duration-300 ease-in-out">New Collection Available Now</span>
          <span className="text-white hover:text-primary-200 mx-4 transition-colors duration-300 ease-in-out">Subscribe for 10% Off</span>
          <span className="text-white hover:text-primary-200 mx-4 transition-colors duration-300 ease-in-out">Limited Time Offer</span>
        </div>
        <div className="marquee-text" aria-hidden="true">
          <span className="text-white hover:text-primary-200 mx-4 transition-colors duration-300 ease-in-out">Free Shipping on Orders Over $50</span>
          <span className="text-white hover:text-primary-200 mx-4 transition-colors duration-300 ease-in-out">30-Day Return Policy</span>
          <span className="text-white hover:text-primary-200 mx-4 transition-colors duration-300 ease-in-out">24/7 Customer Support</span>
          <span className="text-white hover:text-primary-200 mx-4 transition-colors duration-300 ease-in-out">New Collection Available Now</span>
          <span className="text-white hover:text-primary-200 mx-4 transition-colors duration-300 ease-in-out">Subscribe for 10% Off</span>
          <span className="text-white hover:text-primary-200 mx-4 transition-colors duration-300 ease-in-out">Limited Time Offer</span>
        </div>
      </div>
    </div>
  )
}

export default Marquee
