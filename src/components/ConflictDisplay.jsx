import React, { useState } from 'react';
import { ScrollShadow } from "@nextui-org/react";
import ConflictItem from './ConflictItem';

export function ConflictDisplay(data) {
    const conflict_list = data.data;
    const list = conflict_list;
    const [conflictIgnoreList, setConflictIgnoreList] = useState([]);


    return (
        <ScrollShadow size={35} className={"max-h-full overflow-y-auto space-y-2 p-[1px]"}>
            {list.map((item, index) => (
                <ConflictItem
                    key={index}
                    content={item}
                    isIgnored={conflictIgnoreList.includes(item.id) ? true : false}
                    onPress={() => {
                        var newConflictIgnoreList = [...conflictIgnoreList];
                        if (newConflictIgnoreList.includes(item.id)) {
                            newConflictIgnoreList.splice(newConflictIgnoreList.indexOf(item.id), 1)
                        } else {
                            newConflictIgnoreList.push(item.id)
                        }
                        setConflictIgnoreList(newConflictIgnoreList);
                    }}
                />
            ))}
        </ScrollShadow>
    );
}
