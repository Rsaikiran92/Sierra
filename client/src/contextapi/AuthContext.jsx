import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const nav = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(()=>{
    logout()
  },[])

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });
      const loggedInUser = response.data; 
      setUser(loggedInUser);
      localStorage.setItem("authToken", loggedInUser.token); 
      console.log("Login successful");
      nav("/")
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await axios.post("http://localhost:8080/register", {
        name,
        email,
        password,
      });
      const newUser = response.data;
      alert("Signup successful");
      nav("/login");
      console.log("Signup successful");
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
    }
  };

  const logout = () => {
    setUser(null);
    nav("/login")
    localStorage.removeItem("authToken"); 
    alert("Logout successful");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
