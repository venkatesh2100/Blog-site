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

app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);


// app.get("/",(c)=>{
//   return c.text("jfjdlfjd");
// })