import "./chatOnline.css";
const ChatOnline = () => {
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
