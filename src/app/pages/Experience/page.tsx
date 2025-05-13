import React from 'react';
import { EXPERIENCE_QUERY, SKILLS_QUERY } from '@/sanity/queries';
import ClientExperience from './ClientExperience';
import { sanityFetch } from '@/sanity/live';

async function ExperiencePage() {
  const { data: events } = await sanityFetch({
    query: EXPERIENCE_QUERY,
  });

  const { data: skills } = await sanityFetch({
    query: SKILLS_QUERY,
  });

  return (
    <ClientExperience events={events} skills={skills}/>
  );
}

export default ExperiencePage;
