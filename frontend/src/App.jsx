import React, { useEffect, useState } from "react";

import Header from "./components/Header";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Routes, Route , Link } from 'react-router-dom';

import Body from "./components/Body";
import Home from "./components/Home";



function App() {
  // const [data, setData] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/message")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  return (



    <div>
    






      <Header />

      <Routes>
        <Route path="/login"  element= {<Login />} />
        <Route path="/home"  element= {<Body />} />
        <Route path="/signup"  element= {<Signup />} />

      </Routes>



      {/* <Body /> */}


   


    </div>


  );
}

export default App;
