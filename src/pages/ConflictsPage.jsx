import { Container } from "../components/Container";
import { Checkbox, CheckboxGroup, Input } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import PageContainer from "../components/PageContainer";


export default function ConflictsPage() {
    const { t } = useTranslation()

    return (
        <>
            <PageContainer title={t("conflicts")}>
                <Container
                    title={"Beispiel-Kachel"}
                    content={
                        <>
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
                        </>
                    }
                />
                <Container
                    title={"Beispiel-Kachel"}
                    content={
                        <>
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
                        </>
                    }
                />
            </PageContainer>
            {/* <h1 className="font-poppins font-semibold text-[48px]">{t("conflicts")}</h1>
            <Container
                title={"Beispiel-Kachel"}
                content={
                    <>
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
                    </>
                }
            />
            <Container
                title={"Beispiel-Container mit Switch"}
                content={
                    <>
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
                    </>
                }
                showContentSwitch={true}
            />
            <Container
                content={
                    <>
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
                    </>
                }
            /> */}
        </>
    )
}