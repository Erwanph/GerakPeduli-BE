import express from "express";
import {
    getDisastersHandler,
    createDisasterHandler,
} from "../controllers/disaster";

const router = express.Router();

router.get("/", getDisastersHandler);
router.post("/", createDisasterHandler);

export default router;
