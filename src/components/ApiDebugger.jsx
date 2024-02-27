import {Button, Card, CardBody, CardHeader} from "@nextui-org/react";
import useDataFetcher from "../hooks/useDataFetcher.js";
import {useModuleStore} from "../stores/moduleStore.js";

export function ApiDebugger() {
    const setModuleList = useModuleStore(state => state.setModuleList);
    const moduleList = useModuleStore(state => state.moduleList);
    const {isLoading, error} = useDataFetcher(setModuleList);

    async function sendReq() {
        console.log("sending request");
        await setModuleList();
        console.log("response received");
    }

    return (
        <>

            <Button onClick={sendReq}>Send request</Button>

            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            {moduleList && moduleList.map(module => (
                <Card key={module.id}>
                    <CardHeader className="flex gap-3">
                        <div className="flex flex-col">
                            <p className="text-md">{module.name}</p>
                            <p className="text-small text-default-500">{module.id}</p>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <p>id: {module.id}</p>
                        <p>name: {module.name}</p>
                        <p>dozent: {module.dozent}</p>
                        <p>room: {module.room}</p>
                        <p>studySemester: {module.studySemester}</p>
                        <p>duration: {module.duration}</p>
                        <p>approximateAttendance: {module.approximateAttendance}</p>
                        <p>need: {module.need}</p>
                        <p>type: {module.type}</p>
                        <p>frequency: {module.frequency}</p>
                        <p>selected: {module.selected ? "true" : "false"}</p>
                    </CardBody>
                </Card>
            ))}
        </>
    );
}
