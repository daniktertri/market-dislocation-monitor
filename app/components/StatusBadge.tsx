import { MarketRegime } from '@/lib/types';

interface StatusBadgeProps {
  regime: MarketRegime;
}

/**
 * Color-coded status badge component
 */
export function StatusBadge({ regime }: StatusBadgeProps) {
  const styles = {
    NORMAL: 'bg-gray-700 text-gray-300',
    STRESS: 'bg-yellow-600 text-yellow-100',
    LIQUIDITY_EVENT: 'bg-red-600 text-red-100',
    NARRATIVE_BREAK: 'bg-purple-600 text-purple-100',
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${styles[regime]}`}
    >
      {regime}
    </span>
  );
}

