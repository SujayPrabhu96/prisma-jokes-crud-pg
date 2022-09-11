import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  const jokes = await prisma.joke.findMany({
    include: { creator: true },
  });
  res.json({ jokes });
});

app.post("/", async (req: Request, res: Response) => {
  const { text, userId } = req.body;

  const joke = await prisma.joke.create({
    data: {
      text,
      userId,
    },
  });
  res.json({ joke });
});

app.get("/:joke_id", (req: Request, res: Response) => {});

app.delete("/:joke_id", (req: Request, res: Response) => {});

app.listen(3001);
