import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound ,errorHandler} from "./middlewares/errorMiddlewares.js";


dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectDb();
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("server is ready");
});
app.listen(port, () => {
  console.log(`server is running of ${port}`);
});
app.use(notFound, errorHandler);
