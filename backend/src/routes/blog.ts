import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_TOKEN: string;
  },
  Variables: {
    userId: string;
  }
}>();

// Middleware
blogRouter.use("/*", async (c) => {
  // Verify the header and proceed with the data according to verification
  const header = c.req.header("authorization") || "";
  const token = header.split(" ")[1];

  const response = await verify(token, c.env.JWT_TOKEN);

  if (response) {
    // @ts-ignore
    c.set("userId", response.id);
    //@ts-ignore
    return await c.next();
  } else {
    c.status(403);
    return c.json({
      error: "AUTH error, you are logged out",
    });
  }
});

// Example route
blogRouter.get("/some-route", (c) => {
  return c.text("HELLO");
});


blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const authorId=c.get("userId")
  const body = await c.req.json();
  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: (authorId),
      },
    });

    return c.json({
      id: post.id,
    });
  } catch (e) {
    c.status(411);
    return c.text("Error occur while create the post");
  }
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  try {
    const post = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
        authorId: "1",
      },
    });

    return c.json({
      id: post.id,
    });
  } catch (e) {
    c.status(411);
    return c.text("Error occur while updating the post");
  }
});
blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  try {
    const post = await prisma.post.findFirst({
      where: {
        id: body.id,
      },
    });

    return c.json({
      post,
    });
  } catch (e) {
    c.status(411);
    return c.text("Error occur while render the post");
  }
});


blogRouter.get("/bulk", async(c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  try {
    const posts = await prisma.post.findMany({
    });

    return c.json({
      posts
    });
  } catch (e) {
    c.status(411);
    return c.text("Error occur while renderthe posts");
  }

});

export default blogRouter;
function next() {
  throw new Error("Function not implemented.");
}
