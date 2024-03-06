import React, { useState } from "react";
import { addXLSXModule } from "../services/moduleService";
import XLSXImport from "../components/xlsxImport";

export default function Testpage(
) {

    const [xlsx, setxlsx] = React.useState([])

    const handlexlsx = (xlsxin) => (
        setxlsx(xlsxin),
        addXLSXModule(xlsxin)
    )
    

  return (
    <div>
        <XLSXImport onClick={handlexlsx}/>
        
    </div>
  );
}
