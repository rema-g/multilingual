import express from "express";
import routes from "./routes/route";
import config from "./config/config";

const env = "development"
const dbConfig = config[env];

const app = express();
app.use(express.json());

app.use("/", routes);
const PORT =dbConfig.port || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
