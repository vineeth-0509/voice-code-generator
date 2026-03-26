import express from "express";
import { createProject, getProjectFiles, getProjects, updateProjectWithAI } from "../controllers/project.controller";

const router = express.Router();
router.post("/", createProject);
router.get("/", getProjects);
router.post("/:projectId/update", updateProjectWithAI);
router.get("/:projectId", getProjectFiles);
export default router;