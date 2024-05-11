import { useState, useEffect } from 'react';

/**
 * A custom hook to fetch data from a given URL.
 *
 * @param {string} url The URL to fetch data from.
 * @returns {{fetchedData: any, fetchStatus: 'before-fetch' | 'fetching' | 'after-fetch' | 'error', startFetch: (url: string) => void}} The fetched data, fetch status, and a function to start fetching data.
 */
export default function useFetch(url) {
    const [requestUrl, setRequestUrl] = useState(url);
    const [fetchedData, setFetchedData] = useState(null);
    const [fetchStatus, setFetchStatus] = useState('before-fetch'); // before-fetch, fetching, after-fetch, error

    useEffect(() => {
        if (!!requestUrl) {
            setFetchStatus('fetching');
            fetch(requestUrl)
                .then((response) => response.json())
                .then((data) => {
                    setFetchedData(data);
                })
                .catch(() => {
                    setFetchStatus('error');
                });
        }
    }, [requestUrl]);

    useEffect(() => {
        if (!!fetchedData) {
            setFetchStatus('after-fetch');
        }
    }, [fetchedData]);

    /**
     * A function to start fetching data from the given URL.
     *
     * @param {string} url The URL to fetch data from.
     */
    const startFetch = (url) => {
        if (!!url) {
            setRequestUrl(url);
        }
    };

    return {
        fetchedData,
        fetchStatus,
        startFetch,
    };
}
