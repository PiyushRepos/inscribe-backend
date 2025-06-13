import connectDB from "../src/db/index.js";
import { config } from "../src/config.js";
const PORT = config.PORT;
import { app } from "../src/app.js";

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error", err);
  });

export default app;
