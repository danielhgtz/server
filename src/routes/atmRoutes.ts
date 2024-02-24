import { Router } from "express";

import {
  deposit,
  updatePIN,
  validatePin,
  widthdraw,
} from "../controllers/atmController";

const router = Router();

router.post("/validate-pins", validatePin);
router.post("/withdrawal", widthdraw);
router.post("/deposit", deposit);
router.post("/re-enter-pin", updatePIN);

export default router;
