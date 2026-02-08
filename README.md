# Learn with Jiji – Backend Service

This repository contains the backend implementation for **VeidaLabs – Software Developer Hiring Assignment**.

The project simulates the core backend flow of **Learn with Jiji**, an AI-powered learning companion. The focus is on backend fundamentals, Supabase usage, API design, and basic security practices. No real AI or frontend is implemented.

---

## 📌 Project Overview

The backend exposes a single API that:

1. Accepts a user learning query (e.g., "Explain RAG")
2. Stores the query for the authenticated user
3. Fetches relevant learning resources (PPT / Video)
4. Returns a structured response consumable by frontend clients

AI responses are **mocked** for this assignment.

---

## 🛠 Tech Stack

* **Node.js**
* **Express.js**
* **Supabase**

  * Database (PostgreSQL)
  * Auth (mocked / simplified)
  * Storage (PPT & Video files)
  * Row Level Security (RLS)
* **Zod** – input validation

---

## 📂 Project Structure

```
src/
 ├── index.js            # App entry point
 ├── routes/
 │    └── askJiji.js     # /ask-jiji API route
 ├── lib/
 │    └── supabase.js    # Supabase client
 └── validators/
      └── askValidator.js

.env
package.json
README.md
```

---

## ⚙️ Setup & Run Locally

### 1. Clone the repository

```bash
git clone <your-github-repo-url>
cd learn-with-jiji-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Create a `.env` file in the root directory:

```env
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Start the server

```bash
npm run dev
```

Server will start at:

```
http://localhost:5000
```

---

## 🔌 API Documentation

### POST `/api/ask-jiji`

#### Request Body

```json
{
  "query": "Explain RAG"
}
```

#### Response

```json
{
  "answer": "This is a mocked explanation for Explain RAG",
  "resources": [
    {
      "id": "uuid",
      "title": "RAG Basics PPT",
      "type": "ppt",
      "topic": "RAG",
      "file_url": "https://..."
    },
    {
      "id": "uuid",
      "title": "RAG Explained Video",
      "type": "video",
      "topic": "RAG",
      "file_url": "https://..."
    }
  ]
}
```

---

## 🗄 Database Schema

### Tables

* **profiles** – user profile data linked to Supabase Auth
* **queries** – stores user queries
* **resources** – learning materials (PPT / Video)

### Storage

* Supabase Storage bucket: `learning-resources`
* Contains sample PPT and video files
* Public URLs are stored in the `resources.file_url` column

---

## 🔐 Authentication & RLS

* Authentication is simplified for this assignment
* Each query is linked to a user ID
* **Row Level Security (RLS)** is enabled on the `queries` table

### RLS Policy Example

Users can only read their own queries:

```sql
auth.uid() = user_id
```

This ensures data isolation and basic security best practices.

---

## 🔒 Security Considerations

* Input validation using **Zod**
* No secrets hardcoded in the repository
* Environment variables used for sensitive configuration
* RLS enabled in Supabase

---

## 🚀 Future Improvements

If more time were available, the following enhancements could be made:

* Semantic search instead of keyword matching
* Real AI/LLM-based response generation
* Private storage buckets with short-lived signed URLs
* Caching frequently asked queries
* Role-based access control

---

## 🎥 Demo

A short demo video is included in the submission showing:

* API request/response
* Supabase tables
* Storage bucket usage
* RLS configuration

---

## 👤 Author

**Name:** <Prahlad Chandra>
**LinkedIn:** <[LinkedIn Profile](https://www.linkedin.com/in/prahlad-chandra-dev/)>
**GitHub:** <Your GitHub Profile>

---

📧 Submitted as part of **VeidaLabs – Software Developer Hiring Assignment**
