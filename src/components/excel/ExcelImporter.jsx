import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Table } from "antd";

function ExcelImporter({ data, setData, orders }) {

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1,  raw: false });
        console.log("excelData", excelData);
        const jsonData = excelData.slice(1).map((row) => {
          const obj = {};
          excelData[0].forEach((key, index) => {
            const formattedKey = key.toLowerCase().trim().replace(/ /g, "_");
            obj[formattedKey] = row[index];
          });
          return obj;
        });

        setData(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  };
  console.log("excel data", data);
 
  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
    </div>
  );
}

export default ExcelImporter;
