import BasicDataList from "../components/BasicDataList";
import BasicDataTable from "../components/BasicDataTable";
import { BasicDataButton } from "../components/BasicDataButton";

export default function BasicDataPage() {
  return (
    // TODO: Übersetzung einfügen
    <>
      <div className="p-10">
        <div className="flex w-full justify-between">
          <h1>Stammdaten</h1>
          <BasicDataButton />
        </div>

        <div>
          <BasicDataList />
          <BasicDataTable />
        </div>
      </div>
    </>
  );
}
