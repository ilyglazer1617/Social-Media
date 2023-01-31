import "./register.css";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handelClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("passwords dont match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        const res = await axios.post(
          "http://localhost:4000/api/auth/register",
          user
        );
        navigate("/login");
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  return (
    <div className="login">
      <div className="loginWrap">
        <div className="loginleft">
          <h3 className="loginLogo">Talk to travel</h3>
          <span className="loginDesc">
            Travel Connect and Recomend from all over
          </span>
        </div>
        <div className="loginRight">
          <form className="logInBox" onSubmit={(e) => handelClick(e)}>
            <input
              required
              placeholder="Username"
              className="loginInput"
              ref={username}
            />
            <input
              required
              placeholder="Email"
              className="loginInput"
              ref={email}
              type="email"
            />
            <input
              required
              placeholder="password"
              className="loginInput"
              type="password"
              ref={password}
              minLength="5"
            />
            <input
              required
              type="password"
              placeholder="password again "
              className="loginInput"
              ref={passwordAgain}
            />
            <button type="submit" className="loginButton">
              Sign Up
            </button>
            {/* <button className="loginRegisterButton">Log into account</button> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
