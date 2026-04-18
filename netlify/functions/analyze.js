const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const INGREDIENT_PROMPT = `You are a kitchen assistant. Look at this photo and identify all visible food items, condiments, packaged goods, and ingredients.

Return ONLY valid JSON with this exact shape:
{
  "ingredients": [
    { "name": "string (lowercase, singular)", "confidence": 0.0-1.0, "source": "brief description of what you saw" }
  ],
  "notes": ["any relevant observations"]
}

Rules:
- Use lowercase singular names (e.g. "egg" not "Eggs")
- Be conservative: only include items you can actually see
- Include confidence < 0.65 for partially visible or uncertain items
- Limit to 20 ingredients max`;

const RECIPE_PROMPT = `You are a practical home cooking assistant. Given these available ingredients, suggest 3-5 simple meals that could be made primarily from what's available.

Return ONLY valid JSON with this exact shape:
{
  "meals": [
    {
      "id": "kebab-case-id",
      "title": "Meal Name",
      "summary": "One sentence description",
      "timeMinutes": 15,
      "difficulty": "easy",
      "uses": ["ingredient1", "ingredient2"],
      "optionalMissing": ["item that would help but is not required"],
      "whyThisWorks": "One sentence explanation",
      "substitutions": ["One substitution tip"],
      "steps": ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"]
    }
  ]
}

Rules:
- Prefer meals with easy steps (4-8 steps)
- Difficulty must be "easy" or "medium"
- optionalMissing: items not in the list that would improve the dish (max 3)
- Keep steps short and actionable
- No unsafe food assumptions`;

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const body = JSON.parse(event.body || '{}');

    if (body.image) {
      const base64 = body.image.replace(/^data:image\/\w+;base64,/, '');
      const mediaType = (body.image.match(/^data:(image\/\w+);base64,/) || [])[1] || 'image/jpeg';

      const message = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mediaType, data: base64 } },
            { type: 'text', text: INGREDIENT_PROMPT }
          ]
        }]
      });

      const text = message.content[0].text.trim();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No JSON in ingredient response');
      const parsed = JSON.parse(jsonMatch[0]);
      return { statusCode: 200, headers, body: JSON.stringify(parsed) };
    }

    if (body.ingredients && Array.isArray(body.ingredients)) {
      const list = body.ingredients.map(i => i.name || i).join(', ');
      const message = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 2048,
        messages: [{
          role: 'user',
          content: `Available ingredients: ${list}\n\n${RECIPE_PROMPT}`
        }]
      });

      const text = message.content[0].text.trim();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No JSON in recipe response');
      const parsed = JSON.parse(jsonMatch[0]);
      return { statusCode: 200, headers, body: JSON.stringify(parsed) };
    }

    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Provide image or ingredients' }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message || 'Internal error' }) };
  }
};
