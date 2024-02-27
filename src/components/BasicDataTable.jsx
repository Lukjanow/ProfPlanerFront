import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Input,
  user,
} from "@nextui-org/react";
import users from "./data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BasicDataTable() {
  const myColumns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "BEZEICHNUNG", uid: "bezeichnung", sortable: true },
    { name: "MODULE-NR.", uid: "modulenr", sortable: true },
    { name: "CODE", uid: "code", sortable: true },
    { name: "FACHSEMESTER", uid: "fachsemester" },
    { name: "STUDIENGANG", uid: "studiengang" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "actions":
        return (
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
        );
      default:
        return cellValue;
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex w-full justify-between items-center">
        <h1 className="font-poppins font-bold text-2xl">
          Überblick ({users.length})
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
    <Table
      aria-label="Example table with custom cells"
      radius="sm"
      topContent={topContent}
    >
      <TableHeader columns={myColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
