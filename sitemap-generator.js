const fs = require('fs/promises');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const BASE_URL = 'https://www.theupskillclub.com';
const REQUEST_DELAY = 600;

const routes = [
  { path: '/', lastmod: '2024-11-01' },
  { path: '/about', lastmod: '2024-11-01' },
  { path: '/privacy-policy', lastmod: '2024-11-01' },
  { path: '/terms-of-service', lastmod: '2024-11-01' },
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchCourses = async () => {
  await delay(REQUEST_DELAY);
  const response = await fetch('https://sourabhjaz.pythonanywhere.com/api/course');
  return response.json();
};

const fetchSessions = async () => {
  await delay(REQUEST_DELAY);
  const response = await fetch('https://sourabhjaz.pythonanywhere.com/api/session');
  return response.json();
};

const fetchAuthors = async () => {
  await delay(REQUEST_DELAY);
  const response = await fetch('https://sourabhjaz.pythonanywhere.com/api/author');
  return response.json();
};

const generateSitemap = async () => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  routes.forEach(route => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${BASE_URL}${route.path}</loc>\n`;
    sitemap += `    <lastmod>${route.lastmod}</lastmod>\n`;
    sitemap += `  </url>\n`;
  });

  const { results: courses } = await fetchCourses();
  courses.forEach(course => {
    const lastmod = course.created_at ?? '2024-10-30';
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${BASE_URL}/course?courseId=${course.id}</loc>\n`;
    sitemap += `    <lastmod>${lastmod}</lastmod>\n`;
    sitemap += `  </url>\n`;
  });

  const { results: sessions } = await fetchSessions();
  sessions.forEach(session => {
    const lastmod = session.created_at ?? '2024-10-30';
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${BASE_URL}/session?sessionId=${session.id}</loc>\n`;
    sitemap += `    <lastmod>${lastmod}</lastmod>\n`;
    sitemap += `  </url>\n`;
  });

  const { results: authors } = await fetchAuthors();
  authors.forEach(author => {
    const lastmod = author.created_at ?? '2024-10-30';
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${BASE_URL}/author?authorId=${author.id}</loc>\n`;
    sitemap += `    <lastmod>${lastmod}</lastmod>\n`;
    sitemap += `  </url>\n`;
  });

  sitemap += `</urlset>`;

  await fs.writeFile(path.resolve('./public/sitemap.xml'), sitemap);
};

generateSitemap();

