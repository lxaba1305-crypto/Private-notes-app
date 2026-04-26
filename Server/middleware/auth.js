import jwt from 'jsonwebtoken';
import supabase from '../supabaseClient.js';

export const protect = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user;
    next();
};