import { Router } from "express";
import {
  getAllVendors,
  getVendorByIdentifier,
  createVendor,
  updateVendor,
  verifyVendor,
  getVendorDashboard,
} from "../controllers/vendors";
import { authenticate, authorize } from "../middleware/auth";

const router = Router();

// Public routes
router.get("/", getAllVendors);
router.get("/:identifier", getVendorByIdentifier);

// Protected routes
router.post("/", authenticate, createVendor);
router.put("/:id", authenticate, updateVendor);

// Vendor dashboard
router.get(
  "/dashboard/stats",
  authenticate,
  authorize("VENDOR", "ADMIN"),
  getVendorDashboard,
);

// Admin only
router.post("/:id/verify", authenticate, authorize("ADMIN"), verifyVendor);

export default router;
