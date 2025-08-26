import { Router } from "express";
import taskRoute from "./task.route";

const routes = Router();

routes.use('/task', taskRoute);

export default routes;