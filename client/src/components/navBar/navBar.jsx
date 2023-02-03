import "./navBar.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BadgeUnstyled from "@mui/base/BadgeUnstyled";
import { useNavigate } from "react-router-dom";

import { Badge } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "./../../context/AuthContext";

const NavBar = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();
  const tomBrady = "/tom_brady.png";

  return (
    <div className="navBarConteiner">
      <div className="navBarLeft">
        <span className="logo" onClick={() => navigate("/")}>
          talk to travel
        </span>
      </div>

      <div className="navBarCenter">
        <div className="serchBar">
          <SearchIcon className="searchIcon" />
          <input placeholder="Serch For Cool spots" className="searchInput" />
        </div>
      </div>
      <div className="navBarRight">
        {" "}
        <div className="topbarLinks">
          <span className="topbarLink" onClick={() => navigate("/")}>
            Homepage
          </span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Badge badgeContent={1} showZero color="success">
              <PersonIcon />{" "}
            </Badge>
          </div>
          <div className="topbarIconItem">
            <Badge badgeContent={1} showZero color="success">
              <MarkUnreadChatAltIcon onClick={() => navigate("/messenger")} />{" "}
            </Badge>
          </div>
          <div className="topbarIconItem">
            <Badge badgeContent={1} showZero color="success">
              <NotificationsIcon />
            </Badge>
          </div>
        </div>
        <img
          src={
            user && user.profilePicture
              ? PF + user.profilePicture
              : PF + tomBrady
          }
          alt=""
          className="topbarImg"
          onClick={() => navigate(`/profile/${user.username}`)}
        />
      </div>
    </div>
  );
};

export default NavBar;
