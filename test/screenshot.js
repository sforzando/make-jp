const util = require('./util.js');
const assert = require('assert');
const puppeteer = require('puppeteer');

describe('Puppeteer', function() {
  this.timeout(10000);

  it('should take screenshot of /registration', async () => {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: util.isProduction
    });
    const page = await browser.newPage();
    await page.emulate(util.pc);
    await page.goto(util.target('registration'), {
      waitUntil: 'networkidle2'
    });
    await page.screenshot({
      path: 'test/registration.png',
      fullPage: true
    });
    await browser.close();
  });

  it('should take screenshot of /survey', async () => {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: util.isProduction
    });
    const page = await browser.newPage();
    await page.emulate(util.pc);
    await page.goto(util.target('survey'), {
      waitUntil: 'networkidle2'
    });
    await page.screenshot({
      path: 'test/survey.png',
      fullPage: true
    });
    await browser.close();
  });
});
