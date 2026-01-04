'use client';

import { useEffect, useState } from 'react';
import { MarketSnapshot } from '@/lib/types';
import { MarketGrid } from './components/MarketGrid';

export default function Home() {
  const [snapshot, setSnapshot] = useState<MarketSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSnapshot = async () => {
    try {
      const response = await fetch('/api/snapshot', {
        cache: 'no-store',
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('Waiting for initial data...');
          return;
        }
        throw new Error('Failed to fetch snapshot');
      }

      const data = await response.json();
      setSnapshot(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching snapshot:', err);
      setError('Failed to load market data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchSnapshot();

    // Poll every 15 seconds
    const interval = setInterval(fetchSnapshot, 15000);

    return () => clearInterval(interval);
  }, []);

  const formatTimestamp = (ts: number): string => {
    return new Date(ts).toLocaleTimeString();
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Live Market Dislocation Monitor
          </h1>
          <p className="text-gray-400">
            Detecting abnormal market behavior in real time.
          </p>
        </div>

        {loading && (
          <div className="text-center py-12 text-gray-500">
            Loading market data...
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="text-yellow-500 mb-4">{error}</div>
            <div className="space-y-4">
              <button
                onClick={async () => {
                  setLoading(true);
                  setError(null);
                  // First trigger the update endpoint to initialize data
                  try {
                    await fetch('/api/update', { method: 'GET' });
                    // Then fetch the snapshot
                    await fetchSnapshot();
                  } catch (err) {
                    console.error('Error initializing:', err);
                    setError('Failed to initialize. Please try again.');
                    setLoading(false);
                  }
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
              >
                Initialize Data
              </button>
              <button
                onClick={fetchSnapshot}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white ml-2"
              >
                Retry
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              If this is the first load, click "Initialize Data" to fetch market data.
            </p>
          </div>
        )}

        {snapshot && !loading && (
          <>
            <div className="mb-6">
              <MarketGrid assets={snapshot.assets} />
            </div>

            {snapshot.crossAssetEvents.narrativeBreak && (
              <div className="mt-6 p-4 bg-purple-900/30 border border-purple-700 rounded">
                <div className="font-semibold text-purple-300">
                  NARRATIVE_BREAK detected
                </div>
                <div className="text-sm text-purple-400 mt-1">
                  Equities declining with VIX spike and stable FX
                </div>
              </div>
            )}

            {snapshot.crossAssetEvents.liquidityEvent && (
              <div className="mt-4 p-4 bg-red-900/30 border border-red-700 rounded">
                <div className="font-semibold text-red-300">
                  LIQUIDITY_EVENT detected
                </div>
                <div className="text-sm text-red-400 mt-1">
                  Equities declining with rising yields
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-800 text-sm text-gray-500">
              <div>Last updated: {formatTimestamp(snapshot.timestamp)}</div>
              <div className="mt-2">
                This tool does not predict markets. It detects regime shifts.
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

