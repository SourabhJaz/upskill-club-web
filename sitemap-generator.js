const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.theupskillclub.com';

const routes = [
  { path: '/', lastmod: '2024-10-30' },
  { path: '/about', lastmod: '2024-10-30' },
  { path: '/privacy-policy', lastmod: '2024-10-30' },
  { path: '/terms-of-service', lastmod: '2024-10-30' },
];

const generateSitemap = () => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  routes.forEach(route => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${BASE_URL}${route.path}</loc>\n`;
    sitemap += `    <lastmod>${route.lastmod}</lastmod>\n`;
    sitemap += `  </url>\n`;
  });

  sitemap += `</urlset>`;

  fs.writeFileSync(path.resolve('./public/sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully.');
};

generateSitemap();
