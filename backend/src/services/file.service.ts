import { blogTemplate } from "../templates/blog.template";
import { chatTemplate } from "../templates/chat.template";
import { portfolioTemplate } from "../templates/portfolio.template";
import { todoTemplate } from "../templates/todo.template";
import { prisma } from "../lib/prisma";

export const createFilesForProject = async (
  projectId: string,
  type: string,
) => {
  let template;
  switch (type) {
    case "blog":
      template = blogTemplate;
      break;

    case "portfolio":
      template = portfolioTemplate;
      break;

    case "chat":
      template = chatTemplate;
      break;

    default:
      template = todoTemplate;
  }
  await prisma.file.createMany({
    data: todoTemplate.map((file) => ({
      ...file,
      projectId,
    })),
  });
};
