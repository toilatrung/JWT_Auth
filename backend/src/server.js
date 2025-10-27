import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './libs/db.js';
import authRoute from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import userRoute from './routes/userRoute.js';
import { protectedRoute } from './middlewares/authMiddleWare.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));
//public routes
app.use('/api/auth', authRoute);

//protected routes
app.use(protectedRoute);
app.use('/api/user', userRoute);

//start server
const startServer = async () => {
  try {
    await connectDB(); // Kết nối MongoDB
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
