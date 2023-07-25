import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <div className="container-fluid footer-property">
      <div className="container">
        <div className="p-3 m-2 text-left">
          <div className="row">
            <div className="col-5">
              <div>
                <h6>Visit India</h6>
                <p>
                  Visit India, Discover great holiday ideas for family holidays,
                  weekends away, short breaks and day out in India.
                </p>
                <h6>We appreciate your feedback</h6>
                <input
                  type="textarea"
                  placeholder="Write your thoughts here"
                  style={{ width: "100%", height: "8rem" }}
                />
                <br />
                <div className="mt-1">
                  <button className="btn btn-success">Send</button>
                </div>
              </div>
            </div>
            <div className="col-sm">
              <h6>Destination</h6>
              <div className="">
                <ul className="list">
                  <li>
                    {" "}
                    <FontAwesomeIcon icon={faAngleRight} size="sm" />{" "}
                    <a href="">Mumbai</a>
                  </li>
                  <li>
                    {" "}
                    <FontAwesomeIcon icon={faAngleRight} size="sm" />{" "}
                    <a href="">Pune</a>
                  </li>
                  <li>
                    {" "}
                    <FontAwesomeIcon icon={faAngleRight} size="sm" />{" "}
                    <a href="">Bengaluru</a>
                  </li>
                  <li>
                    {" "}
                    <FontAwesomeIcon icon={faAngleRight} size="sm" />{" "}
                    <a href="">Hyderabad</a>
                  </li>
                  <li>
                    {" "}
                    <FontAwesomeIcon icon={faAngleRight} size="sm" />{" "}
                    <a href="">Dehli</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm">
              <h6>Magazine’s</h6>
              <div>
                <ul className="list">
                  <li>
                    {" "}
                    <FontAwesomeIcon icon={faAngleRight} size="sm" />{" "}
                    <a href="">India like local</a>
                  </li>
                  <li>
                    {" "}
                    <FontAwesomeIcon icon={faAngleRight} size="sm" />{" "}
                    <a href="">Hidden Gems</a>
                  </li>
                  <li>
                    {" "}
                    <FontAwesomeIcon icon={faAngleRight} size="sm" />{" "}
                    <a href="">How to go to</a>
                  </li>
                  <li>
                    {" "}
                    <FontAwesomeIcon icon={faAngleRight} size="sm" />{" "}
                    <a href="">Food and flavor</a>
                  </li>
                  <li>
                    {" "}
                    <FontAwesomeIcon icon={faAngleRight} size="sm" />{" "}
                    <a href="">Attraction and Tours</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm">
              <h6>Link</h6>
              <div>
                <ul className="list">
                  <li>
                    {" "}
                    <FontAwesomeIcon icon={faAngleRight} size="sm" />{" "}
                    <a href="">About us</a>
                  </li>
                  <li>
                    {" "}
                    <FontAwesomeIcon icon={faAngleRight} size="sm" />{" "}
                    <a href="">Contact us</a>
                  </li>
                  <li>
                    {" "}
                    <FontAwesomeIcon icon={faAngleRight} size="sm" />{" "}
                    <a href="">Privacy policy</a>
                  </li>
                  <li>
                    {" "}
                    <FontAwesomeIcon icon={faAngleRight} size="sm" />{" "}
                    <a href="">Food and flavor</a>
                  </li>
                  <li>
                    {" "}
                    <FontAwesomeIcon icon={faAngleRight} size="sm" />{" "}
                    <a href="">Become a partner</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h6 className="text-center">
            Copyright &copy; 2023 NCS Pte Ltd. All Rights Reserved.
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Footer;
