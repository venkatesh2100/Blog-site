import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

interface bidings {
  DATABASE_URL: string;
  JWT_SECRET: string;
}
export const userRouter = new Hono<{ Bindings: bidings }>();

//Signup route
userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  WT_SECRET);
    return c.son({
      jwt: token,
    });
  } catch (e) {
    c.status(403);
    return c.text("User Exists");
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  //check wheter the  userfound
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json("Invalid Username or Password? Forgot password");
    }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      jwt: token,
    });
  } catch (error) {
    c.status(500);
    return c.json("Error occured while processing the request ");
  }
});
