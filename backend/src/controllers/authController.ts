import type { authRequest } from "../middleware/auth";
import type { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { clerkClient, getAuth } from "@clerk/express";


export async function getMe(req: authRequest, res: Response, next: NextFunction ) {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user }); 
       
    } catch (error) {
        res.status(500)
        next(error);
    }
}

export async function authCallback(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId: chetId } = getAuth(req);
        if (!chetId) {
             res.status(401).json({ message: "Unauthorized" });
             return
        }
        let user = await User.findOne({ chetId });
        if (!user) {
            const clerk = await clerkClient.users.getUser(chetId);
            user = await User.create({
                chetId,
                name: clerk.firstName || "Unknown",
                email: clerk.emailAddresses[0]?.emailAddress || "",
                avatar: clerk.imageUrl || "",
            });
        }
        res.status(200).json({ user });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
        next(error);
    }
}