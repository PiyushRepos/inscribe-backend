import connectDB from "./db/index.js";
import { config } from "./config.js";
const PORT = config.PORT;
import app from "./app.js";

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error", err);
  });
