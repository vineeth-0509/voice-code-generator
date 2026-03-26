import { Request, Response } from "express";
import { createProjectService, getProjectsService } from "../services/project.service";
import { extractAppDetails } from "../services/ai.service";

export const createProject = async (req: Request, res: Response) => {
  try {
    const userId = req.headers["x-user-id"] as string;
    const email = req.headers["x-user-email"] as string;
    const { name,prompt } = req.body;
    const projectName = name || prompt.slice(0, 30);

    if (!userId || !prompt) {
      return res.status(400).json({ message: "Missing userid or prompt" });
    }

    const aiResponse = await extractAppDetails(prompt);
    const allowedTypes = ["todo", "blog", "portfolio", "chat"];
    const type = allowedTypes.includes(aiResponse?.type) ? aiResponse?.type : "todo";
    const project = await createProjectService(userId, 
      projectName,
       email, 
       type);
    res.status(201).json({project, ai: aiResponse});
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to create project",
    });
  }
};



export const getProjects = async (req:Request, res:Response)=>{
    try {
        
        const userId = req.headers["x-user-id"] as string;
        if(!userId){
            return res.status(400).json({
                message:"Missing userId"
            })
        }

        const projects = await getProjectsService(userId);
        res.status(200).json(projects);

    } catch (error: any) {
        res.status(500).json({
            error: error.message || "Failed to get projects"
        })
    }
}