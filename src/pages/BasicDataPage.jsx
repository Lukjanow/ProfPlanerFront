import BasicDataList from "../components/BasicDataMenu";
import BasicDataTable from "../components/BasicDataTable";
import { FilledButton } from "../components/FilledButton";
import { OutlinedButton } from "../components/OutlinedButton";
import { PageTitle } from '../components/PageTitle'

export default function BasicDataPage() {
  return (
    // TODO: Übersetzung einfügen
    <>
      <div className="p-10">
        <div className="flex w-full justify-between">
          <PageTitle text="Stammdaten" margin="0px"/>
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
