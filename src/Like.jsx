import React, { useState } from 'react';

const Like = () => {
  const [likes, setLikes] = useState(0);
  const [likeStatus, setLikeStatus] = useState(false);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    if (likeStatus) {
      setLikes(likes - 1);
      setLikeStatus(false);
    } else {
      setLikes(likes + 1);
      setLikeStatus(true);
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    const commentText = e.target.elements.comment.value;
    if (commentText) {
      const newComment = {
        id: comments.length + 1,
        text: commentText,
      };
      setComments([newComment, ...comments]); // Add new comment at the beginning
      e.target.reset();
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const recentComment = comments.length > 0 ? comments[0] : null;

  return (
    <div className="container mt-4">
      <h2>Post Title</h2>
      <p>Likes: {likes}</p>
      <button className={`btn ${likeStatus ? 'btn-success' : 'btn-primary'}`} onClick={handleLike}>
      </button>{likeStatus ? 'Dislike' : 'Like'}

      <div className="mt-4">
        {recentComment && (
          <div className="card mb-3">
            <div className="card-body">
              <h3>Recent Comment</h3>
              <p>{recentComment.text}</p>
            </div>
          </div>
        )}
        <button className="btn btn-secondary mb-2" onClick={toggleComments}>
          {showComments ? 'Hide Comments' : 'Show Comments'}
        </button>
        {showComments && (
          <>
            <h3>All Comments</h3>
            <ul className="list-group">
              {comments.slice(1).map((comment) => (
                <li className="list-group-item" key={comment.id}>
                  {comment.text}
                </li>
              ))}
            </ul>
            <form className="mt-4" onSubmit={handleComment}>
              <div className="form-group">
                <input type="text" name="comment" className="form-control" placeholder="Write a comment" />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Like;