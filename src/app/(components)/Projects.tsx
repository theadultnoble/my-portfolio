import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Project1 from '/public/assets/projects/Project1.jpeg';
import Project2 from '/public/assets/projects/retroUI.jpeg';
import '../custom.css';


export default function Projects() {
  return (
    <Link href={'/Projects'}>
      <div className='card-container'>
        <Image
          src={Project1}
          alt='openzepelin'
          className="image-view"
        />
        <Image src={Project2} alt='openzepelin' className='image-view' />
      </div>
    </Link>
  );
}
