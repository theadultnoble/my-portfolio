"use client"
import React from "react";

function About() {
  
  const[toggle, setToggle] = React.useState(false);
  const [displayText, setDisplayText] = React.useState("");

  const handleText = () => {
    setDisplayText("hello");
  }

  const handleText2 = () => {
    setDisplayText("world");
  }

  return (
    <div className="flex flex-col gap-8">
      <p className="text-2xl font-medium">Who am I?</p>
      <p className="text-[#727270] text-sm">
        {displayText}
      </p>
      <div className="flex gap-2 text-xs font-medium bg-[#DBDAD6] p-2 rounded-3xl items-center">
        <p className="hover:text-[#FFFFFF] hover:bg-[#464644] p-2 rounded-3xl cursor-pointer" onClick={handleText}>Technical Writers</p>
        <p className="hover:text-[#FFFFFF] hover:bg-[#464644] p-2 rounded-3xl cursor-pointer" onClick={handleText2}>Software Developers</p>
      </div>
    </div>
  );
}

export default About;
