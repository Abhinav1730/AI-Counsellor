const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');

// Update/Create profile
router.post('/', async (req, res) => {
  const { userId, data } = req.body;
  
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .upsert({ 
        id: userId, 
        ...data,
        updated_at: new Date()
      })
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, message: 'Profile updated', profile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get profile
router.get('/:userId', async (req, res) => {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.params.userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is 'no rows found'
    res.json(profile || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
