import Card from "react-bootstrap/Card";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { FaCommentDots } from "react-icons/fa";
import Icon from "../Icons/Icon";
import { useEffect, useState } from "react";
import CardDetail from "../Card/CardDetail";

const Post = ({ item, handlePost, userName }) => {
  const [showDetail, setShowDetail] = useState(false);

  const openDetail = () => setShowDetail(true);

  const closeDetail = () => setShowDetail(false);

  const [isFavourite, setIsFavourite] = useState(false);

  // const card = {
  //   id: 1,
  //   place: "Mysore Palace",
  //   placeInfo: "some text",
  //   image: "Mysore_Palace",
  //   likes: 102,
  //   dislikes: 20,
  //   comments: [
  //     { id: 1, name: "Nizamuddin", comment: "nice place to visit" },
  //     { id: 2, name: "Nizamuddin", comment: "beutiful title" },
  //     { id: 3, name: "Nizamuddin", comment: "boring waste of time" },
  //     { id: 4, name: "Nizamuddin", comment: "boring waste of time" },
  //     { id: 5, name: "Nizamuddin", comment: "boring waste of time" },
  //   ],
  // };

  const handleFavourite = async () => {
    const post = {
      userID: item.userId,
      postID: item.id,
      postTypeID: 0,
      isFavourite: isFavourite,
      createdBy: userName,
      updatedBy: "string",
    };
    try {
      await fetch("https://localhost:7168/api/Post/MarkPostByFavourite", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      }).then((res) => {
        console.log(isFavourite);
        console.log("favres ", res);
        setIsFavourite(!isFavourite);
      });
    } catch (error) {
      console.log("error ", error);
    }
  };

  return (
    <>
      <Card
        style={{
          // background: " #1c1c1c",
          background: "#E5E4E2",
          color: "black",
          padding: "0",
          width: "650px",
          height: "635px",
          borderRadius: "2.5%",
        }}
      >
        <div className="user_profile">
          <img
            className="user_image"
            src="http://localhost:5173/src/assets/images/user.jpg"
            alt="user"
          />
          <strong className="ms-2">
            {userName ? userName : item.userName}
          </strong>
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
              {isFavourite ? (
                <>
                  <Icon className="comment_icon">
                    <GoBookmark onClick={handleFavourite} />
                  </Icon>
                  {/* <div onClick={handleFavourite}>Save</div> */}
                </>
              ) : (
                <>
                  <Icon className="comment_icon">
                    <GoBookmarkFill onClick={handleFavourite} />
                  </Icon>
                  {/* <div onClick={handleFavourite}>Remove</div> */}
                </>
              )}
            </div>

            <div>
              <Icon className="comment_icon">
                <FaCommentDots className="right_icon" onClick={openDetail} />
              </Icon>
              <div>{item?.comments?.length}</div>
            </div>
          </div>
        </div>
      </Card>
      {showDetail && (
        <CardDetail show={showDetail} close={closeDetail} card={item} />
      )}
    </>
  );
};

export default Post;
