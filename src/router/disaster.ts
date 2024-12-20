import express from "express";
import {
    getDisastersHandler,
    createDisasterHandler,
} from "../controllers/disaster";

export default (router: express.Router) => {
    router.get("/", getDisastersHandler);
    router.post("/", createDisasterHandler);
};