import Image from "next/image";
import profile from "../public/assets/Profile.jpeg";
import Link from "next/link";
import About from "./(components)/About";
import Experience from "./(components)/Experience";
import Learning from "./(components)/Learning";

export default function Home() {
  return (
    <main className="flex gap-10 py-5">
      <div className="flex flex-col gap-20 justify-between w-4/12">
        <div className="flex flex-col gap-8">
          <Image
            src={profile}
            alt="profile"
            width={200}
            className="rounded-md"
          />

          <div className="flex flex-col gap-4">
            <p className="text-4xl font-medium">
              Hi, I’m Noble Okafor a technical writer and Software Developer.
            </p>
            <p className="text-[#727270] ">
              Experienced web and mobile developer passionate about creating
              efficient solutions, documenting knowledge, and simplifying
              complex topics through engaging technical writing.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-y-10">
          <div>
            <Link href="" className="px-6 py-3 bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] text-xs font-medium">
              Contact
            </Link>
          </div>

          <div>
            <Link
              href=""
              className="px-6 py-3 bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] text-xs font-medium"
            >
              Email
            </Link>
          </div>

          <div>
            <Link
              href=""
              className="px-6 py-3 bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] text-xs font-medium"
            >
              Github
            </Link>
          </div>

          <div>
            <Link
              href=""
              className="px-6 py-3 bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] text-xs font-medium"
            >
              Twitter
            </Link>
          </div>

          <div>
            <Link
              href=""
              className="px-6 py-3 bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] text-xs font-medium"
            >
              LinkedIn
            </Link>
          </div>

          <div>
            <Link
              href=""
              className="px-6 py-3 bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] text-xs font-medium"
            >
              Resume
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-x-3 w-9/12 gap-y-5">
        <div className="bg-[#F5F4F2] p-4 col-span-2 rounded-lg border-2 border-[#DBDAD6]">
          <p className="px-4 py-2 bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] w-fit text-xs font-medium">
            Experience
          </p>
          <Experience />
        </div>
        <div className="bg-[#F5F4F2] p-4 col-span-4 rounded-lg border-2 border-[#DBDAD6]">
          <p className="px-4 py-2 bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] w-fit text-xs font-medium">
            Projects
          </p>
        </div>
        <div className="bg-[#F5F4F2] p-4 col-span-2 rounded-lg border-2 border-[#DBDAD6]">
          <p className="px-4 py-2 bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] w-fit text-xs font-medium">
            Open Source
          </p>
        </div>
        <div className="bg-[#F5F4F2] p-4 col-span-5 flex flex-col gap-4 rounded-lg border-2 border-[#DBDAD6]">
          <p className="px-4 py-2 bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] w-fit text-xs font-medium">
            About
          </p>
          <About />
        </div>
        <div className="bg-[#F5F4F2] p-4 col-span-3 rounded-lg border-2 border-[#DBDAD6]">
          <p className="px-4 py-2 bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] w-fit text-xs font-medium">
            What I&apos;m listening to
          </p>
        </div>
        <div className="bg-[#F5F4F2] p-4 col-span-2 rounded-lg border-2 border-[#DBDAD6]">
          <Link href="https://reactnative.dev/" target="_blank">
            <p className="px-4 py-2 bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] w-fit text-xs font-medium">
              What I&apos;m Learning
            </p>
            <Learning />
          </Link>
        </div>
        <div className="bg-[#F5F4F2] p-4 col-span-2 rounded-lg border-2 border-[#DBDAD6]">
          <p className="px-4 py-2 bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] w-fit text-xs font-medium">
            Location
          </p>
        </div>
        <div className="bg-[#F5F4F2] p-4 col-span-4 rounded-lg border-2 border-[#DBDAD6]">
          <p className="px-4 py-2 bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] w-fit text-xs font-medium">
            Featured blog posts
          </p>
        </div>
      </div>
    </main>
  );
}
