import express from "express";
import { dbConnect } from "./config/db.js";
import userRouter from "./Routes/userRoute.js";
import postRouter from "./Routes/postRoute.js";

const app = express();

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

app.listen(3000, () => {
  console.log("Server Connected");
});
