import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

axios.defaults.withCredentials = true;

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );
  const [userData, setUserData] = useState(
    () => JSON.parse(localStorage.getItem("userData")) || null
  );

  const getUserData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/user/data`);
      const data = res.data;
      if (data.success) {
        setUserData(data.userData);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUserData(null);
      toast.error(error?.response?.data?.message || "Error fetching user data.");
    }
  };

  const getAuthState = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/auth/is-auth`);
      const data = res.data;
      if (data.success) {
        setIsLoggedIn(true);
        await getUserData();
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUserData(null);
      toast.error(error?.response?.data?.message || "Auth check failed.");
    }
  };

  // Run once on mount
  useEffect(() => {
    getAuthState();
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
