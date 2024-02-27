import {useEffect, useState} from "react";

function useDataFetcher(setData) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchData() {
        setError(null);
        setIsLoading(true);
        try {
            await setData();
        } catch (e) {
            console.error(e);
            setError(e.message);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return {isLoading, error};
}

export default useDataFetcher;
