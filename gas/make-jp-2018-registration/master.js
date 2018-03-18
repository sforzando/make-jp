/**
 * Maker Faire Tokyo 2018
 * GAS Project: make-jp-2018-registration
 * @author Shin'ichiro SUZUKI <shin@sforzando.co.jp>
 */

/**
 * Recieve Data via POST
 * @param e
 * @return JSON as a result
 */
function doPost(e) {
  try {
    var spreadSheet = SpreadsheetApp.openById(sheetId.REGISTRATION_MASTER);
    var sheet = spreadSheet.getSheets()[0];
    var param = e.parameter;

    var keys = [];
    var values = [];
    for (k in param) {
      if (param.hasOwnProperty(k)) {
        keys.push(k);
      }
    }
    keys.sort();
    for (var i = 0; i < keys.length; i++) {
      values.push(param[keys[i]]);
    }

    sheet.appendRow(values);

    return ContentService.createTextOutput(
      JSON.stringify({
        result: 'success'
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (ex) {
    return ContentService.createTextOutput(
      JSON.stringify({
        result: ex.message
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Recieve Data via GET
 * @param e
 * @return JSON as a result
 */
function doGet(e) {}

/**
 * Set Registration's Header Values for first row
 */
function setHeaderForRegistrationMaster() {
  var spreadSheet = SpreadsheetApp.openById(sheetId.REGISTRATION_MASTER);
  var sheet = spreadSheet.getSheets()[0];
  var headerColumns = [
    '1-01. 出展者名',
    '1-02. 出展者名ふりがな',
    '1-03. 出展者名の英文表記',
    '1-04. 代表者名（姓）',
    '1-05. 代表者名（名）',
    '1-06. 代表者名（姓）ふりがな',
    '1-07. 代表者名（名）ふりがな',
    '1-08. 代表者のメールアドレス',
    '1-10. 代表者の携帯電話番号',
    '1-11. 代表者の住所（郵便番号）',
    '1-12. 代表者の住所（都道府県）',
    '1-13. 代表者の住所（市区町村・番地・建物名・部屋番号・社名）',
    '1-14. 出展者のプロフィール',
    '1-15. 出展区分',
    '1-16. 出展者タグの枚数',
    '2-01. 作品またはプロジェクトの名称',
    '2-02. 作品またはプロジェクトの名称の英文表記',
    '2-03. 出展内容の紹介',
    '2-04-a. ウェブサイトのURL（1）',
    '2-04-b. ウェブサイトのURL（2）',
    '2-05. Twitterアカウント',
    '2-06-a. 出展カテゴリー（第1希望）',
    '2-06-b. 出展カテゴリー（第2希望）',
    '2-07-a. 写真や動画のURL（1）',
    '2-07-b. 写真や動画のURL（2）',
    '2-07-c. 写真や動画のURL（3）',
    '2-08. 会場に持ち込む作品と機材',
    '2-09. 必要な電源容量（W数）',
    '3-01. 展示スペースの種類',
    '3-02. テーブルの数',
    '3-03-a. 広いスペース',
    '3-03-b. 広いスペースのテーブルの数',
    '3-04. 椅子の数',
    '3-05. ハンズオン（ミニワークショップ）用テーブル',
    '3-06. ハンズオンのタイトル',
    '3-07. ハンズオンの内容',
    '3-08. ハンズオンの参加料',
    '3-09. 暗いスペース',
    '3-10. その他、スペースについて',
    '3-11. 近くで出展したい他の出展者（最大2組まで）',
    '4-01. プレゼンテーション',
    '4-02. プレゼンテーションのタイトル',
    '4-03. プレゼンテーションの内容',
    '4-04. ワークショップ',
    '4-05. ワークショップのタイトル',
    '4-06. ワークショップの内容',
    '4-07. ワークショップの回数',
    '4-08. ワークショップの時間',
    '4-09. ワークショップの参加人数',
    '4-10. ワークショップの参加料',
    '4-11. ワークショップ参加者の申し込み方法',
    '4-12. ライブパフォーマンス',
    '4-13. ライブパフォーマンスのタイトル',
    '4-14. ライブパフォーマンスの内容',
    '5-01. その他、不明な点や事務局へのご要望',
    '送信日時'
  ];
  for (var i = 0; i < headerColumns.length; i++) {
    sheet
      .getRange(1, i + 1)
      .setValue(headerColumns[i])
      .setBackground('#eee');
  }
}

function onOpenRegistrationMaster(event) {
  SpreadsheetApp.getUi()
    .createMenu('Custom Function')
    .addItem('Set Header', 'setHeaderForRegistrationMaster')
    .addToUi();
}

function createOpenTriggerForRegistrationMaster() {
  var ss = SpreadsheetApp.openById(sheetId.REGISTRATION_MASTER);
  ScriptApp.newTrigger('onOpenRegistrationMaster')
    .forSpreadsheet(ss)
    .onOpen()
    .create();
}
