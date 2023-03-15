import express, { Application } from "express";
import "express-async-errors";
import { handleErrors } from "./errors";
import { loginRoutes } from "./routes/login.routes";
import { registerRoutes } from "./routes/register.routes";

const app: Application = express();
app.use(express.json());

app.use("/login", loginRoutes);
app.use("/register", registerRoutes);

app.use(handleErrors);

export default app;
