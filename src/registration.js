/**
 * Scripts and styles for /registration
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
    return this.each(function() {
      $(this).append(
        '<span class="required-mark red-text"><i class="material-icons">star</i></span>'
      );
    });
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
  console.log('REGISTRATION');

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
      _108_email: {
        email: true,
        not_mobile_address: true
      },
      _109_email_confirm: {
        equalTo: '#_108_email'
      },
      _110_primary_phone: {
        mobile: true
      },
      // _111_zip: {
      //   zipcode: true
      // },
      _114_maker_bio: {
        maxlength: 200
      },
      _115_class: 'required',
      _201_project_name: {
        maxlength: 30
      },
      _202_project_english_name: {
        maxlength: 100
      },
      _203_project_describe: {
        maxlength: 200
      },
      _205_category1: 'required',
      _205_category2: 'required',
      _301_space: 'required',
      _302_table: 'required',
      _303_chair: 'required',
      _304_sound: 'required',
      _306_handson_title: {
        required: {
          depends: () => {
            return $('#_305_handson').is(':checked');
          }
        },
        maxlength: 20
      },
      _307_handson_describe: {
        required: {
          depends: () => {
            return $('#_305_handson').is(':checked');
          }
        },
        maxlength: 100
      },
      _308_handson_charge: {
        required: {
          depends: () => {
            return $('#_305_handson').is(':checked');
          }
        }
      },
      _402_presentation_title: {
        required: {
          depends: () => {
            return $('#_401_presentation').is(':checked');
          }
        },
        maxlength: 20
      },
      _403_presentation_describe: {
        required: {
          depends: () => {
            return $('#_401_presentation').is(':checked');
          }
        },
        maxlength: 200
      },
      _405_workshop_title: {
        required: {
          depends: () => {
            return $('#_404_workshop').is(':checked');
          }
        },
        maxlength: 20
      },
      _406_workshop_describe: {
        required: {
          depends: () => {
            return $('#_404_workshop').is(':checked');
          }
        },
        maxlength: 200
      },
      _407_workshop_times: {
        required: {
          depends: () => {
            return $('#_404_workshop').is(':checked');
          }
        }
      },
      _408_workshop_time: {
        required: {
          depends: () => {
            return $('#_404_workshop').is(':checked');
          }
        }
      },
      _409_workshop_attendees: {
        required: {
          depends: () => {
            return $('#_404_workshop').is(':checked');
          }
        }
      },
      _410_workshop_charge: {
        required: {
          depends: () => {
            return $('#_404_workshop').is(':checked');
          }
        }
      },
      _411_workshop_registration: {
        required: {
          depends: () => {
            return $('#_404_workshop').is(':checked');
          }
        }
      },
      _413_live_title: {
        required: {
          depends: () => {
            return $('#_412_live').is(':checked');
          }
        },
        maxlength: 20
      },
      _414_live_describe: {
        required: {
          depends: () => {
            return $('#_412_live').is(':checked');
          }
        },
        maxlength: 200
      },
      _501_comment: {
        maxlength: 200
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

  $(':input[name^="_115_class"]').on('change', event => {
    if ($('#_115_class_company').is(':checked')) {
      $('#_301_space_4200x4200').setDisabled();
    } else {
      $('#_301_space_4200x4200').setUndisabled();
    }
    form.validate().element(event.currentTarget);
  });

  $(':input[name^="_301_space"]').on('change', () => {
    $('#_302_table_0').setChecked();
    if ($('#_301_space_2100x2100').is(':checked')) {
      $('#_302_table_2').setDisabled();
      $('#_302_table_3').setDisabled();
      $('#_302_table_4').setDisabled();
    } else if ($('#_301_space_2100x4200').is(':checked')) {
      $('#_302_table_2').setUndisabled();
      $('#_302_table_3').setDisabled();
      $('#_302_table_4').setDisabled();
    } else if ($('#_301_space_4200x4200').is(':checked')) {
      $('#_302_table_2').setUndisabled();
      $('#_302_table_3').setUndisabled();
      $('#_302_table_4').setUndisabled();
    }
  });

  $('#_305_handson').on('change', () => {
    if ($('#_305_handson').is(':checked')) {
      $('#label_306_handson_title').setRequiredMark();
      $('#label_307_handson_describe').setRequiredMark();
      $('#label_308_handson_charge').setRequiredMark();
    } else {
      $('#label_306_handson_title').unsetRequiredMark();
      $('#label_307_handson_describe').unsetRequiredMark();
      $('#label_308_handson_charge').unsetRequiredMark();
    }
  });
  $('#_401_presentation').on('change', () => {
    if ($('#_401_presentation').is(':checked')) {
      $('#label_402_presentation_title').setRequiredMark();
      $('#label_403_presentation_describe').setRequiredMark();
    } else {
      $('#label_402_presentation_title').unsetRequiredMark();
      $('#label_403_presentation_describe').unsetRequiredMark();
    }
  });
  $('#_404_workshop').on('change', () => {
    if ($('#_404_workshop').is(':checked')) {
      $('#label_405_workshop_title').setRequiredMark();
      $('#label_406_workshop_describe').setRequiredMark();
      $('#label_407_workshop_times').setRequiredMark();
      $('#label_408_workshop_time').setRequiredMark();
      $('#label_409_workshop_attendees').setRequiredMark();
      $('#label_410_workshop_charge').setRequiredMark();
      $('#label_411_workshop_registration').setRequiredMark();
    } else {
      $('#label_405_workshop_title').unsetRequiredMark();
      $('#label_406_workshop_describe').unsetRequiredMark();
      $('#label_407_workshop_times').unsetRequiredMark();
      $('#label_408_workshop_time').unsetRequiredMark();
      $('#label_409_workshop_attendees').unsetRequiredMark();
      $('#label_410_workshop_charge').unsetRequiredMark();
      $('#label_411_workshop_registration').unsetRequiredMark();
    }
  });
  $('#_412_live').on('change', () => {
    if ($('#_412_live').is(':checked')) {
      $('#label_413_live_title').setRequiredMark();
      $('#label_414_live_describe').setRequiredMark();
    } else {
      $('#label_413_live_title').unsetRequiredMark();
      $('#label_414_live_describe').unsetRequiredMark();
    }
  });

  $('.toc-wrapper').pushpin({
    offset: $('nav').height()
    // offset: $('.toc-wrapper').offset().top,
    // bottom: $('footer').offset().top
  });
  $('.scrollspy').scrollSpy();
  $('.materialboxed').materialbox(); // for Media
  $('select').material_select(); // for input-select
  $('input, textarea').characterCounter();
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
