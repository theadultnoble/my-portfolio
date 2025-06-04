import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Define proper types for Sanity image
interface SanityImageAsset {
  _ref: string;
  _type: "reference";
}

interface SanityImage {
  _type: "image";
  asset: SanityImageAsset;
}

interface Project {
  _id: string;
  title: string;
  image: SanityImage;
  URL: string;
  body: string;
}

interface ClientProjectProps {
  projects: Project[];
}

export default function ClientProject({ projects }: ClientProjectProps) {
  const builder = imageUrlBuilder(client);

  function urlFor(source: SanityImage) {
    return builder.image(source);
  }

  return (
    <div className="relative overflow-y-auto scrollbar-hide border-2 w-screen h-[100vh]">
      {" "}
      {/* Back Button */}
      <div className="flex flex-col p-10 max-w-[1200px] mx-auto">
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
        <div className="flex flex-col text-center mt-14  mb-10 w-full">
          <h1 className="text-3xl font-semibold text-[#464644]">Projects</h1>
          <p className="text-xs text-[#727270] mt-4">
            Hover over section and use the arrows to navigate between projects.
          </p>
        </div>
      </div>
      {/* Project Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1200px] mx-auto mb-20">
        {projects.map((project) => (
          <div
            key={project._id}
            className="rounded-lg overflow-hidden shadow-md bg-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative h-[260px] w-full">
              <Image
                src={urlFor(project.image).width(600).height(400).url()}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-medium text-[#464644]">
                  {project.title}
                </h3>
              </div>
              <p className="text-sm text-[#727270] mb-6 line-clamp-3">
                {project.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
