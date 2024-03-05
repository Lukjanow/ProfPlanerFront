import useDataFetcher from "../hooks/useDataFetcher.js";
import {useEffect} from "react";
import {useModuleStore} from "../stores/moduleStore.js";
import {Button, Card, CardBody, CardHeader, CircularProgress, Code, Divider, Spacer} from "@nextui-org/react";
import {useDozentStore} from "../stores/dozentStore.js";
import {useRoomStore} from "../stores/roomStore.js";
import {RoomModel} from "../models/roomModel.js";

export default function ApiDebugger() {

    const {
        data: moduleList,
        isLoading: moduleListIsLoading,
        error: moduleListError,
        executor: moduleListExecutor
    } = useDataFetcher(async () => {
        await useModuleStore.getState().initModuleList();
        return useModuleStore.getState().moduleList;
    });

    const {
        data: dozent,
        isLoading: dozentIsLoading,
        error: dozentError,
        executor: dozentExecutor
    } = useDataFetcher(async () => {
        return useDozentStore.getState().getDozentById("65d706915c208e7fd4abebab");
    });

    const {
        data: room,
        isLoading: roomIsLoading,
        error: roomError,
        executor: roomExecutor,
    } = useDataFetcher(async () => {
        return useRoomStore.getState().addRoom(new RoomModel("N144", 5, 2));
    });

    useEffect(() => {
        dozentExecutor();
        moduleListExecutor();
    }, []);

    return (
        <>





            {/*SHOW PROGRESS WHEN DATA IS LOADING*/}

            {(moduleListIsLoading || dozentIsLoading || roomIsLoading) &&
                <CircularProgress className="absolute top-1/2 left-1/2" color="success" aria-label="Loading..."/>}











            {/*{PRINT ERRORS}*/}

            <div className="flex flex-col">
                {moduleListError && <Code color="danger">Error: {moduleListError.toString()}</Code>}
                {dozentError && <Code color="danger">Error: {dozentError.toString()}</Code>}
                {roomError && <Code color="danger">Error: {roomError.toString()}</Code>}
            </div>








            {/*CREATE ROOM BUTTON*/}

            <Button onClick={roomExecutor}>Create room</Button>
            {room &&
                <Card>
                    <CardHeader className="flex gap-3">
                        <div className="flex flex-col">
                            <p className="text-md">{room.name}</p>
                            <p className="text-small text-default-500">_id: {room._id}</p>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <p>_id: {room._id}</p>
                        <p>name: {room.name}</p>
                        <p>capacity: {room.capacity}</p>
                        <p>equipment: {room.equipment ? room.equipment : "null"}</p>
                    </CardBody>
                </Card>
            }












            {/*SPACE BETWEEN CREATE ROOM BUTTON AND DOZENT*/}

            <Spacer y={4}/>
            <Divider/>
            <Spacer y={4}/>











            {/*DOZENT*/}

            {dozent &&
                <Card>
                    <CardHeader className="flex gap-3">
                        <div className="flex flex-col">
                            <p className="text-md">{dozent.name}</p>
                            <p className="text-small text-default-500">_id: {dozent._id}</p>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <p>_id: {dozent._id}</p>
                        <p>name: {dozent.name}</p>
                        <p>e_mail: {dozent.e_mail}</p>
                        <p>title: {dozent.title}</p>
                        <p>intern: {dozent.intern ? "true" : "false"}</p>
                    </CardBody>
                </Card>
            }










            {/*SPACE BETWEEN DOZENT AND MODULE-LIST*/}

            <Spacer y={4}/>
            <Divider/>
            <Spacer y={4}/>














            {/*MODULE-LIST*/}

            {moduleList && moduleList.map(module => (
                <Card key={module._id}>
                    <CardHeader className="flex gap-3">
                        <div className="flex flex-col">
                            <p className="text-md">{module.name}</p>
                            <p className="text-small text-default-500">_id: {module._id}</p>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <p>_id: {module._id}</p>
                        <p>name: {module.name}</p>
                        <p>code: {module.code}</p>
                        <p>dozent: {module.dozent[0].name} | {module.dozent[0].e_mail}</p>
                        {module && module.room && <p>room: {module.room.name}</p>}
                        {module && module.study_semester && <p>study_semester: {module.study_semester[0].name}</p>}
                        <p>duration: {module.duration}</p>
                        <p>approximate_attendance: {module.approximate_attendance}</p>
                        <p>need: {module.need === null ? "null" : module.need}</p>
                        <p>type: {module.type}</p>
                        <p>frequency: {module.frequency}</p>
                        <p>selected: {module.selected ? "true" : "false"}</p>
                        <p>color: {module.color === null ? "null" : module.color}</p>
                        <p>note: {module.note === null ? "null" : module.note}</p>
                        <p>groups: {module.groups === null ? "null" : module.groups}</p>
                    </CardBody>
                </Card>
            ))}
        </>
    );
}
