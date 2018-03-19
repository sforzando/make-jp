const util = require('./util.js');
const assert = require('assert');
const puppeteer = require('puppeteer');

describe('Puppeteer', function() {
  this.timeout(10000);

  let browser;
  let page;
  beforeEach(async () => {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: util.isProduction
    });
    page = await browser.newPage();
    await page.emulate(util.pc);
  });

  afterEach(async done => {
    browser.close();
    done();
  });

  it('should take screenshot of /registration', async () => {
    await page.goto(util.target('registration'), {
      waitUntil: 'networkidle2'
    });
    await page.screenshot({
      path: 'test/registration.png',
      fullPage: true
    });
  });

  it('should take screenshot of /survey', async () => {
    await page.goto(util.target('survey'), {
      waitUntil: 'networkidle2'
    });
    await page.screenshot({
      path: 'test/survey.png',
      fullPage: true
    });
  });

  it('should take screenshot of /thanks', async () => {
    await page.goto(util.target('thanks'), {
      waitUntil: 'networkidle2'
    });
    await page.screenshot({
      path: 'test/thanks.png',
      fullPage: true
    });
  });
});
