import { Router } from "express";
import { submitContact } from "../controllers/contact";

const router = Router();

// Public route - no authentication required
router.post("/", submitContact);

export default router;

