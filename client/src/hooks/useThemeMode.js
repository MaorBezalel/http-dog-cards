import { useEffect } from 'react';
import { useLocalStorage, useMediaQuery } from '@hooks';

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';

/**
 * A hook that manages the theme mode of the application (light or dark mode).
 * @param {'light' | 'dark'} initialThemeMode - The initial theme mode to use. If not provided, the hook will attempt to determine the preferred theme mode based on the user's system settings.
 * @returns {{ getThemeMode: () => 'light' | 'dark', setToLight: () => void, setToDark: () => void, toggle: () => void }} An object containing functions to get the current theme mode, set the theme mode to light, set the theme mode to dark, and toggle the theme mode between light and dark.
 */
export default function useThemeMode(initialThemeMode) {
    const preferredThemeMode = useMediaQuery(COLOR_SCHEME_QUERY) ? 'dark' : 'light';
    const [_, themeMode, setThemeMode] = useLocalStorage('themeMode', initialThemeMode ?? preferredThemeMode);

    // Set the data-theme attribute on the HTML element on mount and whenever the theme mode changes
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', themeMode);
    }, [themeMode]);

    /**
     * @returns {'light' | 'dark'} The current theme mode.
     */
    const getThemeMode = () => themeMode;

    /**
     * Sets the theme to light mode regardless of what it is currently set to.
     */
    const setToLight = () => {
        setThemeMode('light');
    };

    /**
     * Sets the theme to dark mode regardless of what it is currently set to.
     */
    const setToDark = () => {
        setThemeMode('dark');
    };

    /**
     * Toggles the current theme mode between 'light' and 'dark'.
     */
    const toggle = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light');
    };

    return { getThemeMode, setToLight, setToDark, toggle };
}
