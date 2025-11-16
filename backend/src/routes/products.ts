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

// Protected routes (Admin only)
router.post("/", authenticate, authorize("ADMIN"), createProduct);
router.put("/:id", authenticate, authorize("ADMIN"), updateProduct);
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  deleteProduct,
);

export default router;
