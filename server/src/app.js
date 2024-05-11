// imports
import express from 'express';
import cors from 'cors';

// import routes (endpoints)
import { allHttpDogsRouter } from './routes/index.js';

// create an express app
const app = express();
const PORT = 3000;

// use middlewares
app.use(cors()); // Enable CORS (allowing requests from the client)
app.use(express.json()); // Parse JSON bodies

// use routes
app.use(allHttpDogsRouter);

// start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
