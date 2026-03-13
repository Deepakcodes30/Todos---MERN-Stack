import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import { app } from "./src/app.js";

dotenv.config({
  path: "./.env",
});

/*
app.listen cannot be used while deploying as vercel is stateless
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at Port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Mongo db connection failed !!!", error);
  });
*/

await connectDB();

app.get("/", (_, res) => {
  res.send("Backend running");
});

export default app;
