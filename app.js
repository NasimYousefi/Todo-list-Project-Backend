

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { EXPRESS_APP } from "./src/core/config/index.js";
import {router as userRouter} from './src/modules/users/routes.js';
import {router as taskRouter} from './src/modules/tasks/routes.js';
import { logger } from './src/core/middleware/logger.js';
import { auth } from './src/core/middleware/authorization.js';
import { notFound } from './src/core/middleware/notFound.js';
import { closeConnection } from "./src/core/database/database-handler.js";

const app = express();
app.use(cors());
app.use(express.json());

// // Serve static files from the public directory
// app.use(express.static('public'));
app.use(logger);
app.use(auth);
app.use('/api/user',userRouter);
app.use('/api/tasks', taskRouter);
app.use(notFound);

const serverPort = EXPRESS_APP.PORT || 3000;
app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  closeConnection();
  process.exit(0);
});
