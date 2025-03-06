"use client";

import React from "react";
import Image from "next/image";
import data from "@/data/opensource.json";
import { MoveRightIcon } from "lucide-react";
import { MoveLeftIcon } from "lucide-react";
import OpenZepellin from "/public/assets/OpenZeppellin.png";
import Dacade from "/public/assets/dacade_og.png"

const OpenSource = () => {
  const [display, setDisplay] = React.useState(1);
  const displayData = data.filter((item) => item.id === display);

  const toggleDisplay = () => {
    setDisplay((prevState) => (prevState === 1 ? 2 : 1));
  };

  return (
    <div className=" h-28 overflow-y-scroll scrollbar-none mt-3">
      {display === 1 && (
        <Image
          src={OpenZepellin}
          alt="openzepelin"
          className="w-11/12 rounded-lg h-11 border border-[#DBDAD6]"
        />
      )}
      {display === 2 && (
        <Image
          src={Dacade}
          alt="dacade"
          className="w-11/12 rounded-lg h-11 border border-[#DBDAD6]"
        />
      )}
      <div className="flex">
        {display === 2 && (
          <div
            className="p-2 rounded-full bg-[#E9E8E6] shrink-0 self-start mr-3 mt-4 border border-[#DBDAD6]"
            onClick={toggleDisplay}
          >
            <MoveLeftIcon size={12} className="text-[#000000]" />
          </div>
        )}
        <div className="flex-1">
          {displayData.map((item) => (
            <div key={item.id}>
              <h2 className="text-lg mt-3 mb-1 text-black">{item.name}</h2>
              <p className="text-sm/5 tracking-tighter flex-1">{item.description}</p>
            </div>
          ))}
        </div>
        {display === 1 && (
          <div
            className="p-2 rounded-full bg-[#E9E8E6] shrink-0 self-start mt-4 border border-[#DBDAD6]"
            onClick={toggleDisplay}
          >
            <MoveRightIcon size={12} className="text-[#000000]" />
          </div>
        )}
      </div>
    </div>
  );
};

export default OpenSource;
