import { SectionContainer } from "../components/SectionContainer";
import { Checkbox, CheckboxGroup, Input } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import PageContainer from "../components/PageContainer";


export default function ConflictsPage() {
    const { t } = useTranslation()

    return (
        <>
            <PageContainer title={t("conflicts")}>
                <SectionContainer title={"Beispiel-Kachel"}>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Input type="email" label="Email" />
                        <Input type="email" label="Email" placeholder="Enter your email" />
                    </div>
                    <CheckboxGroup
                        label="Select cities"
                        defaultValue={["buenos-aires", "london"]}
                    >
                        <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
                        <Checkbox value="sydney">Sydney</Checkbox>
                        <Checkbox value="san-francisco">San Francisco</Checkbox>
                        <Checkbox value="london">London</Checkbox>
                        <Checkbox value="tokyo">Tokyo</Checkbox>
                    </CheckboxGroup>
                </SectionContainer>
                <SectionContainer
                    title={"Beispiel-Container mit Switch"}
                    showContentSwitch={true}
                >
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Input type="email" label="Email" />
                        <Input type="email" label="Email" placeholder="Enter your email" />
                    </div>
                    <CheckboxGroup
                        label="Select cities"
                        defaultValue={["buenos-aires", "london"]}
                    >
                        <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
                        <Checkbox value="sydney">Sydney</Checkbox>
                        <Checkbox value="san-francisco">San Francisco</Checkbox>
                        <Checkbox value="london">London</Checkbox>
                        <Checkbox value="tokyo">Tokyo</Checkbox>
                    </CheckboxGroup>
                </SectionContainer>
                <SectionContainer>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Input type="email" label="Email" />
                        <Input type="email" label="Email" placeholder="Enter your email" />
                    </div>
                    <CheckboxGroup
                        label="Select cities"
                        defaultValue={["buenos-aires", "london"]}
                    >
                        <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
                        <Checkbox value="sydney">Sydney</Checkbox>
                        <Checkbox value="san-francisco">San Francisco</Checkbox>
                        <Checkbox value="london">London</Checkbox>
                        <Checkbox value="tokyo">Tokyo</Checkbox>
                    </CheckboxGroup>
                </SectionContainer >
            </PageContainer >
        </>
    )
}