import express from 'express';
import supabase from '../supabaseClient.js';
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    console.log('Signup request received:', { email, password: '********' });
    console.log('Supabase client initialized with URL:', process.env.SUPABASE_URL);

    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });
    console.log('Supabase response:', { data, error });
    console.log('Supabase client state:', supabase);

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ message: 'User created', user: data.user });
});

export default router;