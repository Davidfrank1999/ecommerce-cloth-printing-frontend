// backend/routes/orderRoutes.js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Order from "../models/orderModel.js";

const router = express.Router();

/**
 * @route   POST /api/orders
 * @desc    Create a new order
 * @access  Private
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    // Accept either "items" or "products" from frontend
    const { items, products, shippingAddress, total, totalAmount } = req.body;

    const orderItems = items || products; // normalize
    const orderTotal = totalAmount || total; // normalize

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items provided" });
    }

    const formattedItems = orderItems.map((i) => {
      // try to use ObjectId only if it looks like one
      const productId =
        i.product || i.productId || i._id || i.id || null;

      return {
        product:
          productId && /^[0-9a-fA-F]{24}$/.test(productId)
            ? productId
            : undefined, // only keep if valid ObjectId
        name: i.name,
        size: i.size || "N/A",
        quantity: i.quantity || 1,
        price: i.price || 0,
      };
    });

    const newOrder = new Order({
      user: req.user.id,
      items: formattedItems,
      shippingAddress: shippingAddress || {
        street: "N/A",
        city: "N/A",
        pincode: "000000",
        country: "N/A",
      },
      totalAmount: orderTotal,
      status: "Pending",
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({
      message: "✅ Order placed successfully!",
      order: savedOrder,
    });
  } catch (err) {
    console.error("❌ Order creation failed:", err.message, err.stack);
    res
      .status(500)
      .json({ message: "Failed to place order", error: err.message });
  }
});

/**
 * @route   GET /api/orders
 * @desc    Get all orders for the logged-in user
 * @access  Private
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("items.product", "name price image");

    res.json(orders);
  } catch (err) {
    console.error("❌ Fetch orders failed:", err.message);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

/**
 * @route   GET /api/orders/:id
 * @desc    Get a single order by ID (for details page)
 * @access  Private
 */
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).populate("items.product", "name price image");

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (err) {
    console.error("❌ Fetch single order failed:", err.message);
    res.status(500).json({ message: "Failed to fetch order" });
  }
});

export default router;
