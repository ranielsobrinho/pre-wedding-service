import { Request, Response, NextFunction } from "express";
import { Controller } from "@/main/factories/controllers/protocols/controller";

export function expressRouteAdapter(controller: Controller) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
