import Post from "./Post";
import "./post.css";

const Posts = ({ data, userName }) => {

  console.log('posts ', data);

  return (
    <section className="posts">
      {data.map((item) => {
        return <Post key={item.id} item={item} userName={userName}/>;
      })}
    </section>
  );
};

export default Posts;
