import Image from "next/image";
import profile from "../public/assets/Profile.jpeg";
import Link from "next/link";
import About from "./(components)/About";

export default function Home() {
  return (
    <main className="flex gap-10 py-5">
      <div className="flex flex-col gap-20 justify-between w-3/12">
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
            <Link href="" className="px-6 py-3 bg-[#E9E8E6] rounded-3xl">
              Contact
            </Link>
          </div>

          <div>
            <Link href="" className="px-6 py-3 bg-[#E9E8E6] rounded-3xl">
              Email
            </Link>
          </div>

          <div>
            <Link href="" className="px-6 py-3 bg-[#E9E8E6] rounded-3xl">
              Github
            </Link>
          </div>

          <div>
            <Link href="" className="px-6 py-3 bg-[#E9E8E6] rounded-3xl">
              Twitter
            </Link>
          </div>

          <div>
            <Link href="" className="px-6 py-3 bg-[#E9E8E6] rounded-3xl">
              LinkedIn
            </Link>
          </div>

          <div>
            <Link href="" className="px-6 py-3 bg-[#E9E8E6] rounded-3xl">
              Resume
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-x-3 w-9/12 gap-y-5">
        <div className="bg-[#F5F4F2] p-6 col-span-2 rounded-lg">
          <p className="px-6 py-3 bg-[#E9E8E6] rounded-3xl w-fit">Experience</p>
        </div>
        <div className="bg-[#F5F4F2] p-6 col-span-4 rounded-lg">
          <p className="px-6 py-3 bg-[#E9E8E6] rounded-3xl w-fit">Projects</p>
        </div>
        <div className="bg-[#F5F4F2] p-6 col-span-2 rounded-lg">
          <p className="px-6 py-3 bg-[#E9E8E6] rounded-3xl w-fit">Open Source</p>
        </div>
        <div className="bg-[#F5F4F2] p-6 col-span-5 flex flex-col gap-4">
          <p className="px-6 py-3 bg-[#E9E8E6] rounded-3xl w-fit">About</p>
          <About />
        </div>
        <div className="bg-[#F5F4F2] p-6 col-span-3">
          <p className="px-6 py-3 bg-[#E9E8E6] rounded-3xl w-fit">
            What I&apos;m listening to
          </p>
        </div>
        <div className="bg-[#F5F4F2] p-6 col-span-2">
          <p className="px-6 py-3 bg-[#E9E8E6] rounded-3xl w-fit">
            What I&apos;m reading
          </p>
        </div>
        <div className="bg-[#F5F4F2] p-6 col-span-2">
          <p className="px-6 py-3 bg-[#E9E8E6] rounded-3xl w-fit">Location</p>
        </div>
        <div className="bg-[#F5F4F2] p-6 col-span-4">
          <p className="px-6 py-3 bg-[#E9E8E6] rounded-3xl w-fit">
            Featured blog posts
          </p>
        </div>
      </div>
    </main>
  );
}
