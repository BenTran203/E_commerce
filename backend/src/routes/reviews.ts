import { Router } from "express";
import {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
  voteReviewHelpful,
} from "../controllers/reviews";
import { authenticate, optionalAuth } from "../middleware/auth";

const router = Router();

// Public routes
router.get("/product/:productId", getProductReviews);
router.post("/:id/helpful", voteReviewHelpful);

// Protected routes
router.post("/", authenticate, createReview);
router.put("/:id", authenticate, updateReview);
router.delete("/:id", authenticate, deleteReview);

export default router;
