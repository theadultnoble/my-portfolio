import React from 'react';
import Image from 'next/image';
import back4app from '../../public/assets/b4a-logo.png';
import openReplay from '../../public/assets/OpenReplay-logo.png';
import muo from '../../public/assets/MUO-logo.png';
import mindrift from '../../public/assets/Mindrift-logo.png';
import Link from 'next/link';

function Experience() {
  return (
    <div className='flex flex-col gap-5 mt-4 h-28 px-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-sky-500  scrollbar-w-none'>
      <div className='flex items-center gap-2'>
        <Link href={'/open-replay'}>
          <Image
            src={openReplay}
            alt='openreplay-logo'
            width={30}
            className='rounded-full'
          />
          <div>
            <p className='font-medium text-xs text-[#464644]'>OpenReplay</p>
            <p className='text-xxs'>Sep 2022 - Dec 2022</p>
          </div>
        </Link>
      </div>

      <div className='flex items-center gap-2 flex-col'>
        <Link href='/mindrift'>
          <Image
            src={mindrift}
            alt='mindrift-logo'
            width={30}
            className='rounded-full'
          />
          <div>
            <p className='font-medium text-xs text-[#464644]'>Mindrift</p>
            <p className='text-xxs'>Oct 2022 - Jan 2024</p>
          </div>
        </Link>
      </div>

      <div className='flex items-center gap-2'>
        <Link href={'/muo'}>
          <Image src={muo} alt='MUO-logo' width={30} className='rounded-full' />
          <div>
            <p className='font-medium text-xs text-[#464644]'>MakeUseOf</p>
            <p className='text-xxs'>Mar 2024 - Aug 2024</p>
          </div>
        </Link>
      </div>

      <div className='flex items-center gap-2 flex-col'>
        <Link href={'/back4app'}>
          <Image
            src={back4app}
            alt='back4app-logo'
            width={30}
            className='rounded-full'
          />
          <div>
            <p className='font-medium text-xs text-[#464644]'>Back4app</p>
            <p className='text-xxs'>Jun 2023 - Present</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Experience;
