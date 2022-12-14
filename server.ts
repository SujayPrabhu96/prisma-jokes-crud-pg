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

app.get("/:joke_id", async (req: Request, res: Response) => {
  const { joke_id } = req.params;

  const joke = await prisma.joke.findUnique({
    where: {
      id: joke_id,
    },
  });
  res.json({ joke });
});

app.put("/:joke_id", async (req: Request, res: Response) => {
  const { joke_id } = req.params;
  const { text } = req.body;

  const joke = await prisma.joke.update({
    where: {
      id: joke_id,
    },
    data: {
      text,
    },
  });
  res.json({ joke });
});

app.delete("/:joke_id", async (req: Request, res: Response) => {
  const { joke_id } = req.params;

  const joke = await prisma.joke.delete({
    where: {
      id: joke_id,
    },
  });

  res.json({ message: "Joke deleted successfully!" });
});

app.listen(3001);
