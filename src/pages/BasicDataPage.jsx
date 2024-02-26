import BasicDataList from "../components/BasicDataMenu";
import BasicDataTable from "../components/BasicDataTable";
import { BasicDataButton } from "../components/BasicDataButton";
import { FilledButton } from "../components/FilledButton";

export default function BasicDataPage() {
  return (
    // TODO: Übersetzung einfügen
    <>
      <div className="p-10">
        <div className="flex w-full justify-between">
          <h1 className="font-poppins font-semibold text-[48px]">Stammdaten</h1>
          <FilledButton />
        </div>

        <div className="flex w-full">
          <BasicDataList />
          <BasicDataTable />
        </div>
      </div>
    </>
  );
}
