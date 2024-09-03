import { PrismaClient } from "@prisma/client/edge";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { prismaCreate } from "../middlewares/primsaCreate";
// import { signinInput, signupInput } from "@venkatesh2100/medium-common";
import { signinInput,signupInput } from "@ajeetkumarnpm/medium-common-final";  

interface bidings {
  DATABASE_URL: string;
  JWT_SECRET: string;
}
interface prisma {
  prisma: PrismaClient;
}
export const userRouter = new Hono<{ Bindings: bidings; Variables: prisma }>();
//middlewares to create the Prisma withAccelerate
userRouter.use("/*", prismaCreate);
//Signup route
userRouter.post("/signup", async (c) => {
  // const prisma = new PrismaClient({
  //   datasourceUrl: c.env?.DATABASE_URL,
  // }).$extends(withAccelerate());
  const prisma = c.get("prisma");
  const body: {
    email: string;
    password: string;
    name?: string;
  } = await c.req.json();
  //Error check block
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
        email: body.email,
        password: body.password,
        name: body.name || body.email.split("@")[0],
      },
    });
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      jwt: token,
    });
  } catch (e) {
    c.status(403);
    return c.text("User Exists");
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = c.get("prisma");
  const body: {
    email: string;
    password: string;
  } = await c.req.json();
  //check wheter the  userfound
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Wrong Inputs Bro 👷" });
  }
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
      message: "successfuly signedIn 🤪",
    });
  } catch (error) {
    c.status(500);
    return c.json("Error occured while processing the request ");
  }
});
