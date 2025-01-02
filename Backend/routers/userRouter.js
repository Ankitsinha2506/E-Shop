const express = require("express");
const { registerUser,
    loginUser,
    getAllUsers,
    getUeserById,
    updateUser,
    deleteUser,
    getUserCount
} = require("../controllers/userController");
const authenticateToken = require("../helpers/jwt");

const router = express.Router();

// Registration and Login Authentications Routes
router.post("/register", registerUser); // register or create users.
router.post("/login", loginUser);
router.get("/protected", authenticateToken);

// APIs Routes
http://localhost:5000/api/v1/users/


// CRUD Operations Routes
// router.get("/", authenticateToken, getAllUsers);
router.get("/", getAllUsers);
router.get("/:id", getUeserById);
// router.put("/:id", authenticateToken, updateUser);
router.put("/update/:id", updateUser);
// router.delete("/:id", authenticateToken, deleteUser);
router.delete("/delete/:id", deleteUser);
// Route to get user count
router.get("/get/count", getUserCount);


module.exports = router;