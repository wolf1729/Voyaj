export default function sitemap() {
  return [
    {
      url: 'https://voyaj.xyz',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Future routes like /destinations, /pricing, etc. would go here
  ]
}
