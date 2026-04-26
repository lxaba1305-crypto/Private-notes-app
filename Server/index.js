import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import notesRoutes from './routes/notesRoutes.js';

const app = express();
const PORT = parseInt(process.env.PORT) || 8080;

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



const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} busy, trying ${PORT + 1}...`);
        server.listen(PORT + 1);
    }
});
