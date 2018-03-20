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
