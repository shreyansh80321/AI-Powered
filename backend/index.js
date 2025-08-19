import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
dotenv.config();
let port = process.env.PORT || 8000
let app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173"
  , credentials: true
}))

app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)

connectDb();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  
  
})