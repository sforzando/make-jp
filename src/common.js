import 'materialize-css';
import './common.scss';

$(document).ready(() => {
  console.log('BASE');

  /**
   * Regular Expressions for UserAgent
   * @type {Object}
   */
  let ua = {
    Android: () => {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: () => {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: () => {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    OperaMini: () => {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    WindowsMobile: () => {
      return navigator.userAgent.match(/IEMobile/i);
    },
    isSmartphone: () => {
      return (
        ua.Android() ||
        ua.BlackBerry() ||
        ua.iOS() ||
        ua.OperaMini() ||
        ua.WindowsMobile()
      );
    }
  };
  /**
   * Refuse Smartphone's UserAgent
   */
  if (ua.isSmartphone()) {
    alert('携帯電話、スマートフォンからは入力いただけません。');
    history.back(-1);
    return false;
  }
});
