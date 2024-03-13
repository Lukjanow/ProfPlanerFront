import React from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NoteItem = ({ text, onDelete }) => {
  return (
    <Card shadow={"sm"} className="m-1 mt-3">
      <CardBody className="flex flex-row gap-5 items-start justify-between align-top">
        <p>{text}</p>
        <Button
          isIconOnly
          color="primary"
          variant="faded"
          aria-label="Delete a Note"
          onClick={onDelete}
        >
          <FontAwesomeIcon icon={"trash"} />
        </Button>
      </CardBody>
    </Card>
  );
};

export default NoteItem;
