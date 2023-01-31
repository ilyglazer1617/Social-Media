import { useRef } from "react";
import "./login.css";
import { loginCall } from "./../../serverCalls";
import { useContext } from "react";
import { AuthContext } from "./../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handelClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  console.log(user);
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
              placeholder="Email"
              type="email"
              className="loginInput"
              ref={email}
            />
            <input
              type="password"
              placeholder="password"
              required
              minLength={5}
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="success" size={"20px"} />
              ) : (
                "Login"
              )}
            </button>
            <span className="loginForgot">Forgot password?</span>
            <button
              onClick={() => navigate("/register")}
              className="loginRegisterButton"
            >
              {isFetching ? (
                <CircularProgress color="success" size={"20px"} />
              ) : (
                "Create A new user"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
