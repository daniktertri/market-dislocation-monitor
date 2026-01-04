'use client';

import { AssetData } from '@/lib/types';
import { StatusBadge } from './StatusBadge';

interface MarketGridProps {
  assets: AssetData[];
}

/**
 * Grid component displaying market data
 */
export function MarketGrid({ assets }: MarketGridProps) {
  const formatChange = (change: number): string => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-800 text-sm text-gray-500">
        <div>Asset</div>
        <div className="text-right">% Change</div>
        <div className="text-right">Status</div>
      </div>
      <div className="space-y-4">
        {assets.map((asset) => (
          <div
            key={asset.symbol}
            className="grid grid-cols-3 gap-4 items-center"
          >
            <div className="font-medium">{asset.name}</div>
            <div
              className={`text-right ${
                asset.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {formatChange(asset.changePercent)}
            </div>
            <div className="text-right">
              <StatusBadge regime={asset.regime} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

