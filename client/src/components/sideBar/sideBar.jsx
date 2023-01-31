import "./sideBar.css";
import HomeIcon from "@mui/icons-material/Home";
import SmsIcon from "@mui/icons-material/Sms";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import GroupsIcon from "@mui/icons-material/Groups";
import HelpIcon from "@mui/icons-material/Help";
import SurfingIcon from "@mui/icons-material/Surfing";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { Users } from "../../dummyData";
import CloseFriend from "./../closeFriend/closeFriend";
const SideBar = () => {
  return (
    <div className="sideBarWrap">
      {" "}
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <HomeIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <SmsIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <SlowMotionVideoIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <GroupsIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <HelpIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <SurfingIcon className="sidebarIcon" />
            <span className="sidebarListItemText"> Surf</span>
          </li>
          <li className="sidebarListItem">
            <SportsFootballIcon className="sidebarIcon" />
            <span className="sidebarListItemText">sports</span>
          </li>
          <li className="sidebarListItem">
            <FoodBankIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <DirectionsBusIcon className="sidebarIcon" />
            <span className="sidebarListItemText">way of arrival</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
