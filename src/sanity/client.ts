import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: 'ajvyyuzz',
  dataset: 'portfolio_production',
  apiVersion: '2024-01-01',
  useCdn: false,
});
