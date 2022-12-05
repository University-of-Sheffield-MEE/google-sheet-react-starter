const MODAL_WIDTH = 400;
const MODAL_HEIGHT = 600;

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui
    .createMenu('🧙‍♂️ Wizardry')
    .addItem('🙌 Open User Interface', 'openUI')
    .addToUi();
}

function openUI() {
  const html = HtmlService.createTemplateFromFile('frontend/ui');
  SpreadsheetApp.getUi().showModelessDialog(html.evaluate().setWidth(MODAL_WIDTH).setHeight(MODAL_HEIGHT), '🧙‍♂️ Wizardry');
}