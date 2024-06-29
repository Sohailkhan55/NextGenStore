import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const Spinner = ({path="login"}) => {  //path is a prop here and taken logic as default value
  const [count, setCount] = useState(3); //3 sec is initial spinning time
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);//1s
    count === 0 &&
      navigate(`/${path}`, { //track user's locn history from url
        state: location.pathname,
      });
    return () => clearInterval(interval); //terminate interval
  }, [count, navigate, location,path]);
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h1 className="Text-center">Redirecting to you in {count} second </h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;