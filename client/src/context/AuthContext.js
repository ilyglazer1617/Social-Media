import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  // user: {
  //   profilePicture: "",
  //   coverPicture: "",
  //   followers: [],
  //   followings: [],
  //   isAdmin: false,
  //   _id: "63d68148cdec023f304e392d",
  //   username: "farkash",
  //   email: "rockandRoll@gmail.com",
  //   password: "$2b$10$pG9KFgaZoqoQSwgbpdNbvOZVXzG2w5zpj1uBPG5aOv2aG/GKCIsX2",
  //   createdAt: "2023-01-29T14:23:04.511Z",
  //   updatedAt: "2023-01-29T14:33:29.178Z",
  //   __v: 0,
  // },
  user: localStorage.getItem("name") || null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
