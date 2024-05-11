import { HTTP_DOG_API_URL, HTTP_DOG_API_ENDPOINTS } from '../utils/index.js';

/**
 * A middleware function that fetches data from the Dog API.
 *
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @param {import('express').NextFunction} next - The next function.
 *
 * @returns {Promise<void>} A promise that resolves once the middleware is complete.
 *
 * @remarks The fetched data is attached to the `res.locals` object as `httpDogs`.
 */
export const fetchHttpDogs = async (req, res, next) => {
    try {
        // Make a request to each endpoint in the Dog API simultaneously.
        const promises = HTTP_DOG_API_ENDPOINTS.map(async (endpoint) =>
            fetch(`${HTTP_DOG_API_URL}${endpoint}.json`).then((response) => response.json())
        );

        // Wait for all of the requests to complete.
        const responses = await Promise.all(promises);

        // Once all the results are available, attach them to the `res.locals` object as `httpDogs`.
        res.locals.httpDogs = responses;

        // Move on to the next middleware.
        next();
    } catch (e) {
        // If an error occurs, send a 500 status code and the error message.
        res.status(500).json({
            error: `An error occurred while fetching the data from http.dog API: ${e.message}`,
        });
    }
};
