import { Router, Request, Response } from "express";

const blogRouter = Router();
// Access:Private
blogRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "I am a get request" });
});

// Access:Private
blogRouter.post("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "I am a post request" });
});

// Access:Private
blogRouter.delete("/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: "I am a Delete request" });
});

// Access:Private
blogRouter.put("/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: "I am a Update request" });
});

export { blogRouter };
