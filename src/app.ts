import express from "express";
import routes from "./routes/route";
import config from "./config/config";

const app = express();
app.use(express.json());
app.use("/api", routes);

const PORT = config.app.port;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});