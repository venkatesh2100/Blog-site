import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

export const authMiddleWare = createMiddleware(async (c,next) => {
    const headers = c.req.header("Authorization")
    const token = headers?.split(' ')[1] || ""
    try {
        const user = await verify(token,c.env.JWT_SECRET)
        if(!user) {
            c.status(401)
            return c.json({
                error : "unauthorized"
            })
        }
        c.set("userId",user.id)
        await next()
    } catch (error) {
        c.status(411)
        return c.json({
            error : "unauthorized"
        })
    }
})