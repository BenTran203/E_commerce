import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
} from "../controllers/products";
import { authenticate, authorize } from "../middleware/auth";

const router = Router();

// Public routes
router.get("/", getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/:id", getProductById);

// Protected routes (Vendor/Admin only)
router.post("/", authenticate, authorize("VENDOR", "ADMIN"), createProduct);
router.put("/:id", authenticate, authorize("VENDOR", "ADMIN"), updateProduct);
router.delete(
  "/:id",
  authenticate,
  authorize("VENDOR", "ADMIN"),
  deleteProduct,
);

export default router;
