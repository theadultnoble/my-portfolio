'use client';
import React from 'react';
import { motion } from 'framer-motion';

function About() {
  return (
    <div className='flex flex-col gap-1'>
      <p className='text-1xl text-[#464644] font-medium'>Who am I?</p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        className='sm:text-xs 2xl:text-lg text-[#727270]'
      >
        Experienced technical writer with a strong web and mobile development
        background. A polyglot skilled in simplifying complex concepts and
        creating quality content and documentation tailored to diverse technical
        audiences. Adept at bridging the gap between technical teams and
        end-users to ensure seamless understanding and adoption of products.
      </motion.p>
    </div>
  );
}

export default About;
