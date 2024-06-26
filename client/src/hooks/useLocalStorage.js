import { useState, useEffect } from 'react';

/**
 * A hook that allows storing and retrieving data from local storage.
 * @template T The type of the value to be stored in local storage.
 * @param {string} key The key to be used for storing and retrieving the value from local storage.
 * @param {T} initialValue The initial value to be stored in local storage if the key is not already present.
 * @returns {[string, T, (value: T) => void]} A tuple containing the key, the stored value, and a function to update the stored value.
 */
export default function useLocalStorage(key, initialValue) {
    const modifiedKey = `${window.location.pathname}:${key}`; // Ensures that the key is unique to the current page (useful when hosting on GitHub Pages)
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const itemInStorage = window.localStorage.getItem(modifiedKey);

            // prettier-ignore
            return itemInStorage !== null
                ? JSON.parse(itemInStorage)
                : initialValue instanceof Function
                    ? initialValue()
                    : initialValue;
        } catch (error) {
            console.error(`Error while trying to retrieve data from local storage: ${error}`);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            // prettier-ignore
            const valueToStore = storedValue instanceof Function 
                ? storedValue() 
                : storedValue;

            window.localStorage.setItem(modifiedKey, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error while trying to store data in local storage: ${error}`);
        }
    }, [storedValue]);

    return [modifiedKey, storedValue, setStoredValue];
}
