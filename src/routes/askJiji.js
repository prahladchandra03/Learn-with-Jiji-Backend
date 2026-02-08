import express from 'express';
import { supabase } from '../lib/supabase.js';
import { askSchema } from '../validators/askValidator.js';

const router = express.Router();

router.post('/ask-jiji', async (req, res) => {
  try {
    const { query } = askSchema.parse(req.body);

    // MOCK USER (for assignment)
    const userId = 'mock-user-id';

    // Save query
    await supabase.from('queries').insert({
      user_id: userId,
      query_text: query
    });

    // Fetch resources
    const { data: resources } = await supabase
      .from('resources')
      .select('*')
      .ilike('topic', `%${query}%`);

    res.json({
      answer: `This is a mocked explanation for ${query}`,
      resources
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
