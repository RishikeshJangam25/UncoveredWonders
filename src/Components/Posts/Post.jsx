import Card from "react-bootstrap/Card";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";
import { FaCommentDots } from "react-icons/fa";
import Icon from "../Icons/Icon";

const Post = ({ item, handlePost, userName }) => {
  return (
    <Card
      style={{
        // background: " #1c1c1c",
        background: "#E5E4E2",
        color: "black",
        padding: "0",
        width: "650px",
        height: "635px",
        borderRadius: "2.5%"
      }}
    >
      <div className="user_profile">
        <img
          className="user_image"
          src="http://localhost:5173/src/assets/images/user.jpg"
          alt="user"
        />
        <strong className="ms-2">{userName ? userName : item.userName}</strong>
      </div>
      <Card.Img
        // src={item.images[0]}
        src={item.images}
        // src="http://localhost:5173/src/assets/images/user.jpg"
        style={{ width: "100%", height: "65%", objectFit: "cover" }}
        alt="postImage"
      />

      <Card.Body>
        <Card.Title>{item?.title} </Card.Title>
        <Card.Text>{item?.description}</Card.Text>
      </Card.Body>
      <div className="card_footer">
        <div className="footer_left">
          <div>
            <Icon className="like_icon">
              <BiSolidLike />
            </Icon>
            <div>{item?.likes}</div>
          </div>
          <div>
            <Icon className="like_icon">
              <BiSolidDislike />
            </Icon>
            <div>{item?.dislikes}</div>
          </div>
        </div>
        <div className="footer_right">
          <div>
            <Icon className="comment_icon">
              <CiBookmark />
            </Icon>
            <div>Save</div>
          </div>

          <div>
            <Icon className="comment_icon">
              <FaCommentDots />
            </Icon>
            <div>{item?.comments?.length}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Post;
