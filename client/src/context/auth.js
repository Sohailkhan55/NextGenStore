import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext(); //create context and store it in a avariable
const AuthProvider = ({ children }) => { //we can access it from anywhere
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  //default axios
  axios.defaults.headers.common["Authorization"] = auth?.token; //by default every request will have headers

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data); //convert to json from string
      setAuth({ //set global state
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
    //eslint-disable-next-line
    //to disable dependency
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook which is an arrow fn
const useAuth = () => useContext(AuthContext); //now we can use this useAuth in any component

export { useAuth, AuthProvider };