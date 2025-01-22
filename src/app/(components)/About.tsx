'use client';
import React from 'react';
import { motion } from 'framer-motion';

function About() {
  const [displayText, setDisplayText] = React.useState('hello');

  const handleText = () => {
    setDisplayText('hello');
  };

  const handleText2 = () => {
    setDisplayText('world');
  };

  return (
    <div className='flex flex-col gap-1 h-40'>
      <p className='text-1xl text-[#464644] font-medium'>Who am I?</p>
      {displayText === 'hello' ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          className='sm:text-xs 2xl:text-lg text-[#727270] '
        >
          Experienced technical writer with a strong web and mobile development
          background. A polyglot skilled in simplifying complex concepts and
          creating quality content and documentation tailored to diverse
          technical audiences. Adept at bridging the gap between technical teams
          and end-users to ensure seamless understanding and adoption of
          products.
        </motion.p>
      ) : displayText === 'world' ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          className='sm:text-xs 2xl:text-lg text-[#727270]'
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque,
          recusandae ipsum tempora sequi exercitationem veniam consequuntur.
          Deleniti, reprehenderit qui. Doloribus pariatur asperiores aliquam
          illo fugit molestiae unde atque consectetur fuga!
        </motion.p>
      ) : (
        ''
      )}
      <div className='flex gap-1  font-medium bg-[#DBDAD6] mt-3 p-1 justify-between rounded-3xl items-center w-fit'>
        <p
          className='hover:text-[#FFFFFF] hover:bg-[#464644] px-2 py-1 rounded-3xl cursor-pointer text-xs'
          onClick={handleText}
        >
          Technical Writers
        </p>
        <p
          className='hover:text-[#FFFFFF] hover:bg-[#464644] px-2 py-1 rounded-3xl cursor-pointer text-xs'
          onClick={handleText2}
        >
          Software Developers
        </p>
      </div>
    </div>
  );
}

export default About;
