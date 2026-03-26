import express from "express";
import { createProject, getProjects, updateProjectWithAI } from "../controllers/project.controller";

const router = express.Router();
router.post("/", createProject);
router.get("/", getProjects);
router.post("/:projectId/update", updateProjectWithAI);

export default router;