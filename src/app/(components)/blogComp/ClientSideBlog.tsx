"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
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

// Define the BlogPost data structure based on the BLOG_QUERY
interface BlogPost {
  _id: string;
  title: string;
  image: SanityImage;
  body: string;
  URL: string;
}

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImage) {
  return builder.image(source);
}

export default function ClientSideBlog({
  blogPosts,
}: {
  blogPosts: BlogPost[];
}) {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, text.lastIndexOf(" ", maxLength)) + "...";
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex flex-col divide-y divide-[#DBDAD6]"
        onScroll={(e) => {
          const fadeEffect = document.getElementById("fadeEffect");
          if (fadeEffect) {
            fadeEffect.style.opacity =
              e.currentTarget.scrollTop > 0 ? "1" : "0";
          }
        }}
      >
        {blogPosts.map((post) => {
          const { _id, title, image, URL, body } = post;
          return (
            <div key={_id} className="flex gap-2 py-2">
              <Link href={URL} target="_blank">
                <Image
                  src={urlFor(image).width(300).height(300).url()}
                  alt={title}
                  width={90} // Fixed width
                  height={70} // Fixed height
                  unoptimized
                  className="rounded-md flex-shrink-0 object-cover"
                />
              </Link>
              <div className="flex flex-col">
                <p className="text-[#464644] font-normal pb-1 text-xs">
                  {truncateText(title, 50)}
                </p>
                <p className="text-[#727270] text-xf">
                  {truncateText(body, 70)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
