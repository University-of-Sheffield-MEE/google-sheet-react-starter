type Task = {
  title: string;
  done: boolean;
}

function getSheet_(): GoogleAppsScript.Spreadsheet.Sheet {
  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName('Tasks');
  if (!sheet) {
    throw new Error('Sheet not found');
  }
  return sheet;
}

function uiGetTasks(): Task[] {
  const sheet = getSheet_();
  const data = sheet.getRange('A2:B').getValues();
  return data
    .filter(row => row[0] !== '')
    .map(row => ({
      title: row[0],
      done: row[1] === true,
    }));
}

function uiAddTask(title: string): Task[] {
  const sheet = getSheet_();
  const lastRow = sheet.getLastRow();
  sheet.getRange(lastRow + 1, 1, 1, 2).setValues([[title, false]]);
  return uiGetTasks();
}

function uiTaskDone(title: string): Task[] {
  const sheet = getSheet_();
  const data = sheet.getRange('A2:B').getValues();
  const index = data.findIndex(row => row[0] === title && row[1] !== true);
  console.log(title, index);
  if (index >= 0) {
    sheet.getRange(index + 2, 2).setValue(true);
  }
  return uiGetTasks();
}