import React from 'react';
import computer from '../../public/assets/Computer.svg';
import Image from 'next/image';

function Learning() {
  return (
    <div className='mt-8'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm font-semibold text-[#464644]'>React Native</p>
          <p className='text-xs font-medium text-[#575654] mt-2'>Software</p>
        </div>
        <div>
          <Image src={computer} alt='back4app-logo' width={250} height={250} />
        </div>
      </div>
    </div>
  );
}

export default Learning;
