import "reflect-metadata";
import { AppDataSource } from "./infra/config/DataSource";
const express = require("express");
const app = express();
import userRoute from "./presentation/route/UserRoute";
import authRoute from "./presentation/route/AuthRoute";
import userPasswordResetRoute from "./presentation/route/UserPasswordResetRoute";
const bodyParser = require("body-parser");

AppDataSource.initialize()
    .then(async () => {
        app.use(bodyParser.json());
        app.use("/", userRoute);
        app.use("/", authRoute);
        app.use("/", userPasswordResetRoute);
    })
    .catch((error) => console.log(error));

export default app;
