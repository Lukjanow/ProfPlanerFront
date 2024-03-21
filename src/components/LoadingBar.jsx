import {Card, CardBody, Progress} from "@nextui-org/react"

export default function LoadingBar({ message = t("message") }) {
    return (
        <Card
            className={"fixed top-3 left-2/4 translate-x-[-40%] z-[100] h-11 pr-6 min-w-[300px]"}
            shadow={"sm"}
            radius={"sm"}
        >
            <CardBody className={"ml-2 flex gap-2 items-center p-0"}>
                <p className="mt-1">{message}</p>
                <Progress
                    size="sm"
                    isIndeterminate
                    aria-label="Loading..."
                />
            </CardBody>
        </Card>
    )
}
