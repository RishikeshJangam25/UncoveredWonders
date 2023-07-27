import React, { createContext, useContext, useState } from "react";
import jwt from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    // localStorage.getItem("isLoggedIn") === null
    //   ? false
    //   : JSON.parse(localStorage.getItem("isLoggedIn"))
    localStorage.getItem('token') 
    //=== null ? false : JSON.parse(localStorage.getItem('token'))
  );

  const [isSignup, setSignup] = useState(false);

  const [userData, setUserData] = useState(localStorage.getItem('email'));

  const login = async(loginData) => {
    // Perform login logic and set isLoggedIn to true

    await fetch("https://localhost:7168/api/User/Login", {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(loginData)
    })
    .then(res => {
      return res.json()
    })
    .then(res => {

      console.log('login ', res.accessToken, res);
      
      const decodedToken = jwt(res.accessToken)
      
      // setUserData(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"])

      console.log('decodedToken ', userData, decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]);

      const email = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]

      localStorage.setItem('email', email)
      
      if(res.statusCode === 200) {
        localStorage.setItem('token', res.accessToken);
        setIsLoggedIn(true);
        // localStorage.setItem("isLoggedIn", "true");
      }
    })

  };

  const logout = () => {
    // Perform logout logic and set isLoggedIn to false
    localStorage.clear();
    setIsLoggedIn(false);
  };

  const signup = async(registerData) => {
    
    await fetch("https://localhost:7168/api/User/Register", {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(registerData)
    })
    .then(res => {
      return res.json()
    })
    .then(res => {
      console.log('register ', registerData, res);
    })

    setSignup(true);

  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, isSignup, signup, userData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthProvider;
