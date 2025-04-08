import Image from 'next/image';
import profile from '/public/assets/Profile.jpeg';
import Link from 'next/link';
import About from './(components)/About';
import Experience from './(components)/Experience';
import Learning from './(components)/Learning';
import Listening from './(components)/Listening';
import Location from './(components)/Location';
import { Icon } from '@iconify/react';
import OpenSource from './(components)/OpenSource';
import BlogPosts from './(components)/BlogPosts';
import Projects from './(components)/Projects';

export default function Home() {
  return (
    <main className='flex items-center justify-center p-14 h-svh w-screen'>
      <div className='flex flex-col gap-24 mr-10 justify-between w-4/12 '>
        <div className='flex flex-col gap-8'>
          <Image
            src={profile}
            alt='profile'
            width={190}
            height={100}
            className='rounded-md'
          />

          <div className='flex flex-col gap-4'>
            <p className='text-2xl font-medium'>
              Hi, I&apos;m Noble Okafor a technical writer and Software
              Developer.
            </p>
            <p className=' text-xs text-[#727270] '>
              Experienced web and mobile developer passionate about creating
              efficient solutions, documenting knowledge, and simplifying
              complex topics through engaging technical writing.
            </p>
          </div>
        </div>

        <div className=' grid grid-cols-3 text-[#727270] gap-y-5 gap-x-6'>
          <Link
            target='_blank'
            href=''
            className='py-2 px-3 flex items-center gap-1 bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] text-xs font-medium w-fit'
          >
            <Icon
              icon='mdi-light:phone'
              style={{ color: '#727270' }}
              width={17}
            />
            Contact
          </Link>

          <Link
            target='_blank'
            href=''
            className='py-2 px-3 flex items-center gap-1 bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] text-xs font-medium w-fit'
          >
            <Icon
              icon='material-symbols-light:mail-outline'
              style={{ color: '#727270' }}
              width={17}
            />
            Email
          </Link>

          <Link
            href='https://github.com/theadultnoble'
            target='_blank'
            className='py-2 px-3 flex items-center gap-1 bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] text-xs font-medium w-fit'
          >
            <Icon
              icon='iconoir:github'
              style={{ color: '#727270' }}
              width={17}
            />
            Github
          </Link>

          <Link
            href='https://x.com/theadultnoble'
            target='_blank'
            className='py-2 px-3 flex items-center gap-1 bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] text-xs font-medium w-fit'
          >
            <Icon
              icon='iconoir:twitter'
              style={{ color: '#727270' }}
              width={17}
            />
            Twitter
          </Link>

          <Link
            target='_blank'
            href='https://linkedin.com/in/nobleokafor'
            className='py-2 px-3 flex items-center gap-1 bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] text-xs font-medium w-fit'
          >
            <Icon
              icon='iconoir:linkedin'
              style={{ color: '#727270' }}
              width={17}
            />
            LinkedIn
          </Link>

          <Link
            target='_blank'
            href='https://docs.google.com/document/d/1Y2ithUQ7qZLwgRlv1EY35kQvuaVFh1PX54Dl9crlh5U/edit?usp=sharing'
            className='py-2 px-3 flex items-center gap-1 bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] text-xs font-medium w-fit'
          >
            <Icon icon='iconoir:page' style={{ color: '#727270' }} width={17} />
            Resume
          </Link>
        </div>
      </div>

      <div className=' text-[#727270] grid grid-cols-8 gap-x-3 w-9/12 gap-y-5'>
        <div className='bg-[#F5F4F2] pb-1 p-2 col-span-2 rounded-lg border-2 border-[#DBDAD6]'>
          <p className='flex items-center gap-1 px-1  bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] w-fit text-xxs font-medium'>
            <Icon
              icon='mingcute:briefcase-fill'
              style={{ color: '#727270' }}
              width={12}
            />
            Experience
          </p>
          <Experience />
        </div>
        <div className='bg-[#F5F4F2] p-2 col-span-4 rounded-lg border-2 border-[#DBDAD6]'>
          <p className='flex items-center gap-1 px-1 bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] w-fit text-xxs font-medium'>
            <Icon
              icon='icon-park-twotone:computer'
              style={{ color: '#727270' }}
              width={12}
            />
            Projects
          </p>
          <Projects />
        </div>
        <div className='bg-[#F5F4F2] p-2 col-span-2 rounded-lg border-2 border-[#DBDAD6]'>
          <p className='flex items-center gap-1 px-1 bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] w-fit text-xxs font-medium'>
            <Icon
              icon='typcn:spanner-outline'
              style={{ color: '#727270' }}
              width={12}
            />
            Open Source
          </p>
          <OpenSource />
        </div>
        <div className='bg-[#F5F4F2] p-3 col-span-4 flex-1  flex-col gap-4 rounded-lg border-2 border-[#DBDAD6]'>
          <p className='flex items-center gap-1 px-2 mb-3 bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] w-fit text-xxs font-thin'>
            <Icon
              icon='fluent:person-12-regular'
              style={{ color: '#727270' }}
              width={12}
            />
            About
          </p>
          <About />
        </div>
        <div className='bg-[#F5F4F2] p-2 col-span-4 rounded-lg border-2 border-[#DBDAD6]'>
          <p className='flex items-center gap-1 px-1 bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] w-fit text-xxs font-medium'>
            <Icon
              icon='mynaui:headphones'
              style={{ color: '#727270' }}
              width={12}
            />
            What I&apos;m listening to
          </p>
          <Listening key={Math.random()} />
        </div>
        <div className='bg-[#F5F4F2] p-2 col-span-2 rounded-lg border-2 border-[#DBDAD6]'>
          <Link href='https://reactnative.dev/' target='_blank'>
            <p className=' flex items-center gap-1 px-1 bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] w-fit text-xxs font-medium'>
              <Icon
                icon='emojione-monotone:books'
                style={{ color: '#727270' }}
                width={12}
              />
              What I&apos;m Learning
            </p>
            <Learning />
          </Link>
        </div>
        <div className='bg-[#F5F4F2] p-1 col-span-2 h-44 rounded-lg border-2 border-[#e4e3e0]'>
          <Location />
        </div>
        <div className='bg-[#F5F4F2] p-2 col-span-4 h-44 rounded-lg border-2 border-[#DBDAD6] relative'>
          <div className='absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#F5F4F2] to-transparent pointer-events-none z-10'></div>
          <p className='flex items-center gap-1 px-1 bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] w-fit text-xxs font-medium'>
            <Icon
              icon='stash:burger-classic'
              style={{ color: '#727270' }}
              width={12}
            />
            Featured blog posts
          </p>
          <div className='overflow-y-auto h-[calc(100%-0.8rem)] scrollbar-thin scrollbar-thumb-[#727270] scrollbar-track-transparent scrollbar-thumb-rounded-full pr-2'>
            <BlogPosts />
          </div>
        </div>
      </div>
    </main>
  );
}
