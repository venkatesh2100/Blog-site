import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

interface bidings {
  DATABASE_URL: string;
  JWT_TOKEN: string;
}



export const userRouter = new Hono<{ Bindings: bidings }>();

//Signup route
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

userRouter.post("/signin", async (c) => {
  // Intialize the prisma
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  //check wheter the  userfound
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json("Invalid Username or Password? Forgot password");
    }
    const token = await sign({ id: user.id }, c.env.JWT_TOKEN);
    return c.json({
      jwt: token,
    });
  } catch (error) {
    c.status(500);
    return c.json("Error occured while processing the request ");
  }
  // return c.text("Hello singin route");
});
