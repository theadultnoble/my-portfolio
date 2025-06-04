"use client";
import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import Image from "next/image";

interface OpenSourceItem {
  _id: string;
  title: string;
  image: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  URL: string;
  body: string;
  slug: {
    current: string;
  };
}

interface ClientOpenSourceProps {
  openSource: OpenSourceItem[];
}

const builder = imageUrlBuilder(client);
function urlFor(source: OpenSourceItem["image"]) {
  return builder.image(source);
}

export default function ClientOpenSource({
  openSource,
}: ClientOpenSourceProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToProject = (projectId: string) => {
    const projectElement = projectRefs.current[projectId];
    if (projectElement) {
      projectElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToDetails = () => {
    if (detailsRef.current) {
      detailsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // Track which section is currently in view
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;

      // Determine which project section is currently in view
      Object.entries(projectRefs.current).forEach(([projectId, element]) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            setActiveSection(projectId);
          }
        }
      });
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div
      className="relative w-screen overflow-y-scroll scrollbar-thin h-[100vh]"
      ref={scrollContainerRef}
    >
      <div className="flex flex-col p-10 max-w-[1200px] mx-auto">
        <Link href="/">
          <div className="items-center gap-2 mb-6 fixed z-10 top-10">
            <button className="flex items-center gap-1 px-4 py-2 bg-[#E9E8E6] rounded-full border border-[#DBDAD6] text-sm text-[#464644] hover:bg-[#DBDAD6] transition-colors">
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
        <div className="flex flex-col text-center mt-14 mb-10 w-full">
          <h1 className="text-3xl font-semibold text-[#464644]">Open Source</h1>
          <p className="text-xs text-[#727270] mt-4">
            Click on any project card to jump to details, or scroll naturally
            through the page.
          </p>
        </div>

        {/* Open Source Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {openSource.map((project) => (
            <div
              key={project._id}
              className="group relative bg-[#F5F4F2] rounded-lg border border-[#DBDAD6] p-4 hover:shadow-lg transition-all duration-300 hover:border-[#727270] cursor-pointer"
              onMouseEnter={() => setHoveredCard(project._id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => scrollToProject(project._id)}
            >
              {/* Project Image */}
              <div className="relative mb-3 overflow-hidden rounded-lg bg-[#F5F5F4]">
                <Image
                  src={urlFor(project.image).width(400).height(150).url()}
                  alt={project.title}
                  width={400}
                  height={150}
                  className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Overlay on hover */}
                <div
                  className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 ${
                    hoveredCard === project._id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full text-sm font-medium text-[#464644]">
                    <Icon icon="material-symbols:visibility" width={14} />
                    Read More
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-[#464644] line-clamp-2">
                  {project.title}
                </h3>

                {/* Project Links */}
                <div className="flex items-center justify-between pt-1">
                  <Link
                    href={project.URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-[#727270] hover:text-[#464644] transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon icon="mdi:github" width={12} />
                    View Repository
                  </Link>

                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-[#727270]">Active</span>
                  </div>
                </div>
              </div>

              {/* Animated border on hover */}
              <div
                className={`absolute inset-0 rounded-lg border-2 border-transparent transition-all duration-300 pointer-events-none ${
                  hoveredCard === project._id ? "border-[#464644]" : ""
                }`}
              ></div>
            </div>
          ))}
        </div>

        {/* Scroll to Details Button */}
        {openSource.length > 0 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={scrollToDetails}
              className="flex items-center gap-2 px-6 py-3 bg-[#E9E8E6] text-[#464644] rounded-full hover:bg-[#353533] hover:text-[#E9E8E6] transition-colors"
            >
              <span className="text-sm font-medium">
                Explore Project Details
              </span>
              <Icon icon="material-symbols:keyboard-arrow-down" width={20} />
            </button>
          </div>
        )}

        {/* Empty State */}
        {openSource.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Icon
              icon="material-symbols:code-blocks-outline"
              width={64}
              className="text-[#DBDAD6] mb-4"
            />
            <h3 className="text-lg font-medium text-[#464644] mb-2">
              No projects yet
            </h3>
            <p className="text-sm text-[#727270] max-w-md">
              Open source projects will appear here when they&apos;re added to
              the collection.
            </p>
          </div>
        )}

        {/* Detailed Project Sections */}
        {openSource.length > 0 && (
          <div className="mt-20" ref={detailsRef}>
            <div className="space-y-20 ">
              {openSource.map((project) => (
                <div
                  key={project._id}
                  ref={(el) => {
                    projectRefs.current[project._id] = el;
                  }}
                  className={`bg-[#F5F4F2] rounded-xl border overflow-hidden shadow-sm transition-all duration-300 ${
                    activeSection === project._id
                      ? "border-[#464644] shadow-lg"
                      : "border-[#DBDAD6]"
                  }`}
                >
                  {/* Project Header */}
                  <div className="bg-[#E9E8E6] p-6 border-b border-[#DBDAD6]">
                    <div className="flex justify-between">
                      <h3 className="text-2xl font-bold text-[#464644] mb-3">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-4">
                        <Link
                          href={project.URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-[#464644] text-white rounded-full text-sm font-medium hover:bg-[#353533] transition-colors"
                        >
                          <Icon icon="mdi:github" width={16} />
                          View Repository
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-8">
                    <div className="prose prose-sm max-w-none">
                      <div className="text-[#464644] leading-relaxed whitespace-pre-line">
                        {project.body}
                      </div>
                    </div>

                    {/* Project Footer */}
                    <div className="mt-8 pt-6 border-t  border-[#DBDAD6] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-[#727270]">
                          Active Project
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <Link
                          href={project.URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-[#727270] hover:text-[#464644] transition-colors"
                        >
                          <Icon
                            icon="material-symbols:open-in-new"
                            width={16}
                          />
                          Open in GitHub
                        </Link>

                        <button
                          onClick={scrollToTop}
                          className="flex items-center gap-1 text-sm text-[#727270] hover:text-[#464644] transition-colors"
                        >
                          <Icon
                            icon="material-symbols:keyboard-arrow-up"
                            width={16}
                          />
                          Back to top
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Stats */}
        {openSource.length > 0 && (
          <div className="mt-16 pt-8 border-t border-[#DBDAD6]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#464644]">
                    {openSource.length}
                  </div>
                  <div className="text-xs text-[#727270]">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#464644]">
                    {openSource.length}
                  </div>
                  <div className="text-xs text-[#727270]">Repositories</div>
                </div>
              </div>

              <p className="text-xs text-[#727270] max-w-md text-center md:text-right">
                These projects represent contributions to the open source
                community, ranging from libraries and tools to experimental
                projects.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Floating Navigation Helper */}
      {openSource.length > 0 && (
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-10">
          <div className="flex flex-col gap-2">
            {openSource.map((project) => (
              <button
                key={project._id}
                onClick={() => scrollToProject(project._id)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeSection === project._id
                    ? "bg-[#464644] scale-125"
                    : "bg-[#DBDAD6] hover:bg-[#727270]"
                }`}
                title={project.title}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
