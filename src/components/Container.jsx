import { Switch, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useState } from "react";


export function Container(props) {
  const [bodyVisibility, setBodyVisibility] = useState(props.showContentSwitch && props.showContentSwitch !== undefined ? false : true)

  return (
    <Card
      radius={"sm"}
      className={"m-10 p-5"}
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
        bodyVisibility ? <CardBody>{props.content}</CardBody> : <></>
      }
    </Card >
  );
}