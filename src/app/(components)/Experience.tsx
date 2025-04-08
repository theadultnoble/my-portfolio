import React from 'react';
import Image from 'next/image';
import back4app from '/public/assets/b4a-logo.png';
import openReplay from '/public/assets/OpenReplay-logo.png';
import muo from '/public/assets/MUO-logo.png';
import mindrift from '/public/assets/Mindrift-logo.png';
import { defineQuery } from 'next-sanity';
import { sanityFetch } from '@/app/sanity/live';
import Link from 'next/link';

const GROQ_QUERY = defineQuery(
  `*[_type == "experience" && defined(slug.current)]{_id, title, slug, image}`
);

async function Experience() {
  const { data: events } = await sanityFetch({ query: GROQ_QUERY });
  console.log('Fetched events:', events);
  return (
    <Link href={'/Experience'}>
      <div className='mt-2 h-36 relative'>
        <div className='absolute top-0 left-0 right-2 bg-gradient-to-b from-[#F5F4F2] to-transparent pointer-events-none z-10'></div>
        <div className='absolute bottom-0 left-0 right-2 h-5 bg-gradient-to-t from-[#F5F4F2] to-transparent pointer-events-none z-10 '></div>
        <div className='h-full px-2 overflow-y-auto scrollbar-thin scrollbar-thumb-[#727270] scrollbar-track-transparent scrollbar-thumb-rounded-full'>
          <div className='flex items-center pb-2'>
            <Image
              src={openReplay}
              alt='openreplay-logo'
              width={30}
              className='rounded-full border border-[#DBDAD6]'
            />
            <div>
              <p className='font-medium text-xs text-[#464644]'>OpenReplay</p>
              <p className='text-xxs'>Sep 2022 - Dec 2022</p>
            </div>
          </div>
          <div className='flex items-center gap-2 pb-2 flex-col'>
            <Image
              src={mindrift}
              alt='mindrift-logo'
              width={30}
              className='rounded-full border border-[#DBDAD6]'
            />
            <div>
              <p className='font-medium text-xs text-[#464644]'>Mindrift</p>
              <p className='text-xxs'>Oct 2022 - Jan 2024</p>
            </div>
          </div>
          <div className='flex items-center pb-2 gap-2'>
            <Image
              src={muo}
              alt='MUO-logo'
              width={30}
              className='rounded-full border border-[#DBDAD6]'
            />
            <div>
              <p className='font-medium text-xs text-[#464644]'>MakeUseOf</p>
              <p className='text-xxs'>Mar 2024 - Aug 2024</p>
            </div>
          </div>
          <div className='flex items-center pb-2 gap-2 flex-col'>
            <Image
              src={back4app}
              alt='back4app-logo'
              width={30}
              className='rounded-full border border-[#DBDAD6]'
            />
            <div>
              <p className='font-medium text-xs text-[#464644]'>Back4app</p>
              <p className='text-xxs'>Jun 2023 - Present</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Experience;
