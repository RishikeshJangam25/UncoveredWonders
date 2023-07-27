import Post from "./Post";
import "./post.css";
let nextId;
const Posts = ({ data, userName }) => {
  return (
    <section className="posts">
      {data.map((item) => {
        return <Post key={item.id} item={item} userName={userName}/>;
      })}
    </section>
  );
};

export default Posts;
