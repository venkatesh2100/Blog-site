import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, verify, sign, jwt } from "hono/jwt";
import dotenv from "dotenv"
// import { env } from "hono/adapter";
// dotenv.config();
interface bidings{
  DATABASE_URL: string;
  JWT_TOKEN: string;

}
const app = new Hono<{
  Bindings: bidings
}>();
app.post("/api/v1/blog/*",async(c)=>{
// verify the header and proced the data according to verfication
const header= c.req.header("authorization")||"";
const token=header.split("")[1]

const response=await verify(token,c.env.JWT_TOKEN);

if(response.id){
  next()
}else{
  c.status(403);
  return c.json({
    "error":"AUTH"
  })
}



  return c.text("HELLI")
})



app.post("/api/v1/user/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  //Getting the input form the user
  const body = await c.req.json();
  //create a new user by Prisma in psql
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
      name:body.name,

    },
  });
  // const secret="codebro:"
  const token = await sign({ id: user.id }, c.env.JWT_TOKEN);
  return c.json({
    jwt: token,
  });
  // return c.text("Hello singup route");
});
app.post("/api/v1/user/signin", async  (c) => {
//Intialize the prisma
const prisma = new PrismaClient({
  datasourceUrl: c.env.DATABASE_URL,
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
function next() {
  throw new Error("Function not implemented.");
}
