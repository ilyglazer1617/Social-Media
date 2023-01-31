import "./profile.css";
import SideBar from "../../../components/sideBar/sideBar";
import Feed from "../../../components/feed/feed";
import RightBar from "../../../components/rightBar/rightBar";
import NavBar from "../../../components/navBar/navBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, []);

  const messi = "messi.jfif";
  const argentina = "argentina_win.jfif";
  return (
    <div>
      <NavBar />
      <div className="profile">
        <SideBar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture ? PF + user.coverPicture : PF + argentina
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture ? PF + user.profilePicture : PF + messi
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
              {/* <span className="profileInfoDesc">{user.desc}</span> */}
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />

            <RightBar user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
