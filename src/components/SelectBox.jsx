import { Select, SelectItem } from "@nextui-org/react"


export default function SelectBox({ title, name, items, isMultiple = false, isRequired = false, onChange, selectedKeys, className, disallowEmptySelection = true }) {
    const selectMode = isMultiple === true ? "multiple" : "single";


    return (
        <Select
            label={title}
            selectionMode={selectMode}
            isMultiline
            isRequired={isRequired}
            name={name}
            disallowEmptySelection={disallowEmptySelection}
            onChange={onChange}
            selectedKeys={selectedKeys}
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