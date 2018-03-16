const util = require('./util.js');

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.emulate(util.pc);
  await page.goto(util.target('registration'), {
    waitUntil: 'networkidle2'
  });
  await page.screenshot({ path: 'test/registration.png', fullPage: true });
  await browser.close();
})();
