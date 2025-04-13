import { defineQuery } from 'next-sanity';

export const EXPERIENCE_QUERY = defineQuery(
  `*[_type == "experience" && defined(slug.current)]{_id, title, slug, image, startDate, endDate}`
);

export const BLOG_QUERY = defineQuery(
  `*[_type == "blogPost"]{_id, title, image, body, URL}`
);

export const PROJECT_QUERY = defineQuery(
  `*[_type == "project" && defined(slug.current)]{_id, title, slug, image, body, URL}`
);

export const LEARNING_QUERY = defineQuery(
  `*[_type == "learning"]{_id, title, image}`
);

export const OPEN_SOURCE_QUERY = defineQuery(
  `*[_type == "opensource" && defined(slug.current)]{_id, title, slug, image, body, URL}`
);
