import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://eqilo.fi';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/cart/',
        '/checkout/',
        '/api/',
        '/*?*category=', // Avoid indexing filtered shop views
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
