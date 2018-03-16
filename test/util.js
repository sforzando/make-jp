const globals = require('./globals.json');

module.exports = {
  pc: {
    name: 'Chrome Mac',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
    viewport: {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      isLandscape: false
    }
  },
  target: path => {
    switch (process.env.mode) {
      case 'production':
        return globals.PRODUCTION_URL + '/' + path;
      default:
        return globals.STAGING_URL + '/' + path;
    }
  },
  getRandomInt: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  getRandomNumber: digit => {
    let result = '';
    const number = '0123456789';
    for (var i = 0; i < digit; i++) {
      result += number[Math.floor(Math.random() * number.length)];
    }
    return result;
  },
  getRandomAlphanumerics: digit => {
    let result = '';
    const alphanumeric =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (var i = 0; i < digit; i++) {
      result += alphanumeric[Math.floor(Math.random() * alphanumeric.length)];
    }
    return result;
  },
  getRandomItemFromArray: array => {
    return array[Math.floor(Math.random() * array.length)];
  }
};
