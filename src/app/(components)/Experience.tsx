import React from 'react';
import Image from 'next/image';
import back4app from '/public/assets/b4a-logo.png';
import openReplay from '/public/assets/OpenReplay-logo.png';
import muo from '/public/assets/MUO-logo.png';
import mindrift from '/public/assets/Mindrift-logo.png';
import Link from 'next/link';

function Experience() {
  return (
    <div className='mt-4 h-28 relative'>
      <div className='absolute top-0 left-0 right-2 h-5 bg-gradient-to-b from-[#F5F4F2] to-transparent pointer-events-none z-10'></div>
      <div className='absolute bottom-0 left-0 right-2 h-5 bg-gradient-to-t from-[#F5F4F2] to-transparent pointer-events-none z-10 '></div>
      <div className='h-full px-2 overflow-y-auto scrollbar-thin scrollbar-thumb-[#727270] scrollbar-track-[#E9E8E6] scrollbar-track-rounded-full scrollbar-thumb-rounded-full pr-2 '>
        <div className='flex items-center gap-2'>
          <Link href={'/open-replay'}>
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
          </Link>
        </div>
        <div className="my-1.5">
          <p className='w-[2px] h-8 bg-gray-200 rounded-lg mx-auto'></p>
        </div>

        <div className='flex items-center gap-2 flex-col'>
          <Link href='/mindrift'>
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
          </Link>
        </div>
        <div className="my-1.5">
          <p className='w-[2px] h-8 bg-gray-200 rounded-lg mx-auto'></p>
        </div>

        <div className='flex items-center gap-2'>
          <Link href={'/muo'}>
            <Image src={muo} alt='MUO-logo' width={30} className='rounded-full border border-[#DBDAD6]' />
            <div>
              <p className='font-medium text-xs text-[#464644]'>MakeUseOf</p>
              <p className='text-xxs'>Mar 2024 - Aug 2024</p>
            </div>
          </Link>
        </div>
        <div className="my-1.5">
          <p className='w-[2px] h-8 bg-gray-200 rounded-lg mx-auto'></p>
        </div>

        <div className='flex items-center gap-2 flex-col'>
          <Link href={'/back4app'}>
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
          </Link>
        </div>
        <div className="my-1.5">
          <p className='w-[2px] h-8 bg-gray-200 rounded-lg mx-auto'></p>
        </div>
      </div>
    </div>
  );
}

export default Experience;
