import express from "express";
import { config } from "dotenv";
import { MongoClient } from "./database/mongo";
import clientRouter from "./router/router-client/router-client";
const main = async () => {
  config();
  const app = express();
  app.use(express.json());

  const port = process.env.PORT || 4000;
  const host = process.env.HOST || "http://localhost";

  await MongoClient.connect();

  app.get("/", (req, res) => {
    res.send("TESTE");
  });

  app.use("/client", clientRouter);

  app.listen(port, () => console.log(`local url: ${host}:${port}`));
};

main();
