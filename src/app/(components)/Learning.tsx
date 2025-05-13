import React from 'react';
import Image from 'next/image';
import { sanityFetch } from '@/sanity/live';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/client'; //
import { LEARNING_QUERY } from '@/sanity/queries';

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

async function Learning() {
  const { data: learning } = await sanityFetch({ query: LEARNING_QUERY });

  if (!learning) {
    return <div>Loading...</div>;
  }
  return (
    <div className='mt-8'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm font-semibold text-[#464644]'>
            {learning[0].title}
          </p>
          <p className='text-xs font-medium text-[#575654] mt-2'>Software</p>
        </div>
        <div>
          <Image
            src={urlFor(learning[0].image).width(200).height(200).url()}
            alt={learning[0].title}
            width={750}
            height={750}
            unoptimized
            // className='border border-[#d9d9d9] rounded-lg'
          />
        </div>
      </div>
    </div>
  );
}

export default Learning;
