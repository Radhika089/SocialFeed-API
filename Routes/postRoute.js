import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import multer from "multer";
import {
  create,
  deletePost,
  edit,
  getAllPost,
} from "../controller/postController.js";

const postRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

postRouter.post("/create", authMiddleware, upload.single("image"), create);
postRouter.patch("/update/:id", authMiddleware, upload.single("image"), edit);
postRouter.delete("/delete/:id", authMiddleware, deletePost);
postRouter.get("/getAllPosts", getAllPost);

export default postRouter;
