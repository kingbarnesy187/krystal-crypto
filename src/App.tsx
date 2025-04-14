// KrystalCrypto v1 - React App Entry Point
// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ---------------------------

// src/App.tsx
import React from 'react';
import AIAdvisor from './components/AIAdvisor';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Krystal Crypto</h1>
      <AIAdvisor />
    </div>
  );
}

// ---------------------------

// src/components/AIAdvisor.tsx
import React, { useState } from 'react';
import { useAIAdvisor } from '../stores/aiAdvisor';

export default function AIAdvisor() {
  const { loading, error, lastResponse, getAdvice } = useAIAdvisor();
  const [query, setQuery] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    await getAdvice(query);
    setQuery('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 rounded border border-gray-300"
          placeholder="Ask Krystal anything..."
        />
        <button
          type="submit"
          className="mt-2 w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Ask
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {lastResponse && (
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
          <h2 className="font-bold mb-2">Advice:</h2>
          <p>{lastResponse.advice}</p>
        </div>
      )}
    </div>
  );
}

// ---------------------------

// src/stores/aiAdvisor.ts
import { create } from 'zustand';
import { askAIAdvisor, AIResponse } from '../lib/aiAdvisor';

interface AIAdvisorState {
  loading: boolean;
  error: string | null;
  lastResponse: AIResponse | null;
  getAdvice: (query: string) => Promise<void>;
}

export const useAIAdvisor = create<AIAdvisorState>((set) => ({
  loading: false,
  error: null,
  lastResponse: null,
  getAdvice: async (query) => {
    set({ loading: true, error: null });
    try {
      const response = await askAIAdvisor({ query });
      set({ lastResponse: response, loading: false });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },
}));

// ---------------------------

// src/lib/aiAdvisor.ts
export interface AIResponse {
  advice: string;
}

export const askAIAdvisor = async ({ query }: { query: string }): Promise<AIResponse> => {
  // This can be replaced with a real AI backend call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ advice: `Based on your query: "${query}", we suggest monitoring BTC and ETH levels.` });
    }, 1000);
  });
};

// ---------------------------

// .env.example
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
TELEGRAM_BOT_TOKEN=

// ---------------------------

// README.md (excerpt)
# Krystal Crypto v1

AI-powered Telegram trading assistant for crypto and stock analysis.

## Features
- Supabase authentication
- React UI with AIAdvisor component
- Telegram bot integration (not shown in this snippet)
- Role-based permissions for admin/user
- Toggleable dark mode

## Getting Started
1. Clone the repo
2. Run `npm install`
3. Add values to `.env`
4. Start the app with `npm run dev`

---

More folders (e.g. Telegram Bot, Supabase schema, Edge Functions) can be added in the next snippet.
