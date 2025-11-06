export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio'],
    },
    sitemap: 'https://modakstorytime.com/sitemap.xml',
  };
}


