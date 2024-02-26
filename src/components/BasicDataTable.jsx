import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
} from "@nextui-org/react";
import { columns, users, statusOptions } from "./data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React from "react";

// Map, die den Status eines Benutzers mit einer Farbe verknüpft
const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

export default function BasicDataTable() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(users.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  // Berechnung der Header-Spalten
  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns; // Wenn alle Spalten sichtbar sind, gib alle Spalten zurück

    return columns.filter((column) => // Andernfalls filtere die sichtbaren Spalten
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  // Filtern der Elemente basierend auf Suchbegriff und Statusfilter
  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users]; // Kopie der Benutzerliste

    // Anwenden des Suchfilters
    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    // Anwenden des Statusfilters
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  // Berechnung der angezeigten Elemente basierend auf Paginierung
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  // Sortierung der Elemente basierend auf Sortierbeschreibung
  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  // Funktion zum Rendern einer Zelle abhängig von der Spalte
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey]; // Wert der Zelle basierend auf Spalte

    // Rendern der Zelle basierend auf der Spalte
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "full", size: "sm", src: user.avatar }}
            classNames={{
              description: "text-default-500",
            }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small uppercase">{cellValue}</p>
            <p className="text-bold text-tiny uppercase text-default-500">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="uppercase border-none gap-1 text-default-600"
            color={statusColorMap[user.status]}
            size="sm"
            variant="dot"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <FontAwesomeIcon
                    icon={"ellipsis-vertical"}
                    className="text-default-400"
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  // Handler für Änderungen der Anzahl von Zeilen pro Seite
  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  // Handler für Änderungen des Suchwerts
  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  // Top-Inhalt der Tabelle
  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={
              <FontAwesomeIcon
                icon={"magnifying-glass"}
                className="text-default-300"
              />
            }
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3"></div>
        </div>
        <div className="flex justify-between items-center font-bold font-poppins text-[52px]">
          <span className="text-semibold text-[22px]">
            Überblick ({users.length})
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    users.length,
    hasSearchFilter,
  ]);

  // Bottom-Inhalt der Tabelle
  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${items.length} selected`}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  // Klassen für die Tabellenkomponente
  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );

  // Rendern der Tabellenkomponente mit allen Props und Inhalten
  return (
    <Table
      isCompact // Kompakte Darstellung der Tabelle
      removeWrapper // Entfernt den äußeren Wrapper der Tabelle
      aria-label="Example table with custom cells, pagination and sorting" // ARIA-Label für Barrierefreiheit
      bottomContent={bottomContent} // Unten befindlicher Inhalt (Pagination und Anzahl der ausgewählten Elemente)
      bottomContentPlacement="outside" // Positionierung des unteren Inhalts außerhalb der Tabelle
      checkboxesProps={{ // Eigenschaften für Kontrollkästchen
        classNames: { // Klassen für das Kontrollkästchen
          wrapper: "after:bg-foreground after:text-background text-background", // Klassen für den Wrapper des Kontrollkästchens
        },
      }}
      classNames={classNames} // Klassen für die Tabelle (Wrapper, Header, Zellen usw.)
      selectedKeys={selectedKeys} // Ausgewählte Schlüssel (für Mehrfachauswahl)
      selectionMode="multiple" // Auswahlmodus (Mehrfachauswahl)
      sortDescriptor={sortDescriptor} // Sortierbeschreibung
      topContent={topContent} // Oben befindlicher Inhalt (Suche und Anzahl der Elemente)
      topContentPlacement="outside" // Positionierung des oberen Inhalts außerhalb der Tabelle
      onSelectionChange={setSelectedKeys} // Handler für Änderungen der Auswahl
      onSortChange={setSortDescriptor} // Handler für Änderungen der Sortierung
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"} // Ausrichtung der Zelle (zentriert für Aktionen, sonst linksbündig)
            allowsSorting={column.sortable} // Gibt an, ob die Spalte sortierbar ist
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
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
