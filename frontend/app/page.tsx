'use client';
import { useState } from 'react';

interface Result {
  analysis: string;
  plan: string;
}

export default function Home() {
  const [idea, setIdea] = useState<string>('');
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!idea.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea }),
      });
      const data: Result = await res.json();
      setResult(data);
    } catch (err) {
      setError('Could not connect to the server. Make sure your backend is running.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">

      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-violet-600 flex items-center justify-center text-sm font-bold">K</div>
          <span className="font-semibold tracking-tight">KickStart Zero</span>
        </div>
        <span className="text-xs text-gray-500">Idea → Execution Plan</span>
      </header>

      {/* Hero */}
      <section className="max-w-2xl mx-auto px-6 pt-20 pb-12 text-center">
        <div className="inline-block text-xs font-medium bg-violet-950 text-violet-300 border border-violet-800 rounded-full px-3 py-1 mb-6">
          AI-Powered Execution Planning
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4 leading-tight">
          Turn your idea into<br />
          <span className="text-violet-400">an actionable plan</span>
        </h1>
        <p className="text-gray-400 text-lg mb-10">
          Describe your idea below. KickStart Zero will analyse it, identify risks,
          and generate a realistic roadmap with prioritized action items.
        </p>

        {/* Input */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-left">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            What's your idea?
          </label>
          <textarea
            className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-violet-600 transition"
            rows={5}
            placeholder="e.g. An app that helps college students find study groups near them based on subject and availability..."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            disabled={loading || !idea.trim()}
            className="mt-4 w-full bg-violet-600 hover:bg-violet-500 disabled:bg-gray-700 disabled:text-gray-500 text-white font-semibold py-3 rounded-xl transition text-sm"
          >
            {loading ? 'Generating your plan...' : 'Generate Execution Plan →'}
          </button>
          {error && (
            <p className="mt-3 text-red-400 text-sm text-center">{error}</p>
          )}
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="max-w-2xl mx-auto px-6 pb-12">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center">
            <div className="w-8 h-8 border-2 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400 text-sm">Analysing your idea and building your plan...</p>
          </div>
        </section>
      )}

      {/* Results */}
      {result && (
        <section className="max-w-2xl mx-auto px-6 pb-20 flex flex-col gap-6">

          {/* Analysis Card */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-md bg-blue-900 text-blue-300 text-xs flex items-center justify-center font-bold">1</span>
              <h2 className="font-semibold text-white">Idea Analysis</h2>
            </div>
            <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">{result.analysis}</p>
          </div>

          {/* Plan Card */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-md bg-violet-900 text-violet-300 text-xs flex items-center justify-center font-bold">2</span>
              <h2 className="font-semibold text-white">Execution Plan</h2>
            </div>
            <div className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">{result.plan}</div>
          </div>

          {/* Reset */}
          <button
            onClick={() => { setResult(null); setIdea(''); }}
            className="text-sm text-gray-500 hover:text-gray-300 transition text-center"
          >
            ← Start with a new idea
          </button>

        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 text-center text-xs text-gray-600">
        KickStart Zero — From idea to execution, one plan at a time.
      </footer>

    </main>
  );
}