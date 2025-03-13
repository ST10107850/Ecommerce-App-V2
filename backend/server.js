import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { PORT } from "./constants/env.const.js";
import { db } from "./config/db.js";
import userRoute from "./routes/userRoutes.js";
import { notFound, errorHandle } from "./middleware/errorMiddleware.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import wishlistRoute from "./routes/wishlistRoute.js";
import cartRoute from "./routes/cartRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);
app.use("/api/wishlist", wishlistRoute);
app.use("/api/cart", cartRoute);

app.use(notFound);
app.use(errorHandle);
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await db();
});
