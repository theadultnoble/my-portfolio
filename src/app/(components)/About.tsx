import React from "react";

function About() {
  return (
    <div className="flex flex-col gap-8">
      <p className="text-2xl font-medium">Who am I?</p>
      <p className="text-[#727270] text-sm">
        My name is Noble Okafor. I am a technical writer and software developer
        with extensive experience in both fields. My expertise covers a wide
        range of programming languages and development tools, primarily focusing
        on web and mobile app development. I am interested in building
        performant software solutions and writing about how to do so. I believe
        in documenting knowledge not just for others but also for my future
        self. My goal when writing is to simplify the complexities behind
        software engineering topics in an engaging and comprehensive. I am a
        dedicated learner and always strive to familiarise myself with the
        latest tools and technologies to improve my skills as a developer and,
        in turn, make me a better writer.
      </p>
      <div className="flex gap-2 text-xs font-medium bg-[#DBDAD6] p-2 rounded-3xl items-center">
        <p className="hover:text-[#FFFFFF] hover:bg-[#464644] p-2 rounded-3xl cursor-pointer">For Anyone</p>
        <p className="hover:text-[#FFFFFF] hover:bg-[#464644] p-2 rounded-3xl cursor-pointer">Technical Writers</p>
        <p className="hover:text-[#FFFFFF] hover:bg-[#464644] p-2 rounded-3xl cursor-pointer">Software Developers</p>
      </div>
    </div>
  );
}

export default About;
