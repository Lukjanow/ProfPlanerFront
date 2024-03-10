import React from "react";
import { useTranslation } from "react-i18next";
import { OutlinedButton } from "./OutlinedButton";
import { FilledButton } from "./FilledButton";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PageContainer({
  title,
  showDeleteButton = true,
  onClickDelete,
  showPrimaryButton = true,
  primaryButtonTitle,
  onClickPrimary,
  showCancelButton = true,
  children,
  row,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={"lg:m-10 m-5 flex flex-col gap-10"}>
      <div className={"flex flex-row gap-2 justify-between items-center"}>
        <h2 className={"font-bold md:text-5xl text-3xl"}>
          {title !== undefined ? title : t("defaultPageTitle")}
        </h2>
        <div className={"flex flex-row gap-3"}>
          {showDeleteButton ? (
            <OutlinedButton
              text={t("delete")}
              color={"danger"}
              onClick={onClickDelete}
            />
          ) : (
            <></>
          )}
          {showCancelButton ? (
            <OutlinedButton
              text={t("cancel")}
              color={"primary"}
              onClick={() => navigate("/basicdata")}
            />
          ) : (
            <></>
          )}
          {showPrimaryButton ? (
            <FilledButton
              text={primaryButtonTitle}
              showIcon={true}
              icon={"plus"}
              onClick={onClickPrimary}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className={`flex gap-5 ${row ? "flex-row" : "flex-col"}`}>
        {children}
      </div>
      <div className="fixed bottom-5 right-5">
        <Button isIconOnly color="primary" className="rounded" size="lg">
          <FontAwesomeIcon icon={"message"} />
        </Button>
      </div>
    </div>
  );
}
