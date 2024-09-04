import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { authMiddleWare } from "../middlewares/authMiddleware.";
import { createBlog, updateBlog } from "@venkatesh2100/medium-common";
import { prismaCreate } from "../middlewares/primsaCreate";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    prisma: PrismaClient;
    userId: string;
  };
}>();

app.use("/*", prismaCreate);

app.post("/", authMiddleWare, async (c) => {
  const prisma = c.get("prisma");
  console.log("Prisma instance:", prisma);
  const authorId = c.get("userId");
  console.log("User ID:", authorId);
  const body = await c.req.json();
  const { success } = createBlog.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      error: "not a valid inputs",
    });
  }
  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      published: true,
      authorId,
    },
  });

  return c.json({
    id: blog.id,
  });
});

app.put("/", authMiddleWare, async (c) => {
  const prisma = c.get("prisma");
  const authorId = c.get("userId");
  const body = await c.req.json();
  const { success } = updateBlog.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      error: "not a valid inputs",
    });
  }
  try {
    const blog = await prisma.post.update({
      where: {
        id: body.id,
        authorId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({
      id: blog.id,
    });
  } catch (error) {
    c.status(403);
    return c.json({
      error: "not a valid author/user",
    });
  }
});

app.get("/bulk",async (c) => {
  const prisma = c.get("prisma");
  const blogs = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return c.json({
    blogs
  });
});

app.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = c.get("prisma");

  // Debugging: Check the received ID
  console.log("Received ID:", id);
  const blog = await prisma.post.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  // Debugging: Check if a blog was found
  if (!blog) {
    console.log("Blog not found for ID:", id);
    c.status(404);
    return c.json({
      error: "Blog not found",
    });
  }

  return c.json({
    blog,
  });
});


export default app;
