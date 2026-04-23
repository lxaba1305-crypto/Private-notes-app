import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import notesRoutes from './routes/notesRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware 
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
