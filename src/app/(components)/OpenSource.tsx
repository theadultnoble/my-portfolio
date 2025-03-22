'use client';

import React from 'react';
import Image from 'next/image';
import data from '@/data/opensource.json';
import { MoveRightIcon } from 'lucide-react';
import { MoveLeftIcon } from 'lucide-react';
import OpenZepellin from '/public/assets/OpenZeppellin.png';
import Dacade from '/public/assets/dacade_og.png';
import Link from 'next/link';

const OpenSource = () => {
  const [display, setDisplay] = React.useState(1);
  const displayData = data.filter((item) => item.id === display);

  const toggleDisplay = () => {
    setDisplay((prevState) => (prevState === 1 ? 2 : 1));
  };
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, text.lastIndexOf(' ', maxLength)) + '...';
  };

  return (
    <div className=' h-36 overflow-y-scroll scrollbar-none mt-3'>
      {display === 1 && (
        <Link href='/OpenSource'>
          <Image
            src={OpenZepellin}
            alt='openzepelin'
            className='w-11/12 rounded-lg h-9 border border-[#DBDAD6]'
          />
        </Link>
      )}
      {display === 2 && (
        <Link href='/OpenSource'>
          <Image
            src={Dacade}
            alt='dacade'
            className='w-11/12 rounded-lg h-9 border border-[#DBDAD6]'
          />
        </Link>
      )}
      <div className='flex'>
        {display === 2 && (
          <div
            className='p-2 rounded-full bg-[#E9E8E6] shrink-0 self-start mr-3 mt-4 border border-[#DBDAD6]'
            onClick={toggleDisplay}
          >
            <MoveLeftIcon size={12} className='text-[#000000]' />
          </div>
        )}
        <div className='flex-1'>
          {displayData.map((item) => (
            <div key={item.id}>
              <h2 className='text-m mt-3 mb-1 text-black'>{item.name}</h2>
              <p className='text-xs tracking-tighter flex-1 [shape-outside:circle(80%)]'>
                {truncateText(item.description, 73)}
              </p>
            </div>
          ))}
        </div>
        {display === 1 && (
          <div
            className='p-2 rounded-full bg-[#E9E8E6] shrink-0 self-start mt-4 border border-[#DBDAD6]'
            onClick={toggleDisplay}
          >
            <MoveRightIcon size={12} className='text-[#000000]' />
          </div>
        )}
      </div>
    </div>
  );
};

export default OpenSource;
