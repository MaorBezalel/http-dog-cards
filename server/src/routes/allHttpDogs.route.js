import { Router } from 'express';
import { fetchHttpDogs, reformatFetchedHttpDogs } from '../middlewares/index.js';

const router = Router();

router.get('/allHttpDogs', fetchHttpDogs, reformatFetchedHttpDogs, async (req, res) => {
    try {
        // Extract the `reformattedHttpDogs` array from the `res.locals` object.
        const { reformattedHttpDogs } = res.locals;

        // If the `reformattedHttpDogs` array is not an array, throw an error.
        if (!Array.isArray(reformattedHttpDogs)) {
            throw new TypeError(
                `Expected 'reformattedHttpDogs' to be an array, but received ${typeof reformattedHttpDogs}.`
            );
        }

        // Send the reformatted data to the client.
        res.status(200).json(reformattedHttpDogs);
    } catch (e) {
        // If an error occurs, send a 500 status code and the error message.
        res.status(500).send({
            error: `An error occurred while preparing the data for the client: ${e.message}`,
        });
    }
});

export default router;
