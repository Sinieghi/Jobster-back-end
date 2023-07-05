const express = require("express");
const authenticateUser = require("../middleware/authentication");
const raterLimiter = require("express-rate-limit");
const apiLimiter = raterLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    msg: "to many requests from this API, wait for 15min",
  },
});

const router = express.Router();
const { register, login, updateUser } = require("../controllers/auth");
const testUser = require("../middleware/testUser");
router.post("/register", apiLimiter, register);
router.post("/login", apiLimiter, login);
router.patch("/updateUser", authenticateUser, testUser, updateUser);

module.exports = router;
