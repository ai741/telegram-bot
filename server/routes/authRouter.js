import { Router } from "express";
import * as AuthController from "../controllers/AuthController.js";
import { check } from "express-validator";
import checkAuth from "../middleware/checkAuth.js";
import checkRole from "../middleware/checkRole.js";

const router = new Router();

router.post(
  "/registration",
  [check("username").notEmpty(), check("password").isLength({ min: 3 })],
  AuthController.registration
);
router.post("/login", AuthController.login);
router.get("/users", checkAuth, checkRole("USER"), AuthController.getAll);
router.get("/me", checkAuth, AuthController.getMe);

export default router;
