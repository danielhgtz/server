import express, { Request, Router, Response } from "express";
import AtmRoutes from "./atmRoutes";

export class RootRouter {
  private static instance: RootRouter;

  private router: Router;

  private constructor() {
    this.router = express.Router();
    this.routes();
  }

  private routes() {
    this.router.get("/", this.checkIfWorking);
    this.router.use("/atm", AtmRoutes);
  }

  static getRouter(): Router {
    if (!RootRouter.instance) {
      RootRouter.instance = new RootRouter();
    }
    return RootRouter.instance.router;
  }

  private checkIfWorking = async (_req: Request, res: Response) => {
    return res.status(200).json({ msg: "Server working fine" });
  };
}
