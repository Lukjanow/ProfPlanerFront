import React, { useState } from 'react';
import { Card, CardFooter, ScrollShadow } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

export function ConflictDisplay(data) {
    const { t } = useTranslation()
    const conflict_list = data.data;
    const list = conflict_list;
    // const [cardStates, setCardStates] = useState([]);
    const [conflictIgnoreList, setConflictIgnoreList] = useState([]);

    // useEffect(() => {
    //   const newCardStates = [...cardStates];
    //   newCardStates.push("secondary");
    //   setCardStates(newCardStates);
    // }, [list.length]);


    return (
        <ScrollShadow size={35} className={"max-h-full space-y-2"}>
            {list.map((item, index) => (
                <Card shadow="sm" radius={"sm"} key={index} isPressable onPress={() => {
                    // const newCardStates = [...cardStates];
                    // // Umschalten der Farbe zwischen "white" und "secondary."
                    // newCardStates[item.id] = cardStates[item.id] === "white" ? "secondary" : "white";
                    // console.log("ONPRESS: ", newCardStates)
                    // setCardStates(newCardStates);
                    var newConflictIgnoreList = [...conflictIgnoreList];
                    if (newConflictIgnoreList.includes(item.id)) {
                        newConflictIgnoreList.splice(newConflictIgnoreList.indexOf(item.id), 1)
                    } else {
                        newConflictIgnoreList.push(item.id)
                    }
                    setConflictIgnoreList(newConflictIgnoreList);
                }}
                >
                    <CardFooter className={`text-small justify-between grid grid-rows-2 h-full bg-${
                        //   cardStates[item.id] === "white"
                        //     ? "white"
                        //     : "secondary"
                        conflictIgnoreList.includes(item.id)
                            ? "white"
                            : "secondary"
                        }`}>

                        <b>{item.error_message}</b>
                        <b className="font-normal">{item.module_string}</b>
                    </CardFooter>
                </Card>
            ))}
        </ScrollShadow>
    );
}
