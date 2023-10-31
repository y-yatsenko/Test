import express, { Express } from "express";
import cors from "cors";
import PostController from "./src/controllers/PostController.js";
import ContentfulRepository from "./src/repositories/ContentfulRepository.js";

const port = 3000;

export const app: Express = express();

app.use(express.json());
app.use(cors());

const { getAllPosts, getPostById } = new PostController(new ContentfulRepository());

app.get("/posts", getAllPosts);

app.get("/posts/:id", getPostById);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
