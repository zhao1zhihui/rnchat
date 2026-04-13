import { type Request, type Response, type NextFunction, request } from "express";
import { getAuth } from "@clerk/express"
import { User } from "../models/User.js";
import { requireAuth } from "@clerk/express";

export type authRequest = Request & { 
    userId?: string;
 }

export const protectRoute = [
    requireAuth(),
    async (req: authRequest, res: Response, next: NextFunction) => {
        try {
            const { userId } = getAuth(req);
            const user = await User.findOne({ chetId: userId });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Attach user to request object for downstream use
            req.userId = user._id.toString();
            next();
        } catch (error) {
            console.error("Error in protectRoute middleware:", error);
            res.status(500).json({ message: "Server error" });
            next(error);
        }
    }
]