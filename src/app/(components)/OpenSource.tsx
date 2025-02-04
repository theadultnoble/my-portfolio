"use client";

import React from "react";
import Image from "next/image";
import data from "@/data/opensource.json";
import { MoveRightIcon } from "lucide-react";
import { MoveLeftIcon } from "lucide-react";
import OpenZepellin from "@/public/assets/OpenZeppellin.png";

const OpenSource = () => {
  const [display, setDisplay] = React.useState(1);
  const displayData = data.filter((item) => item.id === display);

  const toggleDisplay = () => {
    setDisplay((prevState) => (prevState === 1 ? 2 : 1));
  };

  return (
    <div className=" h-28 overflow-y-scroll mt-3">
      {display === 1 && (
        <Image
          src={OpenZepellin}
          alt="openzepelin"
          className="w-9/12 rounded-lg h-16"
        />
      )}
      <div className="flex items-center gap-2">
        {display === 2 && (
          <div
            className="p-2 rounded-full bg-gray-300 self-start mt-4"
            onClick={toggleDisplay}
          >
            <MoveLeftIcon size={12} className="text-[#000000]" />
          </div>
        )}
        <div>
          {displayData.map((item) => (
            <div key={item.id}>
              <h2 className="text-2xl my-3">{item.name}</h2>
              <p className="text-sm/7">{item.description}</p>
            </div>
          ))}
        </div>
        {display === 1 && (
          <div
            className="p-2 rounded-full bg-gray-300 self-start mt-4"
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
