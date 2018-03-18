/**
 * Maker Faire Tokyo 2018
 * GAS Project: make-jp
 * 2018/survey/master
 * @author Shin'ichiro SUZUKI <shin@sforzando.co.jp>
 */

var sheetId = '1nfI3udrZcm4mH7WAyOqUAp97Yh-PuzTRDtqfM_BA3xo';

/**
 * Recieve Data via POST
 * @param e
 * @return JSON as a result
 */
function doPost(e) {
  try {
    var spreadSheet = SpreadsheetApp.openById(sheetId);
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
 * Set Survey's Header Values for first row
 */
function setHeaderForSurvey() {
  var spreadSheet = SpreadsheetApp.openById(sheetId);
  var sheet = spreadSheet.getSheets()[0];
  var headerColumns = [
    '1-01. 出展者ID',
    '1-02. 出展者名',
    '1-03. 代表者名（姓）',
    '1-04. 代表者名（名）',
    '1-05. 代表者のメールアドレス',
    '2-01. 会場に持ち込む作品と機材',
    '2-02. 東京都火災予防条例上の危険物に該当する物品の持ち込み予定',
    '3-01. 搬入方法',
    '3-02. 搬入日',
    '3-03. 搬出方法',
    '3-04-a. 車種、色（自動車の場合）',
    '3-04-b. 車両番号（ナンバー、自動車の場合）',
    '3-04-c. 運転者氏名（自動車の場合）',
    '3-04-d. 運転者携帯電話番号（自動車の場合）',
    '送信日時'
  ];
  for (var i = 0; i < headerColumns.length; i++) {
    sheet
      .getRange(1, i + 1)
      .setValue(headerColumns[i])
      .setBackground('#eee');
  }
}

function onOpen(event) {
  SpreadsheetApp.getUi()
    .createMenu('Custom Function')
    .addItem('Set Header', 'setHeaderForSurvey')
    .addToUi();
}

function createSpreadsheetOpenTrigger() {
  var ss = SpreadsheetApp.openById(sheetId);
  ScriptApp.newTrigger('onOpen:2018/survey/master.js')
    .forSpreadsheet(ss)
    .onOpen()
    .create();
}
