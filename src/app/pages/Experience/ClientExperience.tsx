"use client";
import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";
import { format } from "date-fns";
import Link from "next/link";

// Define proper types for Sanity image
interface SanityImageAsset {
  _ref: string;
  _type: "reference";
}

interface SanityImage {
  _type: "image";
  asset: SanityImageAsset;
}

// Define the Experience data structure
interface ExperienceEvent {
  _id: string;
  title: string;
  image: SanityImage;
  startDate: string;
  endDate?: string;
  body: string | { children: { text: string }[] }[];
  slug?: {
    current: string;
  };
}

// Define the Skills data structure
interface Skill {
  _id: string;
  title: string;
}

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImage) {
  return builder.image(source);
}

interface ClientExperienceProps {
  events: ExperienceEvent[];
  skills: Skill[];
}

function ClientExperience({ events, skills }: ClientExperienceProps) {
  return (
    <div className="relative overflow-y-auto scrollbar-hide border-2 w-screen h-[100vh]">
      {/* <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
        <Physics debug interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
          <Band />
        </Physics>
      </Canvas> */}
      <div className="flex flex-col p-10 pb-[45vh] max-w-[1200px] mx-auto">
        {/* Back Button */}
        <Link href="/">
          <div className="items-center gap-2 mb-6 fixed z-0 top-10">
            <button className="flex items-center gap-1 px-4 py-2 bg-[#E9E8E6] rounded-full border border-[#DBDAD6] text-sm text-[#464644]">
              <Icon
                icon="material-symbols-light:arrow-back-rounded"
                style={{ color: "#727270" }}
                width={17}
              />
              <span className="text-xs font-medium">Back to home</span>
            </button>
          </div>
        </Link>
        {/* Title Section */}
        <div className="flex flex-col text-center mt-mt-14 mb-10 w-full">
          <h1 className="text-3xl font-semibold text-[#464644]">Experience</h1>
          <p className="text-xs text-[#727270] mt-4">
            Use the arrow keys to navigate between projects.
          </p>
        </div>
        {/* Work Experience Section - Modified positioning */}
        <div className="flex p-1 flex-col gap-5 w-[65vh] ml-14 mt-20">
          <div className="text-lg font-medium">Work Experience</div>
          <div className="flex flex-col gap-2">
            {events.map((event) => {
              const { _id, title, image, startDate, endDate, body } = event;

              return (
                <div
                  key={_id}
                  className="relative flex items-center pb-5 gap-2"
                >
                  <div className="relative mr-3 ml-3 h-[45px] w-[45px] flex-shrink-0">
                    <Image
                      src={urlFor(image).width(400).height(400).url()}
                      alt={title}
                      fill
                      className="rounded-full border-2 border-[#DBDAD6] object-cover"
                      sizes="60px"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-mono text-xl text-[#464644]">{title}</p>
                    <p className="text-sm text-[#727270]">
                      {format(new Date(startDate), "MMM yyyy")} -{" "}
                      {endDate
                        ? format(new Date(endDate), "MMM yyyy")
                        : "Present"}
                    </p>
                    <div className="text-xf text-[#727270]">
                      {typeof body === "string"
                        ? body
                        : Array.isArray(body)
                          ? body[0]?.children?.[0]?.text || ""
                          : ""}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fixed Skills Panel */}
      <div className="flex flex-col border border-[#DBDAD6] bg-[#f7f6f4] rounded-t-lg gap-5 w-[65vh] fixed bottom-0 right-14 p-6">
        <h2 className="text-base font-medium text-[#464644]">Core Skills</h2>
        <div className="flex flex-wrap gap-2 ml-2">
          {skills?.map((skill: Skill) => (
            <span
              key={skill._id}
              className="px-3 py-1 bg-white rounded-full border border-[#DBDAD6] text-xm text-[#727270]"
            >
              {skill.title}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-base">Education</span>
          <span className="text-xm text-[#727270] ml-2">
            International University of Applied Sciences
          </span>
          <span className="text-xm text-[#727270] ml-2">
            Bachelor of Science in Software Development
          </span>
        </div>
        <div className="flex flex-col">
          <span>Languages</span>
          <span className="text-[#727270] text-xm">English</span>
        </div>
      </div>
    </div>
  );
}

export default ClientExperience;
