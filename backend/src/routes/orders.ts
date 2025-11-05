import { Router } from "express";
import {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder,
  updateOrderStatus,
} from "../controllers/orders";
import { authenticate, authorize } from "../middleware/auth";

const router = Router();

// All order routes require authentication
router.use(authenticate);

router.post("/", createOrder);
router.get("/", getUserOrders);
router.get("/:id", getOrderById);
router.post("/:id/cancel", cancelOrder);

// Admin/Vendor only
router.put("/:id/status", authorize("ADMIN", "VENDOR"), updateOrderStatus);

export default router;
