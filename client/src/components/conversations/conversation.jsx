import "./conversation.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const friendId = conversation.member.find((m) => m !== currentUser._id);
        const res = await axios.get("users?userId=" + friendId);
        setUser(res.data);
      } catch (error) {
        console.log(error.message + "hi");
      }
    };
    getUser();
  }, [currentUser, conversation]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const kendrick = "/kendrick.jfif";
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={user?.profilePicture ? PF + user.profilePicture : PF + kendrick}
        alt=""
      />
      {/* <img
        className="conversationImg"
        src={user.profilePicture ? PF + user.profilePicture : PF + kendrick}
        alt=""
      /> */}
      <span className="conversationName">
        {user && user.username ? user.username : "noname"}
      </span>
    </div>
  );
};

export default Conversation;
