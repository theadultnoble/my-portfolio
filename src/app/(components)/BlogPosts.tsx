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
    <div className='h-96 overflow-y-scroll mt-3 flex'>
      <div className='flex-1 flex-col gap-2'>
        {data.map((item) => {
          return (
            <div key={item.id} className='text-xs flex gap-1'>
              <Link href={item.url} target='_blank'>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={50}
                  height={70}
                  className='rounded-md flex-shrink-0'
                />
              </Link>
              <div className='flex flex-col gap-1'>
                <Link
                  href={item.url}
                  target='_blank'
                  className='font-bold text-md'
                >
                  {truncateText(item.title, 25)}
                </Link>
                <Link href={item.url} target='_blank'>
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
