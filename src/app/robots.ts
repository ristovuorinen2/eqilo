import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://eqilo.fi';

  return {
    rules: [
      {
        // General search engines
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
      {
        // Explicitly welcome major AI crawlers to ensure indexing
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'anthropic-ai', 'PerplexityBot', 'Google-Extended'],
        allow: [
          '/',
          '/product/',
          '/category/',
          '/services/',
          '/api/llm-feed', // Expose your dedicated AI feed
        ],
        // Prevent them from hallucinating on dynamic cart/checkout states
        disallow: ['/admin/', '/cart/', '/checkout/', '/*?*category='],
        // Crawl delay helps prevent server spikes if an AI bot goes rogue
        crawlDelay: 2, 
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
