import React from "react";
import Link from "next/link";
import Image from "next/image";
import "../custom.css";
import { sanityFetch } from "@/sanity/live";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { PROJECT_QUERY } from "@/sanity/queries";

interface Project {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  image: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  body?: string;
  URL?: string;
}

const builder = imageUrlBuilder(client);
function urlFor(source: Project["image"]) {
  return builder.image(source);
}

async function Projects() {
  const { data: projects } = await sanityFetch({
    query: PROJECT_QUERY,
  });
  if (!projects) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card-container w-fill ">
      {projects.map((project: Project) => (
        <Link
          key={project._id}
          href={`/pages/Projects`}
          rel={project.URL ? "noopener noreferrer" : ""}
          className="image-view"
        >
          <Image
            src={urlFor(project.image).width(320).height(140).url()}
            alt={project.title}
            width={240}
            height={60}
            className="experience-height"
            style={{
              objectFit: "cover",
              display: "block",
            }}
          />
        </Link>
      ))}
    </div>
  );
}

export default Projects;
