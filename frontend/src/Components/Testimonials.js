import React from 'react';
import './Testimonials.css';
import { TestimonialData } from '../TestimonialData';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Testimonials() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };
  return (
    <div className='testimonial-containe'>
      <h2 style={{ textAlign: "center", color: "rgb(253, 122, 46)", textDecoration: "underline", fontSize: "2rem" }}>Testimonials</h2>
      <Slider {...settings}>
        {
          TestimonialData.map((test) => {
            return <div className='testimonialCard'>
              <h2 style={{marginBottom: "1rem"}}>{test.name}</h2>
              <p>{test.desc}</p>
            </div>
          })
        }
      </Slider>
    </div>
  );
}

export default Testimonials;