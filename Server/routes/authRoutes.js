import express from 'express';
import supabase from '../supabaseClient.js';
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ message: 'User created', user: data.user });
});

export default router;