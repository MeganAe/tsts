const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// Route principale Gemini — même format que l'ancien /api/gpt4o
// Usage : GET /api/gemini?context=Bonjour, qui es-tu ?
app.get('/api/gemini', async (req, res) => {
  try {
    const context = req.query.context;

    if (!context) {
      return res.status(400).json({ error: 'Le paramètre "context" est requis.' });
    }

    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY non définie dans les variables d\'environnement.' });
    }

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: context }]
          }
        ]
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    const candidate = response.data.candidates?.[0];
    const answer = candidate?.content?.parts?.[0]?.text ?? 'Aucune réponse générée.';

    // Réponse dans un format similaire à l'ancien projet
    res.json({
      question: context,
      response: answer,
      model: 'gemini-1.5-flash',
      finishReason: candidate?.finishReason ?? null
    });

  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.error?.message || 'Une erreur est survenue';
    res.status(status).json({ error: message });
  }
});

// Route POST — pour les clients qui préfèrent envoyer du JSON dans le body
// Usage : POST /api/gemini  avec body { "context": "..." }
app.post('/api/gemini', async (req, res) => {
  try {
    const context = req.body.context;

    if (!context) {
      return res.status(400).json({ error: 'Le champ "context" est requis dans le body.' });
    }

    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY non définie dans les variables d\'environnement.' });
    }

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: context }]
          }
        ]
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    const candidate = response.data.candidates?.[0];
    const answer = candidate?.content?.parts?.[0]?.text ?? 'Aucune réponse générée.';

    res.json({
      question: context,
      response: answer,
      model: 'gemini-1.5-flash',
      finishReason: candidate?.finishReason ?? null
    });

  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.error?.message || 'Une erreur est survenue';
    res.status(status).json({ error: message });
  }
});

// Route santé — pour vérifier que l'API tourne
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Gemini API is running 🚀' });
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
