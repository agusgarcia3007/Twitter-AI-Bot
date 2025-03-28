import { createTweet } from "@/controller/tweet";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) =>
  c.json({ status: "ok", timestamp: new Date().toISOString() })
);

app.post("/tweet", createTweet);

export default app;
