/**
 * Maker Faire Tokyo 2018
 * GAS Project: make-jp-2018-survey
 * @author Shin'ichiro SUZUKI <shin@sforzando.co.jp>
 */

/**
 * Copy Data from Master sheet
 * @return [type] [description]
 */
function copyDataFromSurveyMaster() {
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
    .addItem('Copy Data from Master', 'copyDataFromSurveyMaster')
    .addItem('Set Header', 'setHeaderForSurveyWorksheet')
    .addToUi();

  copyDataFromSurveyMaster();
}

function createOpenTriggerForSurveyWorksheet() {
  var ss = SpreadsheetApp.openById(sheetId.SURVEY_WORKSHEET);
  ScriptApp.newTrigger('onOpenSurveyWorksheet')
    .forSpreadsheet(ss)
    .onOpen()
    .create();
}
