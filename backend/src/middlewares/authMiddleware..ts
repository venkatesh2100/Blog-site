import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

export const authMiddleWare = createMiddleware(async (c, next) => {
  const authorizationHeader = c.req.header("Authorization");

  if (!authorizationHeader) {
    c.status(401);
    return c.json({ error: "Authorization header missing" });
  }

//   const token = authorizationHeader.split(' ')[1] || "";
  const token = authorizationHeader;

  if (!token) {
    c.status(401);
    return c.json({ error: "Token missing" });
  }

  try {
    const user = await verify(token, c.env.JWT_SECRET);

    if (!user) {
      c.status(401);
      return c.json({ error: "Unauthorized" });
    }

    c.set("userId", user.id);
    await next();

  } catch (error) {
    c.status(401); // 401 is more appropriate here
    return c.json({ error: "Unauthorized" });
  }
});
