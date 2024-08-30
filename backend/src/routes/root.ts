import { Hono } from "hono";
import { userRouter } from "./user";
import blogRouter from "./blog"
import { verify } from "hono/jwt";

export const root = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
}>();

root.route('/user',userRouter)
root.route('/blog',blogRouter)

root.get('/me',async(c) => {
  const headers = c.req.header('Authorization')
  const token = headers?.split(' ')[1] || ""
  try {
    await verify(token,c.env.JWT_SECRET)
    return c.json({
      isValid : true
    })
  } catch (error) {
    return c.json({
      isValid : false
    })
  }

})