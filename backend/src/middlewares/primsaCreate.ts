import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createMiddleware } from "hono/factory";

export const prismaCreate = createMiddleware(async (c,next) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl : c.env.DATABASE_URL
        }).$extends(withAccelerate())
        c.set("prisma",prisma)
        await next()
    } catch(e) {
        c.status(403)
        return c.text('error while connecting to database')
    }
});