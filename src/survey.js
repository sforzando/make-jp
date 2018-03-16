/**
 * Scripts and styles for /survey
 */

import 'hammerjs';
import 'materialize-css';
import 'jquery-validation';
import toastr from 'toastr';

$.fn.extend({
  // Memo: Allow function's 'this' doesn't suit to jQuery.

  setRequired: function() {
    return this.each(function() {
      $(this).prop('required', true);
    });
  },
  unsetRequired: function() {
    return this.each(function() {
      $(this).prop('required', false);
    });
  },
  setRequiredMark: function() {
    if (!this.children().hasClass('required-mark')) {
      return this.each(function() {
        $(this).append(
          '<span class="required-mark red-text"><i class="material-icons">star</i></span>'
        );
      });
    }
  },
  unsetRequiredMark: function() {
    return this.each(function() {
      $(this)
        .children('.required-mark')
        .remove();
    });
  },
  setDisabled: function() {
    return this.each(function() {
      $(this).prop('disabled', true);
    });
  },
  setUndisabled: function() {
    return this.each(function() {
      $(this).prop('disabled', false);
    });
  },
  setChecked: function() {
    return this.each(function() {
      $(this).prop('checked', true);
    });
  }
});

/**
 * jquery-validation's messages
 * @type {String}
 */
$.extend($.validator.messages, {
  required: 'このフィールドは必須です。',
  remote: 'このフィールドを修正してください。',
  email: '有効なEメールアドレスを入力してください。',
  url: '有効なURLを入力してください。',
  date: '有効な日付を入力してください。',
  dateISO: '有効な日付（ISO）を入力してください。',
  number: '有効な数字を入力してください。',
  digits: '数字のみを入力してください。',
  creditcard: '有効なクレジットカード番号を入力してください。',
  equalTo: '同じ値をもう一度入力してください。',
  extension: '有効な拡張子を含む値を入力してください。',
  maxlength: $.validator.format('{0} 文字以内で入力してください。'),
  minlength: $.validator.format('{0} 文字以上で入力してください。'),
  rangelength: $.validator.format(
    '{0} 文字から {1} 文字までの値を入力してください。'
  ),
  range: $.validator.format('{0} から {1} までの値を入力してください。'),
  max: $.validator.format('{0} 以下の値を入力してください。'),
  min: $.validator.format('{0} 以上の値を入力してください。')
});

/**
 * jquery-validation's extra methods
 */
$.validator.addMethod(
  'alphanumeric',
  function(value, element) {
    return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
  },
  '半角英数字を入力してください。'
);
$.validator.addMethod(
  'hiragana',
  function(value, element) {
    return this.optional(element) || /^([あ-ん]+)$/.test(value);
  },
  '全角ひらがなを入力してください。'
);
$.validator.addMethod(
  'hiranum',
  function(value, element) {
    return this.optional(element) || /^([あ-ん0-9]+)$/.test(value);
  },
  '半角数字か全角ひらがなを入力してください。'
);
$.validator.addMethod(
  'zipcode',
  function(value, element) {
    return this.optional(element) || /^\d{3}-\d{4}$/.test(value);
  },
  '郵便番号を「000-0000」の形式で入力してください。'
);
$.validator.addMethod(
  'mobile',
  function(value, element) {
    return this.optional(element) || /^0\d0-\d{4}-\d{4}$/.test(value);
  },
  '携帯電話番号を「000-0000-0000」の形式で入力してください。'
);
$.validator.addMethod(
  'not_mobile_address',
  function(value, element) {
    return (
      this.optional(element) ||
      !/@(docomo|ezweb|softbank|ymobile|vodafone|willcom|pdx|disney)/.test(
        value
      )
    );
  },
  '有効なEメールアドレスを入力してください。携帯メールアドレスはご使用になれません。'
);
$.validator.addMethod(
  'makers_id',
  function(value, element) {
    return this.optional(element) || /^M\d{4}$/.test(value);
  },
  '有効なIDを入力してください。'
);

$(document).ready(() => {
  console.log('SURVEY');

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

  let form = $('#form');
  /**
   * [validation description]
   * @type {[type]}
   */
  let validation = form.validate({
    // debug: true, // If it's true, the form is not submitted.
    ignore: '*:not([name])',
    rules: {
      _101_makers_id: {
        makers_id: true
      },
      _105_email: {
        email: true,
        not_mobile_address: true
      },
      _202_dangerous: {
        required: true
      },
      '_301_loading[]': {
        required: true
      },
      '_302_loading_day[]': {
        required: true
      },
      '_303_unloading[]': {
        required: true
      },
      _304a_car_type: {
        required: () => {
          return (
            $('#_301_loading_car').is(':checked') ||
            $('#_303_unloading_car').is(':checked')
          );
        }
      },
      _304b_car_number: {
        required: () => {
          return (
            $('#_301_loading_car').is(':checked') ||
            $('#_303_unloading_car').is(':checked')
          );
        }
      },
      _304c_car_driver: {
        required: () => {
          return (
            $('#_301_loading_car').is(':checked') ||
            $('#_303_unloading_car').is(':checked')
          );
        }
      },
      _304d_car_telephone: {
        mobile: true,
        required: () => {
          return (
            $('#_301_loading_car').is(':checked') ||
            $('#_303_unloading_car').is(':checked')
          );
        }
      }
    },
    messages: {},
    errorElement: 'div',
    errorPlacement: (err, element) => {
      let e = $(element).data('error');
      if (e) {
        $(e).append(err);
      } else {
        err.insertAfter(element);
      }
    }
  });

  $('#_301_loading_car').on('change', () => {
    if (
      $('#_301_loading_car').is(':checked') ||
      $('#_303_unloading_car').is(':checked')
    ) {
      $('.label_car').setRequiredMark();
    } else {
      $('.label_car').unsetRequiredMark();
    }
  });
  $('#_303_unloading_car').on('change', () => {
    if (
      $('#_301_loading_car').is(':checked') ||
      $('#_303_unloading_car').is(':checked')
    ) {
      $('.label_car').setRequiredMark();
    } else {
      $('.label_car').unsetRequiredMark();
    }
  });

  $('#submit-modal').modal({
    opacity: 0.3,
    ready: () => {
      $('body').css({
        overflow: '',
        width: ''
      });
    }
  });

  $('#pre-submit-button').click(() => {
    console.log('#pre-submit-button was clicked!');

    if (form.valid()) {
      $('#submit-modal').modal('open');
    } else {
      console.log('validation error!');
      toastr.error(
        validation.numberOfInvalids() +
          'ヶ所の入力が完了していません。赤文字でメッセージが表示されている項目をご確認ください',
        'Validation Error!',
        {
          positionClass: 'toast-top-full-width',
          timeOut: 5000
        }
      );
      $('html,body').animate(
        {
          scrollTop: form.offset().top
        },
        'slow'
      );
    }
  });
  $('#submit-button').click(() => {
    console.log('#submit-button was clicked!');
    $('#submit-progress').show();
    form.submit();
  });
});
