import React, { useState, useEffect } from 'react';
import './Carousel.css'; 

const Carousel = ({ images }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 4000); 
    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <div className="carousel">
      <div className="carousel-inner">
        {images.map((image, i) => (
          <div key={i} className={i === index ? 'carousel-item active' : 'carousel-item'}>
            <img src={image} alt={`Image ${i + 1}`} />
          </div>
        ))}
      </div>
      <a className="carousel-control-prev" onClick={prevSlide} role="button" tabIndex="0">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only"></span>
      </a>
      <a className="carousel-control-next" onClick={nextSlide} role="button" tabIndex="0">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only"></span>
      </a>
    </div>
  );
};

export default Carousel;
