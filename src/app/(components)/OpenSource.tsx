import React from 'react';
import { sanityFetch } from '@/sanity/live';
import ClientOpenSource from './ClientOpenSource';
import { OPEN_SOURCE_QUERY } from '@/sanity/queries';

const OpenSource = async () => {
  const { data: openSource } = await sanityFetch({
    query: OPEN_SOURCE_QUERY,
  });

  if (!openSource) {
    return <div>Loading...</div>;
  }
  return <ClientOpenSource openSource={openSource} />;
};

export default OpenSource;
