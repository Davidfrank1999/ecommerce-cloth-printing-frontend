// backend/routes/paymentRoutes.js
import express from "express";
import Razorpay from "razorpay";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * @route   POST /api/payment/create-order
 * @desc    Create Razorpay order
 * @access  Private
 */
router.post("/create-order", authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID, // send key to frontend
    });
  } catch (err) {
    console.error("❌ Razorpay order creation failed:", err.message);
    res.status(500).json({ message: "Failed to create Razorpay order" });
  }
});

export default router;
