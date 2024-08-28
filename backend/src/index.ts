import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, verify, sign, jwt } from "hono/jwt";
import dotenv from "dotenv"
import blogRouter from "./routes/blog";
import { userRouter } from "./routes/user";
// import { env } from "hono/adapter";
// dotenv.config();
interface bidings{
  DATABASE_URL: string;
  JWT_TOKEN: string;

}
const app = new Hono<{
  Bindings: bidings
}>();

app.route("api/v1/user",userRouter);
app.route("api/v1/blog",blogRouter)
