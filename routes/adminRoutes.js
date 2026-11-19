
const express = require("express");
const router = express.Router();

const {
    protect,
    adminOnly
} = require("../middleware/authMiddleware");

const User = require("../models/User");

// DELETE CUSTOMER API
router.delete(
    "/customers/:id",
    protect,
    adminOnly,
    async (req, res) => {
        try {
            const customer = await User.findOneAndDelete({
                _id: req.params.id,
                role: "customer"
            });

            if (!customer) {
                return res.status(404).json({
                    success: false,
                    message: "Customer not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Customer deleted successfully"
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Server error",
                error: error.message
            });
        }
    }
);

module.exports = router;
