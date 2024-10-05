import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./feature.scss";

const Feature = () => {
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Enable infinite scrolling
    speed: 500, // Animation speed in milliseconds
    slidesToShow: 3, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at a time
    autoplay: true, // Enable automatic scrolling
    autoplaySpeed: 2000, // Autoplay speed in milliseconds
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  return (
    <div className='guideContainer' >
       <div className="title-container">
            <div className="underline"></div>

                <h2>Expert Guides to Finding Your Perfect Fit</h2>
            </div>
     
      <Slider {...settings}>
        <div className="guide">
          <div className="property">
            <img src="./img/home.png" alt="" />
            <h3>Buy Properties</h3>
            <p>
              Discover the perfect property that reflects your unique style and needs. Transform it into your personal haven, filled with cherished memories and the joy of building equity.
            </p>
            <button>Learn More</button>
          </div>
        </div>
        <div className="guide">
          <div className="property">
            <img src="./img/coin.png" alt="" />
            <h3>Sell Properties</h3>
            <p>
              Our expertise ensures you get the true value your property deserves. Sell your property seamlessly and efficiently, opening a new chapter with peace of mind and financial security.
            </p>
            <button>Learn More</button>
          </div>
        </div>
        <div className="guide">
          <div className="property">
            <img src="./img/percentage.png" alt="" />
            <h3>Rent Properties</h3>
            <p>
              Our expertise ensures you get the true value your property deserves. Rent your property seamlessly and efficiently, opening a new chapter with peace of mind and financial security.
            </p>
            <button>Learn More</button>
          </div>
        </div>
        <div className="guide">
          <div className="property">
            <img src="./img/building.png" alt="" />
            <h3>Luxurious Fittings</h3>
            <p>
              Our expertise ensures you get the true value your property deserves. Sell your property seamlessly and efficiently, opening a new chapter with peace of mind and financial security.
            </p>
            <button>Learn More</button>
          </div>
        </div>
        <div className="guide">
          <div className="property">
            <img src="./img/camera.png" alt="" />
            <h3>Non Stop Security</h3>
            <p>
              Our expertise ensures you get the true value your property deserves. Sell your property seamlessly and efficiently, opening a new chapter with peace of mind and financial security.
            </p>
            <button>Learn More</button>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Feature;
