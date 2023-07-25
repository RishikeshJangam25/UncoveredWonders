import React from "react";
import Slider from "react-slick";
import "./Sliders.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapPin,
  faPersonWalking,
  faGem,
  faPizzaSlice,
  faBook,
  faBuildingColumns,
} from "@fortawesome/free-solid-svg-icons";

function Sliders() {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: false,
    speed: 1000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="container slider-area">
      <div className="p-2 text-center">
        <Slider {...settings}>
          <div>
            <a href="">
              <h6>
                <FontAwesomeIcon icon={faPersonWalking} size="sm" /> &nbsp;How
                to go to
              </h6>
            </a>
          </div>
          <div>
            <a href="">
              <h6>
                <FontAwesomeIcon icon={faBuildingColumns} size="sm" /> &nbsp;Art
                and Culture
              </h6>
            </a>
          </div>
          <div>
            <a href="">
              <h6>
                <FontAwesomeIcon icon={faBook} size="sm" /> &nbsp;History and
                Tradition
              </h6>
            </a>
          </div>
          <div>
            <a href="">
              {" "}
              <h6>
                {" "}
                <FontAwesomeIcon icon={faGem} size="sm" /> &nbsp;Hidden Gems
              </h6>
            </a>
          </div>
          <div>
            <a href="">
              {" "}
              <h6>
                {" "}
                <FontAwesomeIcon icon={faMapPin} size="sm" /> &nbsp;Best Places
                visit in India
              </h6>
            </a>
          </div>
          <div>
            <a href="">
              <h6>
                <FontAwesomeIcon icon={faPizzaSlice} size="sm" /> &nbsp;Food and
                Flavours
              </h6>
            </a>
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default Sliders;
