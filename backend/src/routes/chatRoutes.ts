import { Router } from "express";
import { protectRoute } from "../middleware/auth";
import { getChats, getOrCreateChat } from "../controllers/chatsController";

const router = Router();

router.get("/",protectRoute, getChats)
router.post("/with/:participantId",protectRoute, getOrCreateChat)


export default router;