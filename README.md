# Gemini REST API

Une API REST simple bâtie sur Express.js qui utilise **Google Gemini** pour répondre aux questions.

## Installation

```bash
npm install
```

## Configuration

Crée un fichier `.env` à la racine :

```env
GEMINI_API_KEY=ta_cle_api_ici
PORT=3000
```

> Obtiens une clé gratuite sur [Google AI Studio](https://aistudio.google.com/app/apikey)

## Démarrage

```bash
# Production
npm start

# Développement (hot reload)
npm run dev
```

## Endpoints

### `GET /`
Vérifie que l'API tourne.

```json
{ "status": "ok", "message": "Gemini API is running 🚀" }
```

---

### `GET /api/gemini?context=<question>`
Envoie une question via query string.

**Exemple :**
```
GET /api/gemini?context=Quelle est la capitale de la France ?
```

**Réponse :**
```json
{
  "question": "Quelle est la capitale de la France ?",
  "response": "La capitale de la France est Paris.",
  "model": "gemini-1.5-flash",
  "finishReason": "STOP"
}
```

---

### `POST /api/gemini`
Envoie une question dans le body JSON.

**Body :**
```json
{ "context": "Explique la relativité en 2 phrases." }
```

**Réponse :**
```json
{
  "question": "Explique la relativité en 2 phrases.",
  "response": "...",
  "model": "gemini-1.5-flash",
  "finishReason": "STOP"
}
```

## Déploiement sur Vercel

```bash
vercel deploy
```

N'oublie pas d'ajouter `GEMINI_API_KEY` dans les variables d'environnement Vercel.
