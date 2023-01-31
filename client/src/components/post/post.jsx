import "./post.css";
import ListIcon from "@mui/icons-material/List";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../../context/AuthContext";

const Post = ({ post }) => {
  const navigate = useNavigate();
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const barney = "/How-I-Met-Your-Mother.png";

  // set the likes
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);
  //get user
  const fetchUser = async () => {
    const res = await axios.get(`/users?userId=${post.userId}`);
    setUser(res.data);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handelLike = () => {
    try {
      axios.put("http://localhost:4000/api/posts/" + post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (error) {
      console.log(error.message);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWraper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "avatarDef.jfif"
              }
              alt=""
              onClick={() => navigate(`profile/${post.postBy?.username}`)}
            />
            <span className="postUsername">{post.postBy?.username}</span>
            <span className="postDate"> {format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <ListIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img
            className="postImg"
            src={post.img ? PF + post.img : PF + barney}
            alt=""
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <ThumbUpIcon
              className="likeIcon"
              color="primary"
              onClick={handelLike}
            />
            <FavoriteIcon
              className="likeIcon"
              color="secondary"
              onClick={handelLike}
            />
            <span className="postLikeCounter"> {like} pepole like</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText"> {post.comment} comment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
