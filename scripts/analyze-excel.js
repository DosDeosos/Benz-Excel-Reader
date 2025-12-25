const XLSX = require("xlsx");
const path = require("path");

const excelPath = path.join(__dirname, "..", "src", "excel", "สมุดงาน.xlsx");
const workbook = XLSX.readFile(excelPath);

console.log("Sheet Names:", workbook.SheetNames);
console.log("\n=== Analyzing Sheets ===\n");

workbook.SheetNames.forEach((sheetName) => {
  console.log(`\n--- Sheet: ${sheetName} ---`);
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet);

  console.log(`Total rows: ${jsonData.length}`);

  if (jsonData.length > 0) {
    console.log("\nColumn headers:", Object.keys(jsonData[0]));
    console.log("\nFirst 3 rows:");
    console.log(JSON.stringify(jsonData.slice(0, 3), null, 2));
  }
});
