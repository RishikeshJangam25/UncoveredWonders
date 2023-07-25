import React, { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [color, setColor] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  const changeColor = () => {
    if (window.scrollY >= 90) {
      setColor(true);
    } else {
      setColor(false);
    }
  };
  const showMenu = () => {
    setExpanded(!isExpanded);
  };
  window.addEventListener("scroll", changeColor);
  return (
    <nav
      className={
        color
          ? "navbar navbar-expand-sm fixed-top navbar-light navbar-bg"
          : "navbar navbar-expand-sm fixed-top navbar-light"
      }
    >
      <button
        className="navbar-toggler navbar-toggler-right"
        onClick={() => showMenu()}
        type="button"
        data-toggle="collapse"
        data-target="#navbar1"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <h2 className="text-white">Uncovered Wonders</h2>
      <div
        className={
          isExpanded
            ? "navbar-collapse menu"
            : "collapse navbar-collapse hideMenu"
        }
        id="navbar1"
      >
        <ul className="navbar-nav ml-auto ">
          <li className="nav-item">
            <a className="nav-link text-white line-custome" href="#">
              Destinations
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">
              How to go
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">
              Magazine
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">
              Search
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
