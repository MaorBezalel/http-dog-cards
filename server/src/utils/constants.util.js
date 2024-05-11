import { range } from '../utils/index.js';

/**
 * The base URL for the Dog API.
 */
export const HTTP_DOG_API_URL = 'https://http.dog/';

/**
 * An array of HTTP status codes that are used by the Dog API as endpoints.
 *
 * @type {number[]}
 */
export const HTTP_DOG_API_ENDPOINTS = [].concat(
    range(100, 103), // Informational
    range(200, 208).concat([226]), // Success
    range(300, 308), // Redirection
    range(400, 418).concat(range(421, 426), range(428, 431), [451]), // Client Errors
    range(500, 508).concat([510, 511]) // Server Errors
);
