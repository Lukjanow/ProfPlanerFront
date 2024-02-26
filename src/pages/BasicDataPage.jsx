import BasicDataList from "../components/BasicDataMenu";
import BasicDataTable from "../components/BasicDataTable";
import { FilledButton } from "../components/FilledButton";
import { OutlinedButton } from "../components/OutlinedButton";

export default function BasicDataPage() {
  return (
    // TODO: Übersetzung einfügen
    <>
      <div className="p-10">
        <div className="flex w-full justify-between">
          <h1 className="font-poppins font-semibold text-[48px]">Stammdaten</h1>
          <FilledButton
            text="Neues Modul"
            icon="plus"
            showIcon={true}
            onClick={() => {
              console.log("Button wurde geklickt!");
            }}
          />

          <OutlinedButton
            text="Neues Modul"
            icon="plus"
            showIcon={true}
            color="secondary"
          />
        </div>

        <div className="flex w-full">
          <BasicDataList />
          <BasicDataTable />
        </div>
      </div>
    </>
  );
}
