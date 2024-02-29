import { Switch, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useState } from "react";


export function SectionContainer(props) {
  const [bodyVisibility, setBodyVisibility] = useState(props.showContentSwitch && props.showContentSwitch !== undefined ? false : true)

  return (
    <Card
      radius={"sm"}
      className={"p-5"}
    >
      {
        props.showContentSwitch || props.title !== undefined ?
          <CardHeader className="flex flex-row gap-2">
            {
              props.showContentSwitch ?
                <Switch
                  size={"sm"}
                  isSelected={bodyVisibility}
                  onValueChange={setBodyVisibility}
                /> :
                <></>
            }
            {
              props.title !== undefined ?
                <h2
                  className={"text-2xl font-bold"}>
                  {props.title}
                </h2> :
                <></>

            }
          </CardHeader> :
          <></>
      }
      {
        bodyVisibility ? <CardBody className="gap-5">{props.children}</CardBody> : <></>
      }
    </Card >
  );
}