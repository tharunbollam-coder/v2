export default function sitemap() {
  const base = 'https://modakstorytime.com';
  const now = new Date().toISOString();

  const staticRoutes = [
    '',
    '/stories',
    '/series',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ];

  return staticRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));
}


