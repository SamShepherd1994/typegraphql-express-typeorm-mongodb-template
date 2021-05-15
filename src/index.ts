/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as dotenv from "dotenv";
// Must be done as early as possible
dotenv.config();
import * as express from "express";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import * as cors from "cors";
import * as chalk from "chalk";
import * as http from "http";
import * as helmet from "helmet";
import * as compression from "compression";

// Set some environmental variables
const SERVER_PORT = process.env.PORT || 3500;
export const serverUrl =
    process.env.NODE_ENV === "development"
        ? `http://localhost:${SERVER_PORT}`
        : "";

// Create an express server
const app = express();

if (process.env.NODE_ENV === "production") {
    app.use(helmet());
    app.use(compression());
}

// Add support for CORS
app.use(cors());

async function start() {
    await createConnection();
    const httpServer = http.createServer(app);
    httpServer.listen(SERVER_PORT, () => {
        console.log(
            `${chalk.cyan("Server")} running at ${chalk.green(`${serverUrl}`)}`
        );
    });
    httpServer.setTimeout(30000);
}

start()
    .then(async () => {
        console.log("Inserting a new user into the database...");
        const user = new User();
        user.firstName = "Timber";
        user.lastName = "Saw";
        user.age = 25;
        //await user.save({});
        console.log("Saved a new user with id: " + user.id);

        console.log("Loading users from the database...");
        const allUsers = await User.find();
        const firstUser = await User.findOne(1);
        console.log("Loaded users: ", allUsers);

        console.log(
            "Here you can setup and run express/koa/any other framework."
        );
    })
    .catch((error) => console.log(error));
