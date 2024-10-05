import React, { useState } from 'react';
import "./slider.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const Slider = ({ images }) => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? images.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === images.length - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  return (
    <div className='slider'>
      {open && (
        <div className="fullslider">
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="close"
            onClick={() => setOpen(false)}
          />
          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            className="arrow"
            onClick={() => handleMove("l")}
          />
          <div className="sliderWrapper">
            <img src={images[slideNumber]} alt="" className="sliderImg" />
          </div>
          <FontAwesomeIcon
            icon={faCircleArrowRight}
            className="arrow"
            onClick={() => handleMove("r")}
          />
        </div>
      )}
      <div className="bigImage" onClick={() => setOpen(true)}>
        <img src={images[0]} alt='' />
      </div>
      <div className="smallImages">
        {images.slice(1).map((image, index) => (
          <img src={image} alt='' key={index + 1} />
        ))}
      </div>
    </div>
  );
}

export default Slider;
