import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.get("/", async(req: Request, res: Response) => {
  const jokes = await prisma.joke.findMany({
    include: {creator: true}
  });
  res.json({ jokes });
});

app.post("/", (req: Request, res: Response) => {
  res.json({ message: "Hello" });
});

app.get("/:joke_id", (req: Request, res: Response) => {
  res.json({ message: "Hello" });
});

app.delete("/:joke_id", (req: Request, res: Response) => {
  res.json({ message: "Hello" });
});

app.listen(3001)
