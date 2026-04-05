import express from 'express';

import authRouter from "./routes/authRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import userRouter from "./routes/userRoutes.js";    

const app = express();

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is healthy'});
});

app.use("/api/auth", authRouter);

app.use("/api/chats", chatRouter);

app.use("/api/messages", messageRouter);

app.use("/api/users", userRouter);


export default app; 