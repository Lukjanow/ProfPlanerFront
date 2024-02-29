import { Select, SelectItem } from "@nextui-org/react"


export default function SelectBox({ title, items, isMuliple = false }) {
    const selectMode = isMuliple === true ? "multiple" : "single";
    return (
        <Select
            label={title}
            selectionMode={selectMode}
            isMultiline
        >
            {
                items.map((item, index) => (
                    <SelectItem key={index}>
                        {item}
                    </SelectItem>
                ))
            }
        </Select>
    )
}