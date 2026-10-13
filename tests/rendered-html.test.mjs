import assert from 'node:assert/strict';
import test from 'node:test';
import { default as worker } from '../dist/server/index.js';
const pages = [
 ['/', 'EthosQuest', 'hardest decisions alone'],
 ['/approach', 'The Methodology | EthosQuest', 'Not Performance.'],
 ['/for-leaders', 'For Leaders | EthosQuest', 'of Highest Leverage'],
 ['/coaches', 'Our Coaches | EthosQuest', 'Experience.'],
 ['/team', 'Our Team | EthosQuest', 'behind the work.'],
 ['/coaches/severine-jourdain', 'Séverine Jourdain | EthosQuest', 'Séverine Jourdain'],
 ['/coaches/andrea-milwidsky', 'Andrea Milwidsky | EthosQuest', 'Andrea Milwidsky'],
 ['/coaches/bassel-hamwi', 'Bassel Hamwi | EthosQuest', 'Bassel Hamwi'],
 ['/coaches/nikolaus-weil', 'Nikolaus Weil | EthosQuest', 'Nikolaus Weil'],
 ['/about', 'About | EthosQuest', 'Why EthosQuest'],
 ['/who-we-serve/founder-ceos', 'Founders and CEOs | EthosQuest', 'Growth Without Losing Yourself'],
 ['/who-we-serve/private-equity-ceos', 'Private Equity-Backed CEOs | EthosQuest', 'Leading Against the Clock'],
 ['/who-we-serve/family-enterprise-leaders', 'Family Enterprise Leaders | EthosQuest', 'Whose Life Are You Living?'],
 ['/who-we-serve/entrepreneurs-and-investors', 'Entrepreneurs &amp; Investors | EthosQuest', 'What Comes Next'],
 ['/who-we-serve/public-company-executives', 'Public Company CEOs | EthosQuest', 'Judgment in Public'],
 ['/faq', 'FAQ | EthosQuest', 'Common Questions'],
 ['/private-inquiry', 'Private Inquiry | EthosQuest', 'Request a Discovery Call'],
 ['/privacy', 'Privacy Policy | EthosQuest', 'Privacy Policy'],
];
for (const [path, title, headline] of pages) {
 test('renders ' + path + ' with its page content and working navigation', async () => {
  const response = await worker.fetch(new Request('http://localhost' + path), { ASSETS: { fetch: async () => new Response('', { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.ok(html.includes('<title>' + title + '</title>'));
  assert.ok(html.includes(headline));
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
  assert.ok(html.includes('href="/private-inquiry"'));
  assert.ok(html.includes('href="/privacy"'));
  assert.ok(!html.includes('codex-preview'));
  assert.ok(html.includes('href="/coaches"'));
  if (path.startsWith('/coaches/')) {
   assert.ok(html.includes('property="og:image"'));
   assert.ok(html.includes('/media/coaches/' + path.split('/').pop() + '.jpg'));
   assert.ok(html.includes('Credentials &amp; Experience'));
  }
  if (path === '/') for (const page of pages.filter(([p]) => p.startsWith('/who-we-serve/'))) assert.ok(html.includes('href="' + page[0] + '"'));
  if (path.startsWith('/who-we-serve/')) assert.ok(html.includes('"@type":"FAQPage"'));
  if (path === '/faq')assert.equal((html.match(/aria-expanded="false"/g) || []).length, 12);
  if (path === '/private-inquiry') {
   for (const field of ['first-name','last-name','current-role','email']) assert.ok(html.includes('name="' + field + '"'));
   assert.ok(html.includes('type="email"'));
  }
 });
}
