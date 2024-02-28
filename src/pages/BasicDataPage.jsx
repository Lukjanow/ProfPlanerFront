import { useTranslation } from "react-i18next";
import BasicDataList from "../components/BasicDataMenu";
import BasicDataTable from "../components/BasicDataTable";
import { FilledButton } from "../components/FilledButton";
import { OutlinedButton } from "../components/OutlinedButton";


export default function BasicDataPage() {
  const { t } = useTranslation()

  return (
    <>
      <div className="p-10">
        <div className="flex w-full justify-between">
          <h1 className="font-poppins font-semibold text-[48px]">{t("basicData")}</h1>
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
