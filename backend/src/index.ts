import { Hono } from "hono";
import { root } from "./routes/root";
import { cors } from "hono/cors";

const app = new Hono();

app.use("/*", cors());
app.route("/api/v1", root);
app.post("/try", (c) => {
  return c.text("Hello");
});
export default app;
