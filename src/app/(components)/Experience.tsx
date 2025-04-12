import React from 'react';
import Image from 'next/image';
import { defineQuery } from 'next-sanity';
import { sanityFetch } from '@/sanity/live';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/client'; //

import Link from 'next/link';

const GROQ_QUERY = defineQuery(
  `*[_type == "experience" && defined(slug.current)]{_id, title, slug, image}`
);

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

async function Experience() {
  console.log('👋 Experience component mounted');
  const result = await sanityFetch({ query: GROQ_QUERY });
  console.log('RAW', JSON.stringify(result, null, 2));

  const { data: events } = await sanityFetch({
    query: GROQ_QUERY,
  });
  // console.log('events', events);
  return (
    <Link href={'/Experience'}>
      <div className='mt-2 h-36 relative'>
        <div className='absolute top-0 left-0 right-2 bg-gradient-to-b from-[#F5F4F2] to-transparent pointer-events-none z-10'></div>
        <div className='absolute bottom-0 left-0 right-2 h-5 bg-gradient-to-t from-[#F5F4F2] to-transparent pointer-events-none z-10 '></div>
        <div className='h-full px-2 overflow-y-auto scrollbar-thin scrollbar-thumb-[#727270] scrollbar-track-transparent scrollbar-thumb-rounded-full'>
          {/* <div className='flex items-center pb-2'> */}
          {events.map(({ _id, title, image }) => (
            <div key={_id}>
              <Image
                src={urlFor(image).width(100).height(100).url()}
                alt={title}
                width={30}
                height={30}
                className='rounded-full border border-[#DBDAD6]'
              />
              <p className='font-medium text-xs text-[#464644]'>{title}</p>
              <p className='text-xxs'>Sep 2022 - Dec 2022</p>
            </div>
          ))}
          {/* </div> */}
        </div>
      </div>
    </Link>
  );
}

export default Experience;
