import React, { useEffect, useState } from "react";

import Header from "./components/Header";

import Body from "./components/Body";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/message")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div>


      
      <Header/>

      <Body/>

    
    </div>
  );
}

export default App;
