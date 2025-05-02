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

  return (
    <div className='flex p-10 h-svh w-screen overflow-y-auto scrollbar-hide'>
      {/* Back Button */}
      <Link href='/'>
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

      <div className='flex flex-col border-neutral-950 gap-5 w-[65vh] absolute left-14 top-80'>
        <div className='text-lg font-'>Work Experience</div>
        <div className='relative flex flex-col gap-2'>
          {events.map(({ _id, title, image, startDate, endDate, body }) => {
            // Debug log
            console.log('Body structure:', JSON.stringify(body, null, 2));

            return (
              <div key={_id} className='relative flex items-center pb-5 gap-2'>
                <div className='relative mr-3 ml-3 h-[45px] w-[45px] flex-shrink-0'>
                  <Image
                    src={urlFor(image).width(400).height(400).url()}
                    alt={title}
                    fill
                    className='rounded-full border-2 border-[#DBDAD6]  object-cover'
                    sizes='60px'
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <p className='font-mono text-xl text-[#464644]'>{title}</p>
                  <p className='text-sm text-[#727270]'>
                    {format(new Date(startDate), 'MMM yyyy')} -{' '}
                    {endDate
                      ? format(new Date(endDate), 'MMM yyyy')
                      : 'Present'}
                  </p>
                  <div className='text-xf text-[#727270]'>
                    {typeof body === 'string'
                      ? body
                      : Array.isArray(body)
                        ? body[0]?.children?.[0]?.text || ''
                        : ''}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className='flex flex-col h-[40vh] border border-[#DBDAD6] bg-[#f7f6f4] rounded-t-lg gap-5 w-[65vh] fixed bottom-0 right-14'></div>
    </div>
  );
}

export default ExperiencePage;
