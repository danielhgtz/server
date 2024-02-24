import cors from "cors";
import * as dotenv from "dotenv";
import express, { Application } from "express";
import { RootRouter } from "./routes/router";

export class App {
  app: Application;

  constructor() {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  private settings() {
    dotenv.config();
    this.app.set("port", process.env.PORT);
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(express.json({ limit: "350mb" }));
  }

  private routes() {
    this.app.use("/", RootRouter.getRouter());
  }

  listen(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log(`Server running on port ${this.app.get("port")}`);
    });
  }
}
