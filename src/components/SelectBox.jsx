import { Select, SelectItem } from "@nextui-org/react"


export default function SelectBox({ title, name, items, isMultiple = false, isRequired = false, onChange, className, disallowEmptySelection = true, defaultSelectedKeys }) {
    const selectMode = isMultiple === true ? "multiple" : "single";


    return (
        <Select
            label={title}
            selectionMode={selectMode}
            isMultiline
            isRequired={isRequired}
            name={name}
            defaultSelectedKeys={defaultSelectedKeys}
            disallowEmptySelection={disallowEmptySelection}
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