const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('https://make-jp.appspot.com/registration');
  await page.screenshot({ path: 'test/registration.png' });

  await browser.close();
})();
