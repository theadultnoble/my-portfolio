import React from 'react';
import Image from 'next/image';
import back4app from '../../public/assets/b4a-logo.png';
import openReplay from '../../public/assets/OpenReplay-logo.png';
import muo from '../../public/assets/MUO-logo.png';
import mindrift from '../../public/assets/Mindrift-logo.png';
import Link from 'next/link';

function Experience() {
  return (
    
    <div className='flex flex-col gap-3 overflow-x'>
      <div className='flex items-center gap-2'>
        <Link href={'/open-replay'}>
          <Image
            src={openReplay}
            alt='openreplay-logo'
            width={50}
            className='rounded-full'
          />
          <div>
            <p className='font-medium'>OpenReplay</p>
            <p className='text-sm'>Sep 2022 - Dec 2022</p>
          </div>
        </Link>
      </div>

      <div className='flex items-center gap-2'>
        <Link href='/mindrift'>
          <Image
            src={mindrift}
            alt='mindrift-logo'
            width={50}
            className='rounded-full'
          />
          <div>
            <p>Mindrift</p>
            <p>Oct 2022 - Jan 2024</p>
          </div>
        </Link>
      </div>

      <div className='flex items-center gap-2'>
        <Link href={'/muo'}>
          <Image src={muo} alt='MUO-logo' width={50} className='rounded-full' />
          <div>
            <p>MakeUseOf</p>
            <p>Mar 2024 - Aug 2024</p>
          </div>
        </Link>
      </div>

      <div className='flex items-center gap-2'>
        <Link href={'/back4app'}>
          <Image
            src={back4app}
            alt='back4app-logo'
            width={50}
            className='rounded-full'
          />
          <div>
            <p>Back4app</p>
            <p>Jun 2023 - Present</p>
          </div>
        </Link>
 routing
      </div>
    </div>
  );
}

export default Experience;
