import { useEffect, useState } from 'react';

/**
 * A custom hook that returns a boolean indicating whether the specified media query matches the current viewport.
 * @param {string} query - The media query to match against.
 * @returns {boolean} A boolean indicating whether the specified media query matches the current viewport.
 */
export default function useMediaQuery(query) {
    const getMatches = (query) => {
        // Prevents SSR issues
        if (typeof window !== 'undefined') {
            return window.matchMedia(query).matches;
        }
        return false;
    };
    const [matches, setMatches] = useState(getMatches(query));
    const handleChange = () => setMatches(getMatches(query));

    // Update matches state on change
    useEffect(() => {
        const matchMedia = window.matchMedia(query);

        // Triggered at the first client-side load and if the query changes
        setMatches(getMatches(query));

        // Listen matchMedia
        matchMedia.addEventListener('change', handleChange);

        // Clean up
        return () => matchMedia.removeEventListener('change', handleChange);
    }, [query]);

    return matches;
}
