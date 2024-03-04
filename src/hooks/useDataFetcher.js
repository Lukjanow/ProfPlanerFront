import {useCallback, useState} from "react";
import {debug} from "../config.js";

export default function useDataFetcher(doOnDataLoad) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const executor = useCallback(async () => {
        debug.active && console.log("useDataFetcher: Request started...");

        if (isLoading) {
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            setData(await doOnDataLoad());
            debug.active && console.log("useDataFetcher: Request finished!");
            setIsLoading(false);

        } catch (e) {
            setIsLoading(false);
            debug.active && console.log("useDataFetcher: Request failed!");

            console.error(e);
            setError(e);
        }

    }, [data, isLoading, error]);

    return {data, isLoading, error, executor};
}
