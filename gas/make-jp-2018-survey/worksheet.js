/**
 * Maker Faire Tokyo 2018
 * GAS Project: make-jp-2018-survey
 * @author Shin'ichiro SUZUKI <shin@sforzando.co.jp>
 */

/**
 * Copy Data from Master sheet
 * @return [type] [description]
 */
function copyDataFromMaster() {
  var spreadSheet = SpreadsheetApp.openById(sheetId.SURVEY_WORKSHEET);
  var sheet_active = spreadSheet.getSheets()[0];
  if (sheet_active.getIndex() == 1) {
    var sheet_origin = SpreadsheetApp.openById(sheetId.SURVEY_MASTER);
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
 * Set Survey's Header Values for first row
 */
function setHeaderForSurveyWorksheet() {
  var spreadSheet = SpreadsheetApp.openById(sheetId.SURVEY_WORKSHEET);
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

function onOpenSurveyWorksheet(event) {
  SpreadsheetApp.getUi()
    .createMenu('Custom Function')
    .addItem('Copy Data from Master', 'copyDataFromMaster')
    .addItem('Set Header', 'setHeaderForSurveyWorksheet')
    .addToUi();

  copyDataFromMaster();
}

function createOpenTriggerForSurveyWorksheet() {
  var ss = SpreadsheetApp.openById(sheetId.SURVEY_WORKSHEET);
  ScriptApp.newTrigger('onOpenSurveyWorksheet')
    .forSpreadsheet(ss)
    .onOpen()
    .create();
}
