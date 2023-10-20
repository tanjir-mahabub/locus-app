import { Router } from "express";
import app from "../app";
import locusController from "../controllers/locusController";

const router = Router();

router.get('/locus', locusController);

export default router;