import { Router } from "express";
import {
  deleteUser,
  getUsers,
  createUser,
} from "../controllers/userController.js";
const router = Router();
router.route("/").get(getUsers).post(createUser);
export { router as userRoutes };
router.route("/:userId").delete(deleteUser);
