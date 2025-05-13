import React from 'react';
import ClientSideBlog from './ClientSideBlog';
import { BLOG_QUERY } from '@/sanity/queries';
import { sanityFetch } from '@/sanity/live';

async function BlogPosts() {
  const { data: blogPosts } = await sanityFetch({
    query: BLOG_QUERY,
  });
  if (!blogPosts) {
    return <div>Loading...</div>;
  }

  return <ClientSideBlog blogPosts={blogPosts} />;
}

export default BlogPosts;
