import React from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { sanityFetch } from '@/sanity/live';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/client'; //
import { format } from 'date-fns';
import { EXPERIENCE_QUERY } from '@/sanity/queries';
// import { PortableText } from '@portabletext/react';
import Link from 'next/link';

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

async function ExperiencePage() {
  const { data: events } = await sanityFetch({
    query: EXPERIENCE_QUERY,
  });
  console.log(events)
  return (
    <div className='flex p-10 h-svh w-screen overflow-y-auto'>
      <div className='pt-10 h-40 w-full flex '>
        {/* Back Button */}
        <Link href="/">
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
        </Link>
      

        {/* Title Section */}
        <div className='flex flex-col text-center mb-10 w-full'>
          <h1 className='text-3xl font-semibold text-[#464644]'>Experience</h1>
          <p className='text-xs text-[#727270] mt-4'>
            Use the arrow keys to navigate between projects.
          </p>
        </div>
      </div>
      <div className='flex flex-col h-[70vh] border border-neutral-950 gap-10 w-[70vh] fixed bottom-0 left-10'>
        <div className='text-lg'>Work Experience</div>
        <div>
          {events.map(({ _id, title, image, startDate, endDate, body }) => (
     
            <div key={_id} className='relative flex items-center pb-5 gap-2'>
              <div className='relative'>
                <Image
                  src={urlFor(image).width(100).height(100).url()}
                  alt={title}
                  width={50}
                  height={50}
                  className='rounded-full border border-[#DBDAD6] relative z-10'
                />
              </div>
              <div>
                <p className='font-mono text-base text-[#464644]'>{title}</p>
                <p className='text-sm'>
                  {format(new Date(startDate), 'MMM yyyy')} -{' '}
                  {endDate ? format(new Date(endDate), 'MMM yyyy') : 'Present'}
                </p>
              </div>
              <p className='text-xxs'>{body}</p>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default ExperiencePage;
