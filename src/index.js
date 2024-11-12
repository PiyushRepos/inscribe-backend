import dotenv from "dotenv";
import connectDB from "./db/index.js";
const PORT = process.env.PORT || 5001;
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.log("Error while starting the server.", err);
    });
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error", err);
  });
