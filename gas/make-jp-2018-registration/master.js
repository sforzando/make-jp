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
