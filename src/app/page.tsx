import Image from 'next/image';
import profile from '../public/assets/Profile.jpeg';
import Link from 'next/link';
import About from './(components)/About';
import Experience from './(components)/Experience';
import Learning from './(components)/Learning';
import { Icon } from '@iconify/react';

export default function Home() {
  return (
    <main className='flex gap-10 py-16'>
      <div className='flex flex-col gap-10 justify-between w-4/12'>
        <div className='flex flex-col gap-8'>
          <Image
            src={profile}
            alt='profile'
            width={200}
            height={100}
            className='rounded-md'
          />

          <div className='flex flex-col gap-4'>
            <p className='text-2xl font-medium'>
              Hi, I’m Noble Okafor a technical writer and Software Developer.
            </p>
            <p className=' text-xs text-[#727270] '>
              Experienced web and mobile developer passionate about creating
              efficient solutions, documenting knowledge, and simplifying
              complex topics through engaging technical writing.
            </p>
          </div>
        </div>

        <div className=' grid grid-cols-3 text-[#727270] gap-y-8 gap-x-6'>
          <Link
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
            href=''
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
            href=''
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
            href=''
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
            href=''
            className='py-2 px-3 flex items-center gap-1 bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] text-xs font-medium w-fit'
          >
            <Icon icon='iconoir:page' style={{ color: '#727270' }} width={17} />
            Resume
          </Link>
        </div>
      </div>

      <div className=' text-[#727270] grid grid-cols-8 gap-x-3 w-9/12 gap-y-5'>
        <div className='bg-[#F5F4F2] p-2 col-span-2 rounded-lg border-2 border-[#DBDAD6]'>
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
        </div>
        <div className='bg-[#F5F4F2] p-2 col-span-5 flex flex-col gap-4 rounded-lg border-2 border-[#DBDAD6]'>
          <p className='flex items-center gap-1 px-1 bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] w-fit text-xxs font-medium'>
            <Icon
              icon='fluent:person-12-regular'
              style={{ color: '#727270' }}
              width={12}
            />
            About
          </p>
          <About />
        </div>
        <div className='bg-[#F5F4F2] p-2 col-span-3 rounded-lg border-2 border-[#DBDAD6]'>
          <p className='flex items-center gap-1 px-1 bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] w-fit text-xxs font-medium'>
            <Icon
              icon='mynaui:headphones'
              style={{ color: '#727270' }}
              width={12}
            />
            What I&apos;m listening to
          </p>
        </div>
        <div className='bg-[#F5F4F2] p-2 col-span-3 rounded-lg border-2 border-[#DBDAD6]'>
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
        <div className='bg-[#F5F4F2] p-2 col-span-2 rounded-lg border-2 border-[#DBDAD6]'>
          <p className='flex items-center gap-1 px-1 bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] w-fit text-xxs font-medium'>
            <Icon
              icon='stash:pin-location'
              style={{ color: '#727270' }}
              width={12}
            />
            Location
          </p>
        </div>
        <div className='bg-[#F5F4F2] p-2 col-span-3 rounded-lg border-2 border-[#DBDAD6]'>
          <p className='flex items-center gap-1 px-1 bg-[#E9E8E6] rounded-3xl border-2 border-[#DBDAD6] w-fit text-xxs font-medium'>
            <Icon
              icon='stash:burger-classic'
              style={{ color: '#727270' }}
              width={12}
            />
            Featured blog posts
          </p>
        </div>
      </div>
    </main>
  );
}
