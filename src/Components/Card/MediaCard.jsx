import { Link } from "react-router-dom";

const MediaCard = ({ item }) => {
  return (
    <div className="card p-0">
      <video
        src={item.video_link}
        muted
        autoPlay
        loop
        className="ratio ratio-4x3"
      ></video>
      <div className="card-body">
        <h6 className="card-title">{item.title}</h6>
        <p className="card-text">{item.description}</p>
        <Link className="btn btn-primary">Go somewhere</Link>
      </div>
    </div>
  );
};

export default MediaCard;
