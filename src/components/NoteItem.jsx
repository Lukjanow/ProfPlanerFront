import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Button,
} from "@nextui-org/react";
import { FilledButton } from "../components/FilledButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NoteItem = ({ text, onDelete }) => {
  return (
    <Card className="max-w-[400px] mt-5">
      <CardBody className="flex flex-row items-start justify-between align-top">
        <p className="mr-2">{text}</p>
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
