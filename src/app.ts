/**
 * core imports
 */
// load environment variables
import dotenv from "dotenv";
dotenv.config();

import express, { Application, NextFunction, Request, Response } from "express";

import cors from "cors";
import bodyParser from "body-parser";

/**
 * bootstrap the app
 */

// create the Express app
const app: Application = express();

//TODO Remove this. It is only to check the bootstrap.
app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.json({ app: "is running" });
  next();
});

// CORS setup
var corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// start server
const PORT = process.env.NODE_ENV == "test" ? 0 : process.env.PORT || 7000;

const server = app.listen(PORT, () => {
  process.env.NODE_ENV != "test" &&
    console.log(`Server is listening on port ${PORT}`);
});

export default server;
export const closeServer = async () => {
  server.close();
};
