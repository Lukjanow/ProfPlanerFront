import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import { FilledButton } from "./FilledButton";
import * as XLSX from "xlsx";
import readXlsxFile from 'read-excel-file'

export default function XLSXImport({
    onClick
}
) {

  const [file, setFile] = useState();
  const [array, setArray] = useState([]);

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target);
  };

    /* Write to XLSX, keep for possible testing or other purpose
    const wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(array)
    XLSX.utils.book_append_sheet(wb, ws, "Sheet")
    XLSX.writeFileXLSX(wb, "Excel.xlsx")

  };*/

  const handleOnSubmit = (e) => {
    let submit = []
    let dict = {}
    e.preventDefault();
    console.log(file.files[0])
    readXlsxFile(file.files[0]).then((rows)=>{
      rows.forEach((row, index) => {
        dict = {}
        if (index !== 0){
          for (let i = 0; i < row.length; i++) {
            dict[rows[0][i]] = row[i]
          }
          submit.push(dict)
        }
      })
     setArray(submit);
     onClick(submit);
    })
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));

  return (
    <div style={{ textAlign: "center", width: "30%" }}>
      <h1>REACTJS xlsx IMPORT EXAMPLE </h1>
      <form>
        <Input
          type={"file"}
          id={"xlsxFileInput"}
          accept={".xlsx"}
          onChange={handleOnChange}
        />

        <FilledButton
          onClick={(e) => {
            handleOnSubmit(e);
          }}
          text="Import xlsx"
        />
      </form>
    </div>
  );
}