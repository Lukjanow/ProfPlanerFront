import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody, Button } from "@nextui-org/react";
import React from "react";
import { useTranslation } from "react-i18next";

const NoContent = () => {
  const { t } = useTranslation();

  const handleRefresh = () => {
    window.location.reload(); // Aktualisiert die Seite
  };

  return (
    <>
      <Card>
        <CardBody className="p-10">
          <FontAwesomeIcon className={"text-7xl"} icon={"circle-xmark"} />
          <div className="flex flex-col items-center justify-center p-5">
            <div className="p-2 flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold mt-4 mb-2 p-5">
                {t("noContentAvailable")}
              </h2>
              <p className="text-base text-center">
                {t("noContentInstruction")}
              </p>
            </div>

            <Button color="secondary" onClick={handleRefresh}>
              {t("refresh")}
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default NoContent;
