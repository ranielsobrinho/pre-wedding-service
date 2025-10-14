import { Router } from "express";
import { expressRouteAdapter } from "@/main/adapters/expressRouteAdapter";
import { makeCreateSchedulingWhatsappMessageController } from "../factories/controllers/scheduling/makeCreateSchedulingWhatsappMessageController";

export const schedulingRoutes = (router: Router) => {
  router.post(
    "/scheduling-whatsapp-message",
    expressRouteAdapter(makeCreateSchedulingWhatsappMessageController()),
  );
};
