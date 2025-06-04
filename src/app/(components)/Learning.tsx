import React from "react";
import Image from "next/image";
import { sanityFetch } from "@/sanity/live";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";
import { LEARNING_QUERY } from "@/sanity/queries";

// Define proper types for Sanity image
interface SanityImageAsset {
  _ref: string;
  _type: "reference";
}

interface SanityImage {
  _type: "image";
  asset: SanityImageAsset;
}

// Define the Learning data structure
interface LearningItem {
  _id: string;
  title: string;
  image: SanityImage;
}

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImage) {
  return builder.image(source);
}

async function Learning() {
  const { data: learning } = await sanityFetch({ query: LEARNING_QUERY });

  if (!learning) {
    return <div>Loading...</div>;
  }

  // Type guard to ensure learning is properly typed
  const typedLearning = learning as LearningItem[];

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-[#464644]">
            {typedLearning[0]?.title}
          </p>
          <p className="text-xs font-medium text-[#575654] mt-2">Software</p>
        </div>
        <div>
          {typedLearning[0]?.image && (
            <Image
              src={urlFor(typedLearning[0].image).width(200).height(200).url()}
              alt={typedLearning[0].title}
              width={750}
              height={750}
              unoptimized
              // className='border border-[#d9d9d9] rounded-lg'
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Learning;
