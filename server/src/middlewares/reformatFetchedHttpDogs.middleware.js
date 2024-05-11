/**
 * A middleware function that reformats the fetched data from the Dog API.
 *
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @param {import('express').NextFunction} next - The next function.
 *
 * @remarks
 * - The fetched data is expected to be attached to the `res.locals` object as `httpDogs`.
 * - The reformatted data is attached to the `res.locals` object as `reformattedHttpDogs`.
 */
export const reformatFetchedHttpDogs = (req, res, next) => {
    try {
        // Extract the `httpDogs` array from the `res.locals` object.
        const { httpDogs } = res.locals;

        // If the `httpDogs` array is not an array, throw an error.
        if (!Array.isArray(httpDogs)) {
            throw new TypeError(
                `Expected 'httpDogs' to be an array, but received ${typeof httpDogs}.`
            );
        }

        // Reformat each response object in the `httpDogs` array.
        const results = httpDogs.map((res) => {
            return {
                image: res.image.jpg,
                status_code: res.status_code,
                description: res.title,
            };
        });

        // Attach the reformatted results to the `res.locals` object as `reformattedHttpDogs`.
        res.locals.reformattedHttpDogs = results;

        // Move on to the next middleware.
        next();
    } catch (e) {
        // If an error occurs, send a 500 status code and the error message.
        res.status(500).json({
            error: `An error occurred while reformatting the data from http.dog API: ${e.message}`,
        });
    }
};
