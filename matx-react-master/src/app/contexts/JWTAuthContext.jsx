import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5232/api/auth";

// --------------------
// INITIAL STATE
// --------------------
const initialState = {
  user: null,
  isAuthenticated: false,
  isInitialized: false,
};

// --------------------
// REDUCER
// --------------------
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

// --------------------
// CONTEXT
// --------------------
const AuthContext = createContext();

// --------------------
// PROVIDER
// --------------------
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // --------------------
  // INIT (load from localStorage)
  // --------------------
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      dispatch({
        type: "INIT",
        payload: {
          user: JSON.parse(savedUser),
          isAuthenticated: true,
        },
      });
    } else {
      dispatch({
        type: "INIT",
        payload: {
          user: null,
          isAuthenticated: false,
        },
      });
    }
  }, []);

  // --------------------
  // LOGIN
  // --------------------
  const login = async (email, password) => {
    try {
      await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      const user = { email };
      localStorage.setItem("user", JSON.stringify(user));

      dispatch({
        type: "LOGIN",
        payload: { user },
      });

      return true;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(error.response?.data || "Login failed");
      return false;
    }
  };

  // --------------------
  // REGISTER
  // --------------------
  const register = async (username, email, password) => {
    try {
      await axios.post(`${API_URL}/signup`, {
        username,
        email,
        password,
      });
      return true;
    } catch (error) {
      console.error("Register error:", error.response?.data || error.message);
      alert(error.response?.data || "Registration failed");
      return false;
    }
  };

  // --------------------
  // LOGOUT
  // --------------------
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  // --------------------
  // PROVIDER VALUE
  // --------------------
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

