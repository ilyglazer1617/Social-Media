import "./shere.css";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CancelIcon from "@mui/icons-material/Cancel";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "./../../context/AuthContext";
import axios from "axios";
const Shere = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const tomBrady = "/tom_brady.png";
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      postBy: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      // const fileName = Date.now() + file.name; //! to give the file a unique name
      const fileName = file.name; //! to give the file a unique name
      data.append("file", file);
      data.append("name", fileName);
      newPost.img = fileName;
      try {
        await axios.post("http://localhost:4000/api/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await axios.post("http://localhost:4000/api/posts", newPost);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="shere">
      <div className="shereWrap">
        <div className="shereTop">
          <img
            src={user.profilePicture ? PF + user.profilePicture : PF + tomBrady}
            className="shareProfileImg"
            alt=""
          />
          <input
            placeholder={"Shere with your connection " + user.username + " ?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgConteiner">
            <img src={URL.createObjectURL(file)} className="shareImg" alt="" />{" "}
            <CancelIcon
              className="shareCancelImg"
              onClick={() => setFile(null)}
            />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PhotoCameraBackIcon htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                type="file"
                id="file"
                accept=".png,.jpeg,jpg"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </label>
            <div className="shareOption">
              <BookmarkIcon htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <AddLocationAltIcon htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
          </div>
          <button className="shareButton">Share</button>
        </form>
      </div>
    </div>
  );
};

export default Shere;
