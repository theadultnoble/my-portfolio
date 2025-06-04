import React from 'react';
import ClientProject from './ClientProject';
import { sanityFetch } from '@/sanity/live';
import { PROJECT_QUERY } from '@/sanity/queries';

async function page() {
   const { data: projects } = await sanityFetch({
      query: PROJECT_QUERY,
    });
    if (!projects) {
      return <div>Loading...</div>;
    }
  return(
  <ClientProject projects={projects}/>
  )
}

export default page;