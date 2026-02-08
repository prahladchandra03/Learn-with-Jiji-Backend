import express from 'express';
import { supabase } from '../lib/supabase.js';
import { askSchema } from '../validators/askValidator.js';

const router = express.Router();

router.post('/ask-jiji', async (req, res) => {
  try {
    // 1️⃣ Validate input
    const { query } = askSchema.parse(req.body);
    console.log(`Received query: "${query}"`);

    // 2️⃣ Mock user (assignment scope)
    const userId = '123e4567-e89b-12d3-a456-426614174000'; // Valid UUID for testing

    // 3️⃣ Save query
    const { error: insertError } = await supabase
      .from('queries')
      .insert({
        user_id: userId,
        query_text: query
      });

    if (insertError) {
      throw insertError;
    }

    // 4️⃣ Normalize query for matching
    const normalizedQuery = query.toLowerCase();

    // 5️⃣ Fetch matching resources
    const { data: resources, error: fetchError } = await supabase
      .from('resources')
      .select('title, type, file_url')
      .ilike('topic', `%${normalizedQuery}%`);

    if (fetchError) {
      throw fetchError;
    }

    // 6️⃣ Clean response (frontend-friendly)
    const formattedResources = resources.map(item => ({
      type: item.type,
      title: item.title,
      url: item.file_url
    }));

    // 7️⃣ Final response
    res.json({
      answer: `This is a mocked explanation for ${query}.`,
      resources: formattedResources
    });

  } catch (err) {
    console.error(err);
    res.status(400).json({
      error: err.message || 'Invalid request'
    });
  }
});

export default router;
