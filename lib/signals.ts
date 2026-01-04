import { AssetData, MarketRegime, MarketSnapshot, PriceHistory } from './types';
import { ASSETS } from './data';

/**
 * Calculate rolling volatility (standard deviation of returns)
 */
export function calculateVolatility(history: PriceHistory): number {
  if (history.prices.length < 2) return 0;

  const returns: number[] = [];
  for (let i = 1; i < history.prices.length; i++) {
    const prevPrice = history.prices[i - 1];
    const currPrice = history.prices[i];
    if (prevPrice > 0) {
      returns.push((currPrice - prevPrice) / prevPrice);
    }
  }

  if (returns.length === 0) return 0;

  const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance =
    returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
  
  return Math.sqrt(variance);
}

/**
 * Calculate z-score: (current move) / (rolling volatility)
 */
export function calculateZScore(
  changePercent: number,
  volatility: number
): number {
  if (volatility === 0) return 0;
  // Convert changePercent to decimal and divide by volatility
  return Math.abs(changePercent / 100) / volatility;
}

/**
 * Classify market regime based on z-score
 */
export function classifyRegime(zScore: number): MarketRegime {
  if (zScore < 1) {
    return 'NORMAL';
  } else if (zScore < 2) {
    return 'STRESS';
  } else {
    return 'LIQUIDITY_EVENT';
  }
}

/**
 * Calculate percentage change over last N minutes
 */
export function calculateChangePercent(
  currentPrice: number,
  history: PriceHistory,
  minutes: number = 15
): number {
  if (history.prices.length === 0) return 0;

  const cutoffTime = Date.now() - minutes * 60 * 1000;
  const relevantPrices = history.prices.filter(
    (_, i) => history.timestamps[i] >= cutoffTime
  );

  if (relevantPrices.length === 0) {
    // Fallback to oldest available price
    const oldestPrice = history.prices[0];
    if (oldestPrice > 0) {
      return ((currentPrice - oldestPrice) / oldestPrice) * 100;
    }
    return 0;
  }

  const referencePrice = relevantPrices[0];
  if (referencePrice > 0) {
    return ((currentPrice - referencePrice) / referencePrice) * 100;
  }

  return 0;
}

/**
 * Perform cross-asset analysis to detect narrative breaks
 */
export function detectCrossAssetEvents(assets: AssetData[]): {
  narrativeBreak: boolean;
  liquidityEvent: boolean;
} {
  const assetMap = new Map(assets.map((a) => [a.symbol, a]));

  const sp500 = assetMap.get('^GSPC');
  const treasury = assetMap.get('^TNX');
  const eurusd = assetMap.get('EURUSD=X');
  const vix = assetMap.get('^VIX');

  let narrativeBreak = false;
  let liquidityEvent = false;

  // Cross-asset check: Equities ↓ + Yields ↑ → LIQUIDITY_EVENT
  if (sp500 && treasury) {
    if (sp500.changePercent < -0.5 && treasury.changePercent > 0.1) {
      liquidityEvent = true;
    }
  }

  // Cross-asset check: Equities ↓ + VIX ↑ + FX flat → NARRATIVE_BREAK
  if (sp500 && vix && eurusd) {
    const fxMove = Math.abs(eurusd.changePercent);
    if (
      sp500.changePercent < -0.5 &&
      vix.changePercent > 5 &&
      fxMove < 0.2
    ) {
      narrativeBreak = true;
    }
  }

  // Bonds move without FX → potential credibility issue (can be flagged as stress)
  if (treasury && eurusd) {
    const treasuryMove = Math.abs(treasury.changePercent);
    const fxMove = Math.abs(eurusd.changePercent);
    if (treasuryMove > 0.2 && fxMove < 0.1) {
      // This is more of a stress indicator, already captured by individual z-scores
    }
  }

  return { narrativeBreak, liquidityEvent };
}

/**
 * Compute signals for all assets
 */
export async function computeSignals(
  currentPrices: Map<string, number>,
  histories: Map<string, PriceHistory>
): Promise<AssetData[]> {
  const assets: AssetData[] = [];

  for (const asset of ASSETS) {
    const currentPrice = currentPrices.get(asset.symbol);
    const history = histories.get(asset.symbol);

    if (!currentPrice || !history) {
      console.warn(`Missing data for ${asset.symbol}`);
      continue;
    }

    // Calculate change over last 15 minutes
    const changePercent = calculateChangePercent(currentPrice, history, 15);

    // Calculate rolling volatility
    const volatility = calculateVolatility(history);

    // Calculate z-score
    const zScore = calculateZScore(changePercent, volatility);

    // Classify regime
    let regime = classifyRegime(zScore);

    assets.push({
      symbol: asset.symbol,
      name: asset.name,
      price: currentPrice,
      changePercent,
      volatility,
      zScore,
      regime,
      timestamp: Date.now(),
    });
  }

  return assets;
}

/**
 * Apply cross-asset events to update regimes
 */
export function applyCrossAssetEvents(
  assets: AssetData[],
  events: { narrativeBreak: boolean; liquidityEvent: boolean }
): AssetData[] {
  return assets.map((asset) => {
    // If cross-asset analysis detects NARRATIVE_BREAK, override individual asset regime
    if (events.narrativeBreak && asset.symbol === '^GSPC') {
      return { ...asset, regime: 'NARRATIVE_BREAK' };
    }

    // If cross-asset analysis detects LIQUIDITY_EVENT, upgrade to LIQUIDITY_EVENT
    if (events.liquidityEvent && asset.regime !== 'LIQUIDITY_EVENT') {
      // Only upgrade if already in STRESS or higher
      if (asset.regime === 'STRESS') {
        return { ...asset, regime: 'LIQUIDITY_EVENT' };
      }
    }

    return asset;
  });
}

