import React from "react";

import { useState, useEffect } from "react";

const MyMarker = ({ text, tooltip, $hover }) => {
    const [points, setpoints] = useState("");
  const handleClick = () => {
    console.log(`You clicked on ${tooltip}`);
  };

  return (
    <div className={$hover ? "marker hover" : "marker"} onClick={handleClick}>
      <span className="circleText" title={tooltip}>
      {text}  
      </span>
      
    </div>
  );
};

export default MyMarker;
