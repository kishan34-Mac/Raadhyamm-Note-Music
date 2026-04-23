import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  checkAuth,
<<<<<<< HEAD
  sendOtp,
  verifyOtp,
  resetPasswordWithToken
=======
  googleAuth,
  googleAuthCallback
>>>>>>> 9a29565 (first commit: production ready fullstack structure)
} from "../controllers/AuthController.js";
import verifyToken from "../middlewares/AuthmiddleWare.js";
import passport from "passport";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/check-auth", verifyToken, checkAuth);

<<<<<<< HEAD
// OTP-based password reset
router.post("/send-otp",           sendOtp);
router.post("/verify-otp",         verifyOtp);
router.post("/reset-password-otp", resetPasswordWithToken);

export default router;
=======
// Google OAuth routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), googleAuthCallback);

export default router;
>>>>>>> 9a29565 (first commit: production ready fullstack structure)
