// backend/routes/userRoutes.js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js"; 
import User from "../models/User.js";

const router = express.Router();

// ✅ Get current user
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("❌ /me error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update profile (name, email, phone)
router.put("/update", authMiddleware, async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, phone },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error("❌ Update error:", err);
    res.status(500).json({ message: "Failed to update profile" });
  }
});

// ✅ Change password
router.put("/change-password", authMiddleware, async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = password; // 🔒 make sure User model hashes it in pre-save hook
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("❌ Password change error:", err);
    res.status(500).json({ message: "Failed to change password" });
  }
});

// ✅ Get addresses
router.get("/addresses", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("addresses");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.addresses || []);
  } catch (err) {
    console.error("❌ Addresses fetch error:", err);
    res.status(500).json({ message: "Failed to load addresses" });
  }
});

// ✅ Add address
router.post("/addresses", authMiddleware, async (req, res) => {
  try {
    const { address } = req.body;
    if (!address) {
      return res.status(400).json({ message: "Address is required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.addresses.push({ address });
    await user.save();

    res.json(user.addresses[user.addresses.length - 1]); // return last added
  } catch (err) {
    console.error("❌ Add address error:", err);
    res.status(500).json({ message: "Failed to add address" });
  }
});

// ✅ Delete address
router.delete("/addresses/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.addresses = user.addresses.filter(
      (addr) => addr._id.toString() !== req.params.id
    );
    await user.save();

    res.json({ message: "Address removed" });
  } catch (err) {
    console.error("❌ Delete address error:", err);
    res.status(500).json({ message: "Failed to delete address" });
  }
});

export default router;
