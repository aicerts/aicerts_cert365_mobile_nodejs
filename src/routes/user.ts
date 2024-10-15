import { Request, Router,Response } from "express";
import { logoutHandler, signup } from "../controllers/user";
import { googleAuth, googleAuthCallback, googleAuthRedirect } from "../config/googleStrategy";
import { linkedinAuth, linkedinAuthCallback, linkedinAuthRedirect } from "../config/linkedinStrategy";

const router = Router()
router.route("/signup").post(signup)

// Health check route
router.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Service is up and running",
      timestamp: new Date().toISOString(),
    });
  });

// route to initiate Google OAuth login
router.route("/auth/google").get(googleAuth)
router.get("/auth/google/callback", googleAuthCallback, googleAuthRedirect)

// Route to initiate Linkedin OAuth login
router.get("/auth/linkedin", linkedinAuth)
router.get("/auth/linkedin/callback", linkedinAuthCallback, linkedinAuthRedirect)

// Route to logout user 
router.post("/logout",logoutHandler )

export default router