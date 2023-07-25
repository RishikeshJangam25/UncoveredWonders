import "./Card.css";
import { Card, Button, Modal } from "react-bootstrap";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";
import { FaCommentDots } from "react-icons/fa";
import Icon from "../Icons/Icon";
import CardDetail from "./CardDetail";
import { useState } from "react";

const SingleCard = ({ card }) => {
  const [showDetail, setShowDetail] = useState(false);

  const openDetail = () => setShowDetail(true);

  const closeDetail = () => setShowDetail(false);
  return (
    <>
      <Card style={{ width: "100%", heigth: "298px", padding: "0" }}>
        <Card.Img
          variant="top"
          src={card.image}
          alt={card.place}
          className="rounded"
        />
        <Card.Body style={{ padding: "10px" }}>
          <Card.Title>{card.place}</Card.Title>
          <Card.Text>{card.placeInfo}</Card.Text>
          <div className="card_icons">
            <div className="left_icons">
              <div>
                <Icon>
                  <BiSolidLike className="left_icon" />
                </Icon>
                <small>{card.likes}</small>
              </div>
              <div>
                <Icon>
                  <BiSolidDislike className="left_icon" />
                </Icon>
                <small>{card.dislikes}</small>
              </div>
            </div>

            <div className="left_icons">
              <Icon className="right_icon">
                <CiBookmark />
              </Icon>
              <Icon>
                <FaCommentDots className="right_icon" onClick={openDetail} />
              </Icon>
            </div>
          </div>
          <div className="text-center mt-2">
            <button className="btn btn-outline-success" onClick={openDetail}>
              Read More
            </button>
          </div>
        </Card.Body>
      </Card>
      {showDetail && (
        <CardDetail show={showDetail} close={closeDetail} card={card} />
      )}
    </>
  );
};

export default SingleCard;
