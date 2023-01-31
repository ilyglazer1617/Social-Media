import Shere from "../shere/shere";
import "./feed.css";
import Post from "./../post/post";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./../../context/AuthContext";
const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("/posts/timeLine/" + user._id);
      setPosts(res.data);
      console.log(username);
      console.log(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);
  return (
    <div className="feedWrap">
      <div className="insidefeedWrap">
        {(!username || username === user.username) && <Shere />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
