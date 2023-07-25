import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import Icon from "../Icons/Icon";
import { AiOutlineClose } from "react-icons/ai";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";
import { FaCommentDots } from "react-icons/fa";
import { useRef, useState } from "react";

const CardDetail = ({ show, close, card }) => {
  const [showInput, setShowInput] = useState(false);
  const commentRef = useRef(null);

  const handleClick = () => {
    commentRef.current.focus();
  };

  return (
    <Modal
      show={show}
      onHide={close}
      centered={true}
      className="card_detail_modal"
    >
      <div className="card p-0 border-0 w-100">
        <div className="row g-0 ">
          <div className="col-md-6 ">
            <img
              src={card.image}
              alt={card.place}
              className="img-fluid rounded h-100 w-100"
            />
          </div>
          <div className="col-md-6 mb-2">
            <div className="card-title d-flex justify-content-between align-items-center mb-0 p-2">
              <h5>{card.place}</h5>
              <Link variant="danger" onClick={close}>
                <Icon className="close_icon">
                  <AiOutlineClose />
                </Icon>
              </Link>
            </div>

            {/* Comments */}

            {card.comments.map((com) => {
              return (
                <div
                  key={com.id}
                  className="card-body d-flex justify-content-start align-items-center p-1"
                >
                  <img
                    src="http://localhost:5173/src/assets/Images/user.jpg"
                    style={{
                      width: "25px",
                      height: "25px",
                      borderRadius: "50%",
                      marginRight: "10px",
                      objectFit: "fill",
                    }}
                  />
                  <div>
                    <span className="">{com.name}</span>
                    <p className="m-0 p-0">{com.comment}</p>
                  </div>
                </div>
              );
            })}

            <hr />

            <div className="card_icons m-2">
              <div className="left_icons">
                <div>
                  <Icon>
                    <BiSolidLike className="left_icon" />
                  </Icon>
                  <small>{card.likes}</small>
                </div>

                <div>
                  <Icon>
                    <BiSolidDislike className="right_icon" />
                  </Icon>
                  <small>{card.dislikes}</small>
                </div>
              </div>

              <div className="left_icons">
                <Icon className="right_icon">
                  <CiBookmark />
                </Icon>
                <Icon>
                  <FaCommentDots className="right_icon" onClick={handleClick} />
                </Icon>
              </div>
            </div>

            <hr />

            <div className="add_comment">
              <Icon>
                <FaCommentDots />
              </Icon>
              <input
                className="comment_input"
                placeholder="Add Comments"
                ref={commentRef}
              />
              <div>
                <Link className="post_btn btn btn-success">Post</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CardDetail;
