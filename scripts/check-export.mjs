import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'smol-toml';

const root = path.resolve('out');
const base = (process.env.BASE_PATH || '').replace(/\/$/, '');
const config = parse(fs.readFileSync('content/config.toml', 'utf8'));
const chinese = parse(fs.readFileSync('content_zh/config.toml', 'utf8'));
assert.deepEqual(config.navigation.map(n => n.target), chinese.navigation.map(n => n.target), 'Locale routes must agree');
assert.equal(config.i18n.default_locale, 'en');
const remnants = /Jiale Liu|University of Example|john\.doe@example|Prof\. Advisor|prestigious journal|example\.com/;
let checked = 0;
for (const item of config.navigation) {
  const route = item.href.replace(/^\/+|\/+$/g, '');
  const file = path.join(root, route, 'index.html');
  assert.ok(fs.existsSync(file), `Missing route: ${item.href}`);
  const html = fs.readFileSync(file, 'utf8');
  assert.match(html, /<h1[ >]/, `Missing h1: ${item.href}`);
  assert.match(html, /<main[ >]/, `Missing main: ${item.href}`);
  assert.ok(!remnants.test(html), `Template residue: ${item.href}`);
  for (const [, value] of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    if (!value.startsWith('/') || value.startsWith('//')) continue;
    const url = new URL(value.replaceAll('&amp;', '&'), 'https://local.invalid');
    let pathname = decodeURIComponent(url.pathname);
    if (base) {
      assert.ok(pathname === base || pathname.startsWith(`${base}/`), `Unprefixed asset/link: ${pathname}`);
      pathname = pathname.slice(base.length);
    }
    const target = path.join(root, pathname);
    assert.ok(fs.existsSync(target), `Missing asset/link: ${value} on ${item.href}`);
    checked++;
  }
  if (item.target === 'cv') {
    const cv = parse(fs.readFileSync('content/cv.toml', 'utf8'));
    const available = typeof cv.download === 'string' && fs.existsSync(path.resolve('public', `.${cv.download}`));
    if (!available) assert.ok(!/<a[^>]+download/.test(html), 'Missing CV must not render a download button');
  }
  if (!config.social.github) assert.ok(!html.includes('https://github.com/yangyun0125-create'), `Personal GitHub profile must stay hidden: ${item.href}`);
}
for (const directory of ['content', 'content_zh']) {
  for (const name of ['bio.md', 'overview.md', 'research.md', 'cv.md', 'contact.md', 'about.toml', 'news.toml']) {
    assert.ok(fs.readFileSync(path.join(directory, name), 'utf8').trim(), `Missing locale content: ${directory}/${name}`);
  }
}
for (const asset of ['favicon.svg', 'images/avatar-placeholder.svg', 'robots.txt', 'sitemap.xml']) assert.ok(fs.existsSync(path.join(root, asset)), `Missing ${asset}`);
const rawSite = (process.env.SITE_URL || config.site.url || '').replace(/\/$/, '');
const site = base && rawSite && !rawSite.endsWith(base) ? rawSite + base : rawSite;
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
for (const item of config.navigation) {
  const html = fs.readFileSync(path.join(root, item.href, 'index.html'), 'utf8');
  if (site) {
    const expected = `${site}${item.href === '/' ? '/' : `${item.href}/`}`;
    assert.ok(html.includes(`rel="canonical" href="${expected}"`), `Wrong canonical for ${item.href}`);
    assert.ok(sitemap.includes(`<loc>${expected}</loc>`), `Missing sitemap route ${item.href}`);
  } else {
    assert.ok(!html.includes('rel="canonical"'), 'No unconfirmed canonical URL');
  }
}
console.log(`Static export verified: ${config.navigation.length} routes, ${checked} local references, EN/ZH configuration, CV visibility, SEO and template residue (${base || 'root'}).`);
