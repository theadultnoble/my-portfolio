'use client';
import React from 'react';
import Image from 'next/image';
import { MoveRightIcon } from 'lucide-react';
import { MoveLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { client } from '@/sanity/client'; //
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

const ClientOpenSource = ({ openSource }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const displayData = openSource[currentIndex];
  const toggleDisplay = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % openSource.length);
  };

  // Truncate text to a maximum length
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, text.lastIndexOf(' ', maxLength)) + '...';
  };

  return (
    <div className=' h-36 overflow-y-scroll scrollbar-none mt-3'>
      {currentIndex === 0 && (
        <Link href='/OpenSource'>
          <Image
            src={urlFor(displayData.image).width(100).height(100).url()}
            width={100}
            height={70}
            alt={displayData.title}
            unoptimized
            className='w-11/12 rounded-lg h-9 border border-[#DBDAD6]'
          />
        </Link>
      )}
      {currentIndex === 1 && (
        <Link href='/OpenSource'>
          <Image
            src={urlFor(displayData.image).width(300).height(300).url()}
            width={90}
            height={50}
            unoptimized
            alt={displayData.title}
            className='w-11/12 rounded-lg h-9 border border-[#DBDAD6]'
          />
        </Link>
      )}
      <div className='flex'>
        {currentIndex === 1 && (
          <div
            className='p-2 rounded-full bg-[#E9E8E6] shrink-0 self-start mr-3 mt-4 border border-[#DBDAD6]'
            onClick={toggleDisplay}
          >
            <MoveLeftIcon size={12} className='text-[#000000]' />
          </div>
        )}
        <div className='flex-1'>
          <h2 className='text-m mt-3 mb-1 text-black'>{displayData.title}</h2>
          <p className='text-xs tracking-tighter flex-1 [shape-outside:circle(80%)]'>
            {truncateText(displayData.body, 70)}
          </p>
        </div>
        {currentIndex === 0 && (
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

export default ClientOpenSource;
