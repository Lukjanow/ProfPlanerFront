import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Input,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {printArrAsStringByKey, printArrAsStringByKeys} from "../utils/stringUtils.js";

export default function BasicDataTable({ tableData }) {
  const { t } = useTranslation();
  const [length, setLength] = useState(0);
  const excludeColumnKeys = ["_id"];
  let columnKeys = [];

  // Funktion zum Aktualisieren der Länge der Daten
  useEffect(() => {
    if (tableData) {
      setLength(tableData.length);
    }
  }, [tableData]);

  const generateColumns = () => {
    if (!tableData || !tableData[0]) return [];
    columnKeys = Object.keys(tableData[0]).filter(key => !excludeColumnKeys.includes(key));

    return Object.keys(columnKeys).map((key) => {
        return {
            name: t(columnKeys[key]).toUpperCase(),
            uid: columnKeys[key].toLowerCase(),
            sortable: true,
        }
    });
  };

  const myColumns = generateColumns();

  const topContent = (
    <div className="flex w-full justify-between items-center">
      <h1 className="font-poppins font-bold text-2xl">Überblick ({length})</h1>
      <Input
        isClearable
        placeholder="Search by name..."
        className="flex-initial w-1/2"
        startContent={
          <FontAwesomeIcon
            icon={"magnifying-glass"}
            onClick={() => console.log("Test")}
          />
        }
        radius="sm"
        variant={"underlined"}
      />
    </div>
  );

  function determineRendering(key, value) {
      if (Array.isArray(value)) {
          if (key === "dozent") {
              return <TableCell>{printArrAsStringByKeys(value, ["prename", "lastname"])}</TableCell>;
          } else if (key === "room" || key === "studySemester") {
              return <TableCell>{printArrAsStringByKey(value, "name")}</TableCell>;
          }
          return <TableCell key={key}>Unknown key: {key}</TableCell>
      }
      return <TableCell key={key}>{value}</TableCell>;
  }

  return (
    <Table aria-label="table" radius="sm" topContent={topContent}>
      <TableHeader
        columns={[...myColumns, { name: "ACTIONS", uid: "actions" }]}
      >
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={tableData}>
        {(item) => (
          <TableRow key={item._id}>
              {columnKeys.map(key => (
                  determineRendering(key, item[key])
              ))}
            <TableCell>
              <div className="relative flex items-center gap-2">
                <Tooltip content="Edit user">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <FontAwesomeIcon icon={"pen"} />
                  </span>
                </Tooltip>
                <Tooltip color="danger" content="Delete user">
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <FontAwesomeIcon icon={"trash"} />
                  </span>
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
