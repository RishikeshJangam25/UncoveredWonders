import Post from "./Post";
import "./post.css";
let nextId;
const Posts = ({ data }) => {
  return (
    <section className="posts">
      {data.map((item) => {
        return <Post key={item.id} item={item} />;
      })}
    </section>
  );
};

export default Posts;
