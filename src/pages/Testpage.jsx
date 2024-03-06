import React, { useState } from "react";
import CSVImport from "../components/CSVImport";

export default function Testpage(
) {

    const [CSV, setCSV] = React.useState([])

    const handleCSV = (CSVin) => (
        console.log(CSVin),
        setCSV(CSVin)
    )
    

  return (
    <div>
        <CSVImport onClick={handleCSV}/>
    </div>
  );
}
