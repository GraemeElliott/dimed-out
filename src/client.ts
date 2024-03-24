import { createClient, SanityClient } from '@sanity/client';

export const sanityClient: SanityClient = createClient({
  projectId: '4m3hd9h1',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-03-23',
});
