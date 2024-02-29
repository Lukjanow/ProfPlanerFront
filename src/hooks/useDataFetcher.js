import {useEffect, useState} from "react";

function useDataFetcher(loadDataCallback) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchData() {
        setError(null);
        setIsLoading(true);

        try {
            const fetchedData = await loadDataCallback();
            setData(fetchedData);
        } catch (e) {
            console.error(e);
            setError(e);
        }

        setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return {data, isLoading, error};
}

export default useDataFetcher;
