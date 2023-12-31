import { Router } from "express";
import * as flightsCtrl from "../controllers/flights.js";

const router = Router();

// GET localhost:3000/users
router.get("/new", flightsCtrl.newFlight);
router.get("/", flightsCtrl.index);
router.get("/:flightId", flightsCtrl.show);
router.get("/:flightId/edit", flightsCtrl.edit);

router.post("/", flightsCtrl.create);
router.post("/:flightId/tickets", flightsCtrl.addTicket);
router.post("/:flightId/meals", flightsCtrl.addMeal);

router.put("/:flightId", flightsCtrl.update);

router.delete("/:flightId", flightsCtrl.deleteFlight);
router.delete("/:flightId/tickets/:ticketId", flightsCtrl.deleteTicket);
router.delete("/:flightId/meals/:mealId", flightsCtrl.deleteMeal);
export { router };
