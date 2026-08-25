import { Router, type IRouter } from "express";
import healthRouter from "./health";
import propertiesRouter from "./properties";
import leadsRouter from "./leads";
import dashboardRouter from "./dashboard";

const router: IRouter = Router();

router.use(healthRouter);
router.use(propertiesRouter);
router.use(leadsRouter);
router.use(dashboardRouter);

export default router;
