import ExcelJS from "exceljs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const excelPath = path.join(__dirname, "..", "src", "excel", "สมุดงาน.xlsx");

async function analyzeExcel() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(excelPath);

  console.log(
    "Sheet Names:",
    workbook.worksheets.map((ws) => ws.name)
  );
  console.log("\n=== Analyzing Sheets ===\n");

  workbook.worksheets.forEach((worksheet) => {
    console.log(`\n--- Sheet: ${worksheet.name} ---`);

    const jsonData = [];
    const headers = [];
    worksheet.getRow(1).eachCell((cell, colNumber) => {
      headers[colNumber] = cell.value;
    });
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        const rowData = {};
        row.eachCell((cell, colNumber) => {
          const header = headers[colNumber];
          if (header) {
            rowData[header] = cell.value;
          }
        });
        if (Object.keys(rowData).length > 0) {
          jsonData.push(rowData);
        }
      }
    });

    console.log(`Total rows: ${jsonData.length}`);

    if (jsonData.length > 0) {
      console.log("\nColumn headers:", Object.keys(jsonData[0]));
      console.log("\nFirst 3 rows:");
      console.log(JSON.stringify(jsonData.slice(0, 3), null, 2));
    }
  });
}

analyzeExcel();
