import express from "express";
import { dbConnect } from "./config/db.js";
import userRouter from "./Routes/userRoute.js";
import postRouter from "./Routes/postRoute.js";
import cors from "cors";

const app = express();

dbConnect();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

app.listen(3000, () => {
  console.log("Server Connected");
});
