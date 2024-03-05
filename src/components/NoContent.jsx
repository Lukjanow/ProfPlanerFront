import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody, Button } from "@nextui-org/react";
import React from "react";

const NoContent = () => {
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
                No Content Available!
              </h2>
              <p className="text-base text-center">
                You can attempt to add new data using the button above. If data
                exists but isn't displayed, try refreshing the page.
              </p>
            </div>

            <Button color="secondary" onClick={handleRefresh}>
              Refresh
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default NoContent;
