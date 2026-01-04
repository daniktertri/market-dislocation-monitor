import { PriceHistory } from './types';

/**
 * Asset configuration for monitoring
 */
export const ASSETS = [
  { symbol: '^GSPC', name: 'S&P 500' },
  { symbol: '^TNX', name: '10Y Treasury' }, // Using 10Y Treasury yield as proxy (2Y not directly available)
  { symbol: 'EURUSD=X', name: 'EUR/USD' },
  { symbol: '^VIX', name: 'VIX' },
] as const;

/**
 * Fetch real-time price from Yahoo Finance API
 * Falls back to mock data if API is unavailable
 */
export async function fetchPrice(symbol: string): Promise<number> {
  try {
    // Using Yahoo Finance API via yfinance or direct API
    // For production, you might want to use a more reliable API
    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1m&range=1d`,
      {
        next: { revalidate: 0 }, // Always fetch fresh data
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch ${symbol}`);
    }

    const data = await response.json();
    const result = data.chart?.result?.[0];
    
    if (!result || !result.meta) {
      throw new Error(`Invalid data for ${symbol}`);
    }

    return result.meta.regularMarketPrice || result.meta.previousClose;
  } catch (error) {
    console.error(`Error fetching ${symbol}:`, error);
    // Fallback: return a mock price for development
    // In production, you'd want to handle this more gracefully
    return getMockPrice(symbol);
  }
}

/**
 * Fetch historical prices for volatility calculation
 */
export async function fetchPriceHistory(
  symbol: string,
  periods: number = 60
): Promise<PriceHistory> {
  try {
    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1m&range=1d`,
      {
        next: { revalidate: 0 },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch history for ${symbol}`);
    }

    const data = await response.json();
    const result = data.chart?.result?.[0];
    
    if (!result || !result.timestamp || !result.indicators?.quote?.[0]?.close) {
      throw new Error(`Invalid history data for ${symbol}`);
    }

    const timestamps = result.timestamp;
    const closes = result.indicators.quote[0].close;
    
    // Filter out null values and get last N periods
    const validData = timestamps
      .map((ts: number, i: number) => ({
        timestamp: ts,
        price: closes[i],
      }))
      .filter((d: { price: number | null }) => d.price !== null)
      .slice(-periods);

    return {
      prices: validData.map((d: { price: number }) => d.price),
      timestamps: validData.map((d: { timestamp: number }) => d.timestamp),
    };
  } catch (error) {
    console.error(`Error fetching history for ${symbol}:`, error);
    return generateMockHistory(periods);
  }
}

/**
 * Mock price generator for development/fallback
 */
function getMockPrice(symbol: string): number {
  const basePrices: Record<string, number> = {
    '^GSPC': 5000,
    '^TNX': 4.5,
    'EURUSD=X': 1.08,
    '^VIX': 15,
  };
  const base = basePrices[symbol] || 100;
  // Add small random variation
  return base * (1 + (Math.random() - 0.5) * 0.02);
}

/**
 * Generate mock price history for development
 */
function generateMockHistory(periods: number): PriceHistory {
  const basePrice = 100;
  const prices: number[] = [];
  const timestamps: number[] = [];
  const now = Date.now();

  for (let i = 0; i < periods; i++) {
    const variation = (Math.random() - 0.5) * 0.02;
    prices.push(basePrice * (1 + variation));
    timestamps.push(now - (periods - i) * 60000); // 1 minute intervals
  }

  return { prices, timestamps };
}

