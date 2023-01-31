import "./rightBar.css";
import PublicIcon from "@mui/icons-material/Public";
import AddIcon from "@mui/icons-material/Add";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import { Users } from "../../dummyData";
import Onlline from "./../online/onlline";
import { useEffect } from "react";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../../context/AuthContext";

const RightBar = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );

  useEffect(() => {
    const getFriend = async () => {
      try {
        const friendsList = await axios.get(
          "http://localhost:4000/api/users/friends/" + user._id
        );
        setFriends(friendsList.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriend();
  }, [user]);

  //! follow or unfollow function
  const handelClick = async () => {
    try {
      if (followed) {
        await axios.put(
          "http://localhost:4000/api/users/" + user._id + "/unfollow",
          { userId: currentUser._id }
        );
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(
          "http://localhost:4000/api/users/" + user._id + "/follow",
          { userId: currentUser._id }
        );
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (error) {
      console.log(error.message);
    }
    setFollowed(!followed);
  };

  const messi = "messi.jfif";
  const tomBrady = "tom_brady.png";
  const elon = "elonelon.jfif";
  const kite = "kitePic.jpg";
  const footvolly_sunset = "footvolly_sunset.jpg";

  const HomeRightBar = () => {
    return (
      <>
        <div className="aroundYouConteiner">
          <PublicIcon className="earthImg" color="success" />
          <span className="eatrhText">
            <b>Ily </b>
            <b>and </b>
            <b>3 other Friends </b>are Around you, <b>connect Them!!!</b>
          </span>
        </div>
        <img className="rightAdd" src={`${PF}${footvolly_sunset}`} alt="" />
        <h4 className="rightBarTitle">Onine Friends</h4>
        <ul className="rightBarFreindList">
          {Users.map((u) => (
            <Onlline key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };
  const ProfileRightBar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button
            className="rightBarFollowButton"
            onClick={() => handelClick()}
          >
            {followed ? "Unfollow" : "Follow"}
            {followed ? <PersonRemoveAlt1Icon /> : <AddIcon />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <div className="rightbarFollowing">
              <img
                src={
                  friend.profilePicture
                    ? PF + friend.profilePicture
                    : `${PF}${tomBrady}`
                }
                alt=""
                className="rightbarFollowingImg"
                onClick={() => {
                  navigate("/profile/" + friend.username);
                }}
              />
              <span className="rightbarFollowingName">
                {friend.username ? friend.username : `noname`}
              </span>
            </div>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightBar">
      <div className="rightWrap">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
};

export default RightBar;
