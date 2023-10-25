import * as puppeteer from 'puppeteer';

let browser: puppeteer.Browser;
let page: puppeteer.Page;

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: 'new' });
});

afterAll(async () => {
  await browser.close();
});

describe('HTML Page', () => {
  it('renders the HTML content correctly', async () => {
    page = await browser.newPage();
    page.on('error', (err) => {
      console.error('Page error:', err);
    });

    await page.goto(`file://${__dirname}/../src/views/index.html`);

    const title = await page.$eval('h1', (element) => element.textContent);
    const paragraph = await page.$eval('p', (element) => element.textContent);

    expect(title).toBe('Locus App');
    expect(paragraph).toContain('This project includes a single secure GET request endpoint');
  }, 10000);
});