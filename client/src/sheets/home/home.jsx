import "./home.css";
import SideBar from "../../components/sideBar/sideBar";
import Feed from "./../../components/feed/feed";
import RightBar from "./../../components/rightBar/rightBar";
import NavBar from "../../components/navBar/navBar";
const Home = () => {
  return (
    <div>
      <NavBar />
      <div className="homeWrap">
        <SideBar />
        <Feed />
        <RightBar />
      </div>
    </div>
  );
};

export default Home;
