import React from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';

export default function ExperiencePage() {
  return (
    <div className='flex p-10 h-svh w-screen border-2 border-red-600'>
      <div className='pt-10 h-40 w-full flex border-2 border-red-600'>
        {/* Back Button */}
        <div className='items-center gap-2 mb-6'>
          <button className='flex items-center gap-1 px-4 py-2 bg-[#E9E8E6] rounded-full border border-[#DBDAD6] text-sm text-[#464644]'>
            <Icon
              icon='material-symbols-light:arrow-back-rounded'
              style={{ color: '#727270' }}
              width={17}
            />
            <span className='text-xs font-medium'>Back</span>
          </button>
        </div>

        {/* Title Section */}
        <div className='flex flex-col text-center mb-10 w-full'>
          <h1 className='text-3xl font-semibold text-[#464644]'>Experience</h1>
          <p className='text-xs text-[#727270] mt-4'>
            Use the arrow keys to navigate between projects.
          </p>
        </div>
      </div>
      <div className='flex flex-col experience-height border border-neutral-950 gap-10 w-96 fixed bottom-0 left-10'>
        <div>page</div>
      </div>
    </div>
  );
}
