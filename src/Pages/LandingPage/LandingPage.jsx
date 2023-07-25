import React from "react";
import "./LandingPage.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

import Sliders from "../../Components/Slider/Sliders";
import PostContainer from "../../Components/Container/PostContainer";
import { Outlet } from "react-router-dom";

function LandingPage() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
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
    <div className="container-fluid p-0">
      <div className="bg-img">
        <Navbar />
        <div className="page-header">
          <h1>
            {" "}
            <strong>Explore India like a local</strong>
          </h1>
          <h6>
            From iconic attraction to amazing experience, your journey begins
            here
          </h6>
          <input
            className="input-field"
            type="text"
            placeholder="Where you want to go"
          ></input>
        </div>
      </div>
      <Sliders />

      {/*  */}

      <div className="">
        <div>
          <PostContainer />
        </div>
      </div>

      {/* 
      
      */}
      <Footer />
      <Outlet />
    </div>
  );
}

export default LandingPage;
