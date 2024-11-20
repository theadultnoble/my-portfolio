"use client";
import React from "react";
import { motion } from "framer-motion";

function About() {
  const [displayText, setDisplayText] = React.useState("hello");

  const handleText = () => {
    setDisplayText("hello");
  };

  const handleText2 = () => {
    setDisplayText("world");
  };

  return (
    <div className="flex flex-col gap-8">
      <p className="text-2xl font-medium">Who am I?</p>
      {displayText === "hello" ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="sm:text-sm 2xl:text-lg"
        >
          My name is Noble Okafor. I am a technical writer and software
          developer with extensive experience in both fields. My expertise
          covers a wide range of programming languages and development tools,
          primarily focusing on web and mobile app development. I am interested
          in building performant software solutions and writing about how to do
          so. I believe in documenting knowledge not just for others but also
          for my future self. My goal when writing is to simplify the
          complexities behind software engineering topics in an engaging and
          comprehensive. I am a dedicated learner and always strive to
          familiarise myself with the latest tools and technologies to improve
          my skills as a developer and, in turn, make me a better writer.
        </motion.p>
      ) : displayText === "world" ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque,
          recusandae ipsum tempora sequi exercitationem veniam consequuntur.
          Deleniti, reprehenderit qui. Doloribus pariatur asperiores aliquam
          illo fugit molestiae unde atque consectetur fuga!
        </motion.p>
      ) : (
        ""
      )}
      <div className="flex gap-2 text-xs font-medium bg-[#DBDAD6] p-2 pr-8 rounded-3xl items-center w-fit">
        <p
          className="hover:text-[#FFFFFF] hover:bg-[#464644] p-2 rounded-3xl cursor-pointer"
          onClick={handleText}
        >
          Technical Writers
        </p>
        <p
          className="hover:text-[#FFFFFF] hover:bg-[#464644] p-2 rounded-3xl cursor-pointer"
          onClick={handleText2}
        >
          Software Developers
        </p>
      </div>
    </div>
  );
}

export default About;
