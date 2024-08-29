import { Hono } from "hono";
import blogRouter from "./routes/blog";
import { userRouter } from "./routes/user";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
interface bidings{
  DATABASE_URL: string;
  JWT_TOKEN: string;

}
const app = new Hono<{
  Bindings: bidings
}>();

// app.route("/api/v1/user",userRouter);
// app.route("/api/v1/blog",blogRouter);
userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        username: body.username,
      },
    });
    const token = await sign({ id: user.id }, c.env.JWT_TOKEN);
    // return c.text("SignedUp")
    return c.json({
      jwt: token,
    });
  } catch (e) {
    c.status(403);
    return c.text("User Exists");
  }
  //create a new user by Prisma in psql
  // return c.text("Hello singup route");
});