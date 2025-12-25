const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const excelPath =
  args[0] || path.join(__dirname, "..", "src", "excel", "สมุดงาน.xlsx");

const outputDir = path.join(__dirname, "..", "src", "data");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`✓ Created output directory: ${outputDir}`);
}

console.log(`\n📖 Reading Excel file: ${excelPath}\n`);

try {
  const workbook = XLSX.readFile(excelPath);
  console.log(`Found sheets: ${workbook.SheetNames.join(", ")}\n`);
  if (workbook.SheetNames.includes("Data")) {
    const dataSheet = workbook.Sheets["Data"];
    const dataJson = XLSX.utils.sheet_to_json(dataSheet);
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
  if (workbook.SheetNames.includes("Inventory")) {
    const inventorySheet = workbook.Sheets["Inventory"];
    const inventoryJson = XLSX.utils.sheet_to_json(inventorySheet);
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
  console.log("\n✅ Excel extraction completed successfully!\n");
} catch (error) {
  console.error("\n❌ Error reading Excel file:", error.message);
  process.exit(1);
}
