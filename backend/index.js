import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

// Middleware to parsing request body
app.use(express.json());

app.get("/", (request, response) => {
  console.log("request", request);
  return response
    .status(234)
    .send("Welcome To Book Collection app build using MERN Stack.");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });
