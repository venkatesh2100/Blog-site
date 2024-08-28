import { Hono } from "hono";
import { verify } from "hono/jwt";
import { Bindings } from "hono/types";

interface bidings {
  DATABASE_URL: string;
  JWT_TOKEN: string;
}

export const blogRouter = new Hono<{Bindings:bidings}>();

blogRouter.post("/api/v1/blog/*", async (c) => {
  // verify the header and proced the data according to verfication
  const header = c.req.header("authorization") || "";
  const token = header.split("")[1];

  const response = await verify(token, c.env.JWT_TOKEN);

  if (response.id) {
    next();
  } else {
    c.status(403);
    return c.json({
      error: "AUTH",
    });
  }

  return c.text("HELLI");
});

blogRouter.post("/api/v1/blog", (c) => {
  return c.text("Hello post");
});
blogRouter.put("/api/v1/blog", (c) => {
  return c.text("Hello put blog");
});
blogRouter.get("/api/v1/blog/:id", (c) => {
  return c.text("Hello get ID");
});
blogRouter.get("/api/v1/blog/bulk", (c) => {
  return c.text("Hello get bulk");
});

export default blogRouter;
function next() {
  throw new Error("Function not implemented.");
}
