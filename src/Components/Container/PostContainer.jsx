import React, { useState } from "react";

import MediaCard from "../Card/MediaCard";
import Login from "../../Pages/Login/Login";
import { useAuth } from "../../context/AuthContext";
import useModel from "../../context/ModelContext";
import Signup from "../../Pages/Signup/Signup";
import CardList from "../Card/CardList";

import { indiaVisits } from "../../assets/Data/indiaVisits";
import { Locals } from "../../assets/Data/localPlaces";
import { mediaData } from "../../assets/Data/mediaData";
import { useNavigate } from "react-router-dom";

const PostContainer = () => {
  const [media, setMedia] = useState(mediaData);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { openModel } = useModel();

  const exploreMore = () => {
    if (isLoggedIn) {
      navigate("/explore");
    } else {
      openModel();
    }
  };

  return (
    // -------------------------------Best Visit to india ----------------------------------------
    <div className="container-fluid">
      <div className="container">
        <div className="p-2">
          <div className="d-flex justify-content-between mb-3">
            <h3 className="me-auto">BEST VISIT TO INDIA</h3>

            <button onClick={exploreMore} className="btn btn-outline-success ">
              Posts
            </button>
          </div>

          {/* slider */}
          <CardList cards={indiaVisits} />
        </div>

        {/* models */}

        <Login />
        <Signup />

        {/* --------------INDIA LIKE A LOCAL----------------------------------- */}
        <div className="p-2">
          <div className="d-flex justify-content-between mb-3">
            <h3>INDIA LIKE A LOCAL</h3>
            <button className="btn btn-outline-success" onClick={exploreMore}>
              Posts
            </button>
          </div>

          {/* slider */}
          <CardList cards={Locals} />
        </div>

        {/* ---------------Some videos---------------------------------------------- */}
        <div className="p-2">
          <div className="d-flex justify-content-between mb-3">
            <h3>Some videos</h3>
            <button className="btn btn-outline-success">Explore more</button>
          </div>

          <div className="card-deck">
            {media.map((item) => (
              <MediaCard key={item.id} item={item} />
            ))}
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default PostContainer;
