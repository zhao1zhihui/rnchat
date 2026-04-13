import { Socket, Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";
import { Message } from "../models/Message.js"; 
import { verifyToken } from "@clerk/express";
import { Chat } from "../models/Chat.js";
import { User } from "../models/User.js";

export const initializeSocket = (httpServer: HttpServer) => {
    
}

