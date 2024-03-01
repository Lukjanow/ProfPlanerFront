import { Select, SelectItem } from "@nextui-org/react"


export default function SelectBox({ title, name, items, isMuliple = false, isRequired = false, onChange, className }) {
    const selectMode = isMuliple === true ? "multiple" : "single";
    return (
        <Select
            label={title}
            selectionMode={selectMode}
            isMultiline
            isRequired={isRequired}
            name={name}
            onChange={onChange}
            className={className}
        >
            {
                items.map(item => (
                    <SelectItem value={item} key={item}>
                        {item}
                    </SelectItem>
                ))
            }
        </Select>
    )
}