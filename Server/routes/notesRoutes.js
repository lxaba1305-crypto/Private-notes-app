import express from 'express';
import { protect } from '../middleware/auth.js';
import supabase from '../supabaseClient.js';

const router = express.Router();

//Get all notes for user
router.get('/', protect, async (req, res) => {
    const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', req.user.id);

    if (error) 
        return res.status(400).json({ error: error.message });
    res.json(data);
});

//create note
router.post('/', protect, async (req, res) => {
    const { title, content } = req.body;
    const { data, error } = await supabase
        .from('notes')
        .insert([{ title, content, user_id: req.user.id }])
        .select();
        if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data[0]);
});

//Update note
router.put('/:id', protect, async (req, res) => {
    const { title, content } = req.body;
    const { data, error } = await supabase
        .from('notes')
        .update({ title, content })
        .eq('id', req.params.id)
        .eq('user_id', req.user.id)
        .select();
    if (error) return res.status(400).json({ error: error.message });
    res.json(data[0]);
});

//Delete note
router.delete('/:id', protect, async (req, res) => {
    const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', req.params.id)
        .eq('user_id', req.user.id);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Note deleted' });
});

export default router;