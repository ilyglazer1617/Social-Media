import "./chatOnline.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(
        "http://localhost:4000/api/users/friends/" + currentId
      );
      setFriends(res.data);
    };
    getFriends();
  }, [currentId]);
  console.log(friends);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const kendrick = "/kendrick.jfif";
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img className="chatOnlineImg" src={PF + kendrick} alt="" />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">kendrick lamar</span>
      </div>
    </div>
  );
};

export default ChatOnline;
