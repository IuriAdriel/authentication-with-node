import "reflect-metadata";
import { AppDataSource } from "./infra/config/DataSource";
const express = require("express");
const app = express();
import userRoute from "./application/route/UserRoute";
import authRoute from "./application/route/AuthRoute";
const bodyParser = require("body-parser");

AppDataSource.initialize()
    .then(async () => {
        app.use(bodyParser.json());
        app.use("/", userRoute);
        app.use("/", authRoute);
    })
    .catch((error) => console.log(error));

export default app;
