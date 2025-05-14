import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
// import Project1 from '/public/assets/projects/Project1.jpeg';
// import Project2 from '/public/assets/projects/retroUI.jpeg';
// import Project3 from '/public/assets/projects/vsCode.jpg';
import '../custom.css';
import { sanityFetch } from '@/sanity/live';
import { client } from '@/sanity/client'; //
import imageUrlBuilder from '@sanity/image-url';
import { PROJECT_QUERY } from '@/sanity/queries';

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

async function Projects() {
  const { data: projects } = await sanityFetch({
    query: PROJECT_QUERY,
  });
  if (!projects) {
    return <div>Loading...</div>;
  }
  return (
    <div className='card-container'>
      {projects.map(({ _id, image }) => (
        <Link key={_id} href='/pages/Projects'>
          <Image
            height={78}
            width={100}
            src={urlFor(image).width(300).height(300).url()}
            alt='openzepelin'
            className='image-view'
          />
        </Link>
      ))}
    </div>
  );
}

export default Projects;
