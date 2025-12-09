import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5232/api/auth";

const initialState = {
  user: null,
  isAuthenticated: false,
  isInitialized: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
      };

    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load user from localStorage ONCE
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      dispatch({
        type: "INIT",
        payload: { user: JSON.parse(savedUser), isAuthenticated: true },
      });
    } else {
      dispatch({
        type: "INIT",
        payload: { user: null, isAuthenticated: false },
      });
    }
  }, []);

  // LOGIN FUNCTION
  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/login`, { email, password });

    const user = { email };

    localStorage.setItem("user", JSON.stringify(user));

    dispatch({
      type: "LOGIN",
      payload: { user },
    });

    return true;
  };

  // REGISTER FUNCTION (NO auto-login)
  const register = async (email, username, password) => {
    await axios.post(`${API_URL}/signup`, { email, username, password });
    return true;
  };

  // LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

