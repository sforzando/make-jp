/**
 * Maker Faire Tokyo 2018
 * GAS Project: make-jp-2018-registration
 * @author Shin'ichiro SUZUKI <shin@sforzando.co.jp>
 */

/**
 * Copy Data from Master sheet
 * @return [type] [description]
 */
function copyDataFromRegistrationMaster() {
  var spreadSheet = SpreadsheetApp.openById(sheetId.REGISTRATION_WORKSHEET);
  var sheet_active = spreadSheet.getSheets()[0];
  if (sheet_active.getIndex() == 1) {
    var sheet_origin = SpreadsheetApp.openById(sheetId.REGISTRATION_MASTER);
    var data_origin = sheet_origin.getDataRange().getValues();
    var lastRow = sheet_active.getLastRow();
    if (lastRow < data_origin.length) {
      for (r = lastRow; r < data_origin.length; r++) {
        for (c = 0; c < data_origin[r].length; c++) {
          sheet_active.getRange(r + 1, c + 1).setValue(data_origin[r][c]);
        }
      }
    } else {
      Browser.msgBox('前回のコピーから追加は無いようです。');
    }
  } else {
    Browser.msgBox('1枚目のシートで実行してください。');
  }
}

/**
 * Set Registration's Header Values for first row
 */
function setHeaderForRegistrationWorksheet() {
  var spreadSheet = SpreadsheetApp.openById(sheetId.REGISTRATION_WORKSHEET);
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
    '2-07-a. 写真のURL（1）',
    '2-07-b. 写真のURL（2）',
    '2-07-c. 写真のURL（3）',
    '2-07-d. 動画のURL（1）',
    '2-07-e. 動画のURL（2）',
    '2-07-f. 動画のURL（3）',
    '2-08-a. 作品',
    '2-08-b. 機材・配布物',
    '2-09. 必要な電源容量（W数）',
    '3-01. スペース',
    '3-02. テーブルの数',
    '3-03. 椅子の数',
    '3-04. 展示の音量のめやす',
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

function onOpenRegistrationWorksheet(event) {
  SpreadsheetApp.getUi()
    .createMenu('Custom Function')
    .addItem('Copy Data from Master', 'copyDataFromRegistrationMaster')
    .addItem('Set Header', 'setHeaderForRegistrationWorksheet')
    .addToUi();

  copyDataFromRegistrationMaster();
}

function createOpenTriggerForRegistrationWorksheet() {
  var ss = SpreadsheetApp.openById(sheetId.REGISTRATION_WORKSHEET);
  ScriptApp.newTrigger('onOpenRegistrationWorksheet')
    .forSpreadsheet(ss)
    .onOpen()
    .create();
}
