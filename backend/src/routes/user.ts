import { PrismaClient } from "@prisma/client/edge";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { prismaCreate } from "../middlewares/primsaCreate";
import { signinInput, signupInput } from "@venkatesh2100/medium-common";

interface Bindings {
  DATABASE_URL: string;
  JWT_SECRET: string;
}
interface PrismaVars {
  prisma: PrismaClient;
}

export const userRouter = new Hono<{
  Bindings: Bindings;
  Variables: PrismaVars;
}>();

// Middleware to create the Prisma instance
userRouter.use("/*", prismaCreate);

// Signup route
userRouter.post("/signup", async (c) => {
  const prisma = c.get("prisma");
  const body: {
    username: string;
    password: string;
    name?: string;
  } = await c.req.json();

  // Error check block
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(403);
    return c.json({
      message: "Incorrect Inputs BRO",
    });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: body.username,
        password: body.password,
        name: body.name || body.username.split("@")[0],
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      message: "Signup successful!",
      jwt: token, // Send JWT token in the response
    });
  } catch (e) {
    c.status(403);
    return c.text("User already exists");
  }
});

// Signin route
userRouter.post("/signin", async (c) => {
  const prisma = c.get("prisma");
  const body: {
    username: string;
    password: string;
  } = await c.req.json();

  // Validate input
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Wrong Inputs Bro 👷" });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.username,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({
        message: "Invalid Username or Password. Forgot password?",
      });
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json( token );
  } catch (error) {
    c.status(500);
    return c.json({ message: "Error occurred while processing the request." });
  }
});
