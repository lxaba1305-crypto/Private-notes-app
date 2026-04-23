import express from 'express';
const router = express.Router();

router.post('/signup', (req, res) => {
    res.json({ message: 'Signup route works!' });
});

router.post('/login', (req, res) => {
    res.json({ message: 'Login route works!' });
});

router.post('/logout', (req, res) => {
    res.json({ message: 'Logout route works!' });
});

export default router;