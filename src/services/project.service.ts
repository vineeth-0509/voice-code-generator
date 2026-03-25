import { prisma } from "../lib/prisma";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;

export const createProjectService = async (
  userId: string,
  name: string,
  email?: string,
) => {
  try {

    await prisma.user.upsert({
        where:{
            id: userId 
        },
        update:{},
        create:{
            id: userId,
            email : email || `${userId}@test.com`,
        }
    });

    if (email !== ADMIN_EMAIL) {
      const count = await prisma.project.count({
        where: {
          userId,
        },
      });

      if (count >= 2) {
        throw new Error("You have reached the maximum limit of projects");
      }
    }
      const project = await prisma.project.create({
        data: {
          name,
          userId,
        },
      });

      return project;
    
  } catch (error) {
    console.error("Prisma error", error);
   throw error;
  }
};

export const getProjectsService = async (userId: string) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return projects;
  } catch (error) {
    throw new Error("Failed to get projects");
  }
};
