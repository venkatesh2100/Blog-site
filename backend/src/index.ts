import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, verify, sign, jwt } from "hono/jwt";
// import { Prisma } from "@prisma/client";
// import { env } from "hono/adapter";
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_TOKEN: string;
  };
}>();
app.post("/api/v1/user/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: env.DATABASE_URL,
  }).$extends(withAccelerate());
  //Getting the input form the user
  const body = await c.req.json();
  //create a new user by Prisma in psql
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  });
  // const secret="codebro:"
  const token = await sign({ id: user.id }, c.env.JWT_TOKEN);
  return c.json({
    jwt: token,
  });
  return c.text("Hello singup route");
});
app.post("/api/v1/user/signin", async  (c) => {
//Intialize the prisma
const prisma = new PrismaClient({
  datasourceUrl: env.DATABASE_URL,
}).$extends(withAccelerate());

const body=await c.req.json();

//check wheter the  userfound
const user=await prisma.user.findUnique({
  where:{
    email:body.email
  }
});
if(!user){
  c.status(403);
  return c.json("User not found");
}

const token=await sign({id:user.id},c.env.JWT_TOKEN);
return c.json({
  jwt:token
})
  // return c.text("Hello singin route");
});
app.post("/api/v1/blog", (c) => {
  return c.text("Hello post");
});
app.put("/api/v1/blog", (c) => {
  return c.text("Hello put blog");
});
app.get("/api/v1/blog/:id", (c) => {
  return c.text("Hello get ID");
});
app.get("/api/v1/blog/bulk", (c) => {
  return c.text("Hello get bulk");
});

export default app;
