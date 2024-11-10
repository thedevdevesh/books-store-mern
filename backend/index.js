import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

// Middleware to parsing request body
app.use(express.json());

app.get("/", (request, response) => {
  console.log("request", request);
  return response
    .status(234)
    .send("Welcome To Book Collection app build using MERN Stack.");
});

// Route for Save a new Book
app.post("/save-book", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message:
          "Please provide all the required fields of the book: title, author, publishYear",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const savedBook = await Book.create(newBook);
    return response.status(201).send(savedBook);
  } catch (error) {
    console.log("Error", error.message);
    response.status(500).send({ message: error.message });
  }
});

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
