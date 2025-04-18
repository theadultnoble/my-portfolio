import React from 'react';
import Image from 'next/image';
import { sanityFetch } from '@/sanity/live';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/client'; //

import Link from 'next/link';
import { format } from 'date-fns';

import { EXPERIENCE_QUERY } from '@/sanity/queries';

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

async function Experience() {
  const { data: events } = await sanityFetch({
    query: EXPERIENCE_QUERY,
  });

  return (
    <Link href={'/Experience'}>
      <div className='mt-2 h-36 relative'>
        <div className='absolute top-0 left-0 right-2 bg-gradient-to-b from-[#F5F4F2] to-transparent pointer-events-none z-10'></div>
        <div className='absolute bottom-0 left-0 right-2 h-5 bg-gradient-to-t from-[#F5F4F2] to-transparent pointer-events-none z-10 '></div>
        <div className='h-full px-2 overflow-y-auto scrollbar-thin scrollbar-thumb-[#727270] scrollbar-track-transparent scrollbar-thumb-rounded-full'>
          {events.map(({ _id, title, image, startDate, endDate }, index) => (
            <div key={_id} className='relative flex items-center pb-5 gap-2'>
              <div className='relative'>
                <Image
                  src={urlFor(image).width(100).height(100).url()}
                  alt={title}
                  width={30}
                  height={30}
                  className='rounded-full border border-[#DBDAD6] relative z-10'
                />
                {index < events.length - 1 && (
                  <div className='absolute left-1/2 top-[30px] h-[calc(100%+20px)] w-[1px] bg-[#DBDAD6] -translate-x-1/2'></div>
                )}
              </div>
              <div>
                <p className='font-mono text-xs text-[#464644]'>{title}</p>
                <p className='text-xxs'>
                  {format(new Date(startDate), 'MMM yyyy')} -{' '}
                  {endDate ? format(new Date(endDate), 'MMM yyyy') : 'Present'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default Experience;
