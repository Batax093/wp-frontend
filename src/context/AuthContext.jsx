/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000; // Current time in seconds
    return decoded.exp < now;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    const token = localStorage.getItem("AdminToken");
    if (token && !isTokenExpired(token)) {
      const decoded = jwtDecode(token);
      return { name: decoded.name, email: decoded.email };
    }
    return null;
  });

  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("AdminToken");
    return storedToken && !isTokenExpired(storedToken) ? storedToken : null;
  });

  const login = (newToken) => {
    const decoded = jwtDecode(newToken);
    setToken(newToken);
    setAuthUser({ name: decoded.name, email: decoded.email });
    localStorage.setItem("AdminToken", newToken);
  };

  const logout = () => {
    setToken(null);
    setAuthUser(null);
    localStorage.removeItem("AdminToken");
  };

  useEffect(() => {
    const checkTokenValidity = () => {
      const token = localStorage.getItem("AdminToken");
      if (token && isTokenExpired(token)) {
        logout();
      }
    };

    checkTokenValidity();
    const interval = setInterval(checkTokenValidity, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
