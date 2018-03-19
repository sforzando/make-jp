const util = require('./util.js');
const assert = require('assert');
const puppeteer = require('puppeteer');

describe('Input dummy data w/ Puppeteer', function() {
  this.timeout(30000);

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

  it('should input dummy data to /registration', async () => {
    await page.goto(util.target('registration'), {
      waitUntil: 'networkidle2'
    });
    await page.type(
      'input#_101_makers_name',
      util.getRandomAlphanumerics(util.getRandomInt(10, 20))
    );
    await page.type(
      'input#_102_makers_name_phonetic',
      '合同会社スフォルツァンド'
    );
    await page.type('input#_103_makers_english_name', 'sforzando LLC.');
    await page.type('input#_104_primary_lastname', '鈴木');
    await page.type('input#_105_primary_firstname', '真一朗');
    await page.type('input#_106_primary_lastname_phonetic', 'すずき');
    await page.type('input#_107_primary_firstname_phonetic', 'しんいちろう');
    await page.type('input#_108_email', 'shin@sforzando.co.jp');
    await page.type('input#_109_email_confirm', 'shin@sforzando.co.jp');
    await page.type(
      'input#_110_primary_phone',
      util.getRandomItemFromArray(['070', '080', '090']) +
        '-' +
        util.getRandomNumber(4) +
        '-' +
        util.getRandomNumber(4)
    );
    await page.type('input#_111_zip', '160-0002');
    await page.select(
      'select#_112_prefectures',
      util.getRandomInt(1, 48).toString()
    );
    await page.type(
      'input#_113_address',
      '新宿区四谷坂町12番22号VORT四谷坂町 1F'
    );
    await page.type(
      'textarea#_114_maker_bio',
      'あらさじと　うちかへすらし　をやまだの　なはしろみづに　ぬれてつくるあ\u000dめもはるに　ゆきまもあをく　なりにけり　いまこそのべに　わかなつみてめ\u000dつくばやま　さけるさくらの　にほひをぞ　いりてをらねど　よそながらみつ\u000dちぐさにも　ほころぶはなの　しげきかな　いづらあをやぎ　ぬひしいとすぢ(空白込み140文字)'
    );
    await page.click(
      util.getRandomItemFromArray([
        'input#_115_class_maker',
        'input#_115_class_commercial_maker'
      ])
    );
    await page.select('select#_116_tags', util.getRandomInt(2, 15).toString());
    await page.type(
      'input#_201_project_name',
      util.getRandomAlphanumerics(util.getRandomInt(1, 30))
    );
    await page.type(
      'input#_202_project_english_name',
      util.getRandomAlphanumerics(util.getRandomInt(1, 100))
    );
    await page.type(
      'textarea#_203_project_describe',
      'make（メイク）は、プログラムのビルド作業を自動化するツール。\u000dコンパイル、リンク、インストール等のルールを記述したテキストファイル (makefile) に従って、これらの作業を自動的に行う。\u000d複雑に関連し合ったファイルの依存関係を解決するのがmakeの長所である。(133文字)'
    );
    await page.type('input#_204_web1', 'https://sforzando.co.jp/');
    await page.type('input#_204_web2', 'https://sforzando.co.jp/');
    await page.type(
      'input#_205_twitter',
      util.getRandomAlphanumerics(util.getRandomInt(8, 16))
    );
    await page.select('select#_206_category1', '11_kids');
    await page.select('select#_206_category2', '30_food');
    await page.type('input#_207_photo1', 'http://example.com/1.jpg');
    await page.type('input#_207_photo2', 'http://example.com/2.jpg');
    await page.type('input#_207_photo3', 'http://example.com/3.jpg');
    await page.type(
      'textarea#_208_equipments',
      '* 遠足のしおり\u000d* カバン\u000d* お弁当\u000d* 水筒\u000d* おやつ\u000d* バナナ\u000d* 水筒\u000d* ビニールシート\u000d* 雨具\u000d* 帽子\u000d* タオル\u000d* エチケット袋\u000d* 絆創膏'
    );
    await page.select('select#_209_watt', util.getRandomInt(0, 15).toString());
    await page.click('input#_301_space_type_space');
    await page.click(
      util.getRandomItemFromArray([
        'input#_302_table_1',
        'input#_302_table_2',
        'input#_302_table_3'
      ])
    );
    await page.click(
      util.getRandomItemFromArray([
        'input#_303_space_area_2100x2100',
        'input#_303_space_area_2100x4200',
        'input#_303_space_area_4200x4200'
      ])
    );
    await page.click(
      util.getRandomItemFromArray([
        'input#_303_space_table_0',
        'input#_303_space_table_1',
        'input#_303_space_table_2',
        'input#_303_space_table_3'
      ])
    );
    await page.click(
      util.getRandomItemFromArray([
        'input#_304_chair_1',
        'input#_304_chair_2',
        'input#_304_chair_3',
        'input#_304_chair_4'
      ])
    );
    await page.click('input#_305_handson');
    await page.type(
      'input#_306_handson_title',
      util.getRandomAlphanumerics(16)
    );
    await page.type(
      'textarea#_307_handson_describe',
      '色はにほへど　散りぬるを\u000d我が世たれぞ　常ならむ\u000d有為の奥山　今日越えて\u000d浅き夢見し　酔ひもせず(空白込み45文字)'
    );
    await page.type('input#_308_handson_charge', '無料');
    await page.click('input#_309_dark');
    await page.type(
      'textarea#_310_space_special_requests',
      '「Make」は、アメリカ発のテクノロジー系DIY工作専門雑誌として2005年に誕生しました。\u000d自宅の庭や地下室やガレージで、びっくりするようなものを作っている才能あふれる人たちのコミュニティが、どんどん大きくなっています。\u000d「Make」は、そうしたコミュニティ同士を結びつけ、刺激と情報と娯楽を与えることを目的としています。\u000d「Make」は、すべての人が思いのままに、あらゆるテクノロジーを遊び、いじくり、改造する権利を称賛します。\u000d「Make」の読者は、自分自身、環境、教育──私たちの世界全体をよりよいものにするための文化、コミュニティとして成長を続けています。\u000dそれは、雑誌の読者という枠を超え、全世界的なムーブメントになりました。\u000d私たちはそれを「Makerムーブメント」と呼んでいます。'
    );
    await page.type(
      'textarea#_311_space_collaborators',
      '・ 北島三郎\u000d・ 小林幸子'
    );
    await page.click('input#_401_presentation');
    await page.type(
      'input#_402_presentation_title',
      util.getRandomAlphanumerics(16)
    );
    await page.type(
      'textarea#_403_presentation_describe',
      'MAKEはロサンゼルスを中心に活動する男女音楽ユニットである。2007年zetimaよりデビュー。(49文字)'
    );
    await page.click('input#_404_workshop');
    await page.type(
      'input#_405_workshop_title',
      util.getRandomAlphanumerics(16)
    );
    await page.type(
      'textarea#_406_workshop_describe',
      'メイク(Makefu)は、ニウエの14の村のひとつである。2011年の調査では、人口は69人である。(49文字)'
    );
    await page.select(
      'select#_407_workshop_times',
      util.getRandomInt(1, 2).toString()
    );
    await page.select(
      'select#_408_workshop_time',
      util.getRandomItemFromArray(['50', '110'])
    );
    await page.select(
      'select#_409_workshop_attendees',
      util.getRandomInt(10, 15).toString()
    );
    await page.type('input#_410_workshop_charge', '時価');
    await page.type(
      'input#_411_workshop_registration',
      'ニウエ（Niue）は、南緯19度、西経169度にある国。ニュージーランドの北東、トンガの東、サモアの南東にある。'
    );
    await page.click('input#_412_live');
    await page.type('input#_413_live_title', util.getRandomAlphanumerics(16));
    await page.type(
      'textarea#_414_live_describe',
      '「メーキャップ」と同義の「メークアップ」の略の「メーク」と同義。つまり化粧のこと。ナチュラルメイク、ブロンズメイクなどメイクもいろいろ。俳優さんなどに対する濃い化粧について特に指すこともある。(96文字)'
    );
    await page.type(
      'textarea#_501_comment',
      'Master File Table（マスター ファイル テーブル）の略。\u000dMaster Fuel Trip（緊急主燃料遮断装置）の略。\u000dMicro Four Thirds（マイクロフォーサーズ）の略。\u000dMy Favorite trivia - 「トリビアの泉 ～素晴らしきムダ知識～」でその放送回で司会者の一人高橋克実が最も気に入ったトリビア'
    );

    await page.click('a#pre-submit-button');
    if (util.isProduction) {
      await page.pdf({ path: 'test/registration.pdf', printBackground: true });
    } else {
      await page.screenshot({
        path: 'test/registration.png',
        fullPage: true
      });
    }
    await page.click('a#submit-button');
  });

  it('should input dummy data to /survey', async () => {
    await page.goto(util.target('survey'), {
      waitUntil: 'networkidle2'
    });
    await page.type('input#_101_makers_id', 'M9999');
    await page.type(
      'input#_102_makers_name',
      util.getRandomAlphanumerics(util.getRandomInt(10, 20))
    );
    await page.type('input#_103_primary_lastname', '鈴木');
    await page.type('input#_104_primary_firstname', '真一朗');
    await page.type('input#_105_email', 'shin@forzando.co.jp');
    await page.type(
      'textarea#_201_equipments',
      util.getRandomAlphanumerics(util.getRandomInt(10, 200))
    );
    await page.click(
      util.getRandomItemFromArray([
        'input#_202_dangerous_YES',
        'input#_202_dangerous_NO'
      ])
    );
    await page.click(
      util.getRandomItemFromArray([
        'input#_301_loading_hand',
        'input#_301_loading_car',
        'input#_301_loading_yamato',
        'input#_301_loading_sagawa'
      ])
    );
    await page.click(
      util.getRandomItemFromArray([
        'input#_302_loading_day_4',
        'input#_302_loading_day_5'
      ])
    );
    await page.click('input#_303_unloading_car');
    await page.click(
      util.getRandomItemFromArray([
        'input#_303_unloading_hand',
        'input#_303_unloading_yamato',
        'input#_303_unloading_sagawa'
      ])
    );
    await page.type('input#_304a_car_type', 'レンタカー');
    await page.type('input#_304b_car_number', 'レンタカー');
    await page.type(
      'input#_304c_car_driver',
      util.getRandomAlphanumerics(util.getRandomInt(10, 20))
    );
    await page.type(
      'input#_304d_car_telephone',
      util.getRandomItemFromArray(['070', '080', '090']) +
        '-' +
        util.getRandomNumber(4) +
        '-' +
        util.getRandomNumber(4)
    );
    await page.click('a#pre-submit-button');
    if (util.isProduction) {
      await page.pdf({ path: 'test/survey.pdf', printBackground: true });
    } else {
      await page.screenshot({
        path: 'test/survey.png',
        fullPage: true
      });
    }
    await page.click('a#submit-button');
  });
});
