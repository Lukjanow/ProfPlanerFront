import React from "react";
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

export default function BasicDataTable({ tableData }) {
  const { t } = useTranslation();

  const generateColumns = () => {
    if (!tableData || !tableData[0]) return []; // Wenn keine Daten vorhanden sind, leere Spalten zurückgeben
    return Object.keys(tableData[0]).map((key) => ({
      name: t(key).toUpperCase(),
      uid: key.toLowerCase(),
      sortable: true, // Annahme: Alle Spalten sind sortierbar, kann angepasst werden
    }));
  };

  const myColumns = generateColumns();

  const topContent = React.useMemo(() => {
    return (
      <div className="flex w-full justify-between items-center">
        <h1 className="font-poppins font-bold text-2xl">
          Überblick ({tableData.length + 1})
        </h1>
        <Input
          isClearable
          placeholder="Search by name..."
          className="flex-initial w-1/2"
          startContent={
            <FontAwesomeIcon
              icon={"magnifying-glass"}
              onClick={console.log("Test")}
            />
          }
          radius="sm"
          variant={"underlined"}
        />
      </div>
    );
  }, []);

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
          <TableRow key={item.id}>
            {Object.keys(item).map((key, index) => (
              <TableCell key={index}>{item[key]}</TableCell>
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
