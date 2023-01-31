import "./online.css";
const Onlline = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div>
      <li className="rightBarFreind">
        <div className="rightBarProfileImgWrap">
          <img
            className="rightBarProfileImg"
            src={PF + user.profilePicture}
            alt=""
          />
          <span className="rightBarOnline"></span>
        </div>
        <span className="rightBarUsername">{user.username}</span>
      </li>
    </div>
  );
};

export default Onlline;
