import ExcelJS from "exceljs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const excelPath =
  args[0] || path.join(__dirname, "..", "src", "excel", "สมุดงาน.xlsx");

const outputDir = path.join(__dirname, "..", "src", "data");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`✓ Created output directory: ${outputDir}`);
}
console.log(`\n📖 Reading Excel file: ${excelPath}\n`);
function getCellValue(cell) {
  if (cell.value === null || cell.value === undefined) {
    return null;
  }
  if (cell.value && typeof cell.value === "object" && cell.value.error) {
    return null;
  }
  if (cell.value && typeof cell.value === "object" && cell.value.richText) {
    return cell.value.richText.map((rt) => rt.text).join("");
  }
  if (cell.value && typeof cell.value === "object" && "result" in cell.value) {
    return cell.value.result;
  }
  if (cell.value && typeof cell.value === "object" && cell.value.text) {
    return cell.value.text;
  }
  return cell.value;
}

async function extractExcelData() {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(excelPath);

    console.log(
      `Found sheets: ${workbook.worksheets.map((ws) => ws.name).join(", ")}\n`
    );
    const dataSheet = workbook.getWorksheet("Data");
    if (dataSheet) {
      const dataJson = [];
      const headers = [];
      dataSheet.getRow(1).eachCell((cell, colNumber) => {
        headers[colNumber] = getCellValue(cell);
      });
      dataSheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
          const rowData = {};
          row.eachCell((cell, colNumber) => {
            const header = headers[colNumber];
            if (header) {
              rowData[header] = getCellValue(cell);
            }
          });
          if (Object.keys(rowData).length > 0) {
            dataJson.push(rowData);
          }
        }
      });

      const dataOutputPath = path.join(outputDir, "data.json");
      fs.writeFileSync(
        dataOutputPath,
        JSON.stringify(dataJson, null, 2),
        "utf-8"
      );
      console.log(`✓ Extracted Data sheet: ${dataJson.length} rows`);
      console.log(`  Saved to: ${dataOutputPath}`);
    } else {
      console.warn('⚠ Warning: "Data" sheet not found in Excel file');
    }
    const inventorySheet = workbook.getWorksheet("Inventory");
    if (inventorySheet) {
      const inventoryJson = [];
      const headers = [];
      inventorySheet.getRow(1).eachCell((cell, colNumber) => {
        headers[colNumber] = getCellValue(cell);
      });
      inventorySheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
          const rowData = {};
          row.eachCell((cell, colNumber) => {
            const header = headers[colNumber];
            if (header) {
              rowData[header] = getCellValue(cell);
            }
          });
          if (Object.keys(rowData).length > 0) {
            inventoryJson.push(rowData);
          }
        }
      });

      const inventoryOutputPath = path.join(outputDir, "inventory.json");
      fs.writeFileSync(
        inventoryOutputPath,
        JSON.stringify(inventoryJson, null, 2),
        "utf-8"
      );
      console.log(`✓ Extracted Inventory sheet: ${inventoryJson.length} rows`);
      console.log(`  Saved to: ${inventoryOutputPath}`);
    } else {
      console.warn('⚠ Warning: "Inventory" sheet not found in Excel file');
    }

    const logSheet = workbook.getWorksheet("Log In-Out");
    if (logSheet) {
      const logJson = [];
      const headers = [];

      logSheet.getRow(1).eachCell((cell, colNumber) => {
        headers[colNumber] = getCellValue(cell);
      });

      logSheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
          const rowData = {};
          row.eachCell((cell, colNumber) => {
            const header = headers[colNumber];
            if (header) {
              rowData[header] = getCellValue(cell);
            }
          });
          if (Object.keys(rowData).length > 0) {
            logJson.push(rowData);
          }
        }
      });

      const logOutputPath = path.join(outputDir, "log.json");
      fs.writeFileSync(
        logOutputPath,
        JSON.stringify(logJson, null, 2),
        "utf-8"
      );
      console.log(`✓ Extracted Log In-Out sheet: ${logJson.length} rows`);
      console.log(`  Saved to: ${logOutputPath}`);
    } else {
      console.warn('⚠ Warning: "Log In-Out" sheet not found in Excel file');
    }

    console.log("\n✅ Excel extraction completed successfully!\n");
  } catch (error) {
    console.error("\n❌ Error reading Excel file:", error.message);
    process.exit(1);
  }
}

extractExcelData();
