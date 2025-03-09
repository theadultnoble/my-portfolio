import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import data from '../../data/blogposts.json';

const BlogPosts = () => {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, text.lastIndexOf(' ', maxLength)) + '...';
  };

  return (
    <div className='pr-2'>
      <div className='flex flex-col divide-y divide-[#DBDAD6]'>
        {data.map((item) => {
          return (
            <div key={item.id} className='flex gap-2 py-2'>
              <Link href={item.url} target='_blank'>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={70}
                  height={90}
                  className='rounded-md flex-shrink-0'
                />
              </Link>
              <div className='flex flex-col'>
                <Link
                  href={item.url}
                  target='_blank'
                  className='text-[#464644] font-medium text-md'
                >
                  {truncateText(item.title, 25)}
                </Link>
                <Link href={item.url} target='_blank' className='text-[#727270] text-xs'>
                  {truncateText(item.description, 25)}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogPosts;
