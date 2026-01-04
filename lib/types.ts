export type MarketRegime = 'NORMAL' | 'STRESS' | 'LIQUIDITY_EVENT' | 'NARRATIVE_BREAK';

export interface AssetData {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  volatility: number;
  zScore: number;
  regime: MarketRegime;
  timestamp: number;
}

export interface MarketSnapshot {
  assets: AssetData[];
  timestamp: number;
  crossAssetEvents: {
    narrativeBreak: boolean;
    liquidityEvent: boolean;
  };
}

export interface PriceHistory {
  prices: number[];
  timestamps: number[];
}

