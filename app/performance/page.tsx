'use client';

import { motion } from 'framer-motion';

// Mock equity curve data
const generateEquityData = () => {
  const data = [];
  let equity = 100000;
  const dates = [];
  const startDate = new Date('2023-01-01');
  
  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    dates.push(date);
    
    // Simulate random walk with slight upward bias
    const change = (Math.random() - 0.45) * 2000;
    equity = Math.max(80000, equity + change);
    data.push(equity);
  }
  
  return { dates, equity: data };
};

const { dates, equity } = generateEquityData();

// Calculate drawdowns
const calculateDrawdowns = (equity: number[]) => {
  const drawdowns: number[] = [];
  let peak = equity[0];
  
  for (let i = 0; i < equity.length; i++) {
    if (equity[i] > peak) {
      peak = equity[i];
    }
    const drawdown = ((equity[i] - peak) / peak) * 100;
    drawdowns.push(drawdown);
  }
  
  return drawdowns;
};

const drawdowns = calculateDrawdowns(equity);

// Find max drawdown
const maxDrawdown = Math.min(...drawdowns);
const maxDrawdownIndex = drawdowns.indexOf(maxDrawdown);

// Calculate stats
const finalEquity = equity[equity.length - 1];
const initialEquity = equity[0];
const totalReturn = ((finalEquity - initialEquity) / initialEquity) * 100;
const maxEquity = Math.max(...equity);
const minEquity = Math.min(...equity);

const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.3 }
};

export default function PerformancePage() {
  const chartHeight = 300;
  const chartWidth = 800;
  const padding = 40;
  
  const equityMin = Math.min(...equity);
  const equityMax = Math.max(...equity);
  const equityRange = equityMax - equityMin;
  
  const drawdownMin = Math.min(...drawdowns);
  const drawdownMax = 0;
  const drawdownRange = drawdownMax - drawdownMin;
  
  const scaleX = (index: number) => padding + (index / (equity.length - 1)) * (chartWidth - 2 * padding);
  const scaleEquityY = (value: number) => padding + ((equityMax - value) / equityRange) * (chartHeight - 2 * padding);
  const scaleDrawdownY = (value: number) => padding + ((drawdownMax - value) / drawdownRange) * (chartHeight - 2 * padding);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.h1
        className="text-3xl font-bold uppercase mb-8 tracking-wider text-shadow-pixel"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        Performance Metrics
      </motion.h1>

      <motion.div
        className="grid grid-cols-4 gap-4 mb-8"
        {...fadeIn}
      >
        {[
          { label: 'Total Return', value: `${totalReturn.toFixed(2)}%` },
          { label: 'Max Drawdown', value: `${maxDrawdown.toFixed(2)}%` },
          { label: 'Peak Equity', value: `$${maxEquity.toLocaleString()}` },
          { label: 'Current Equity', value: `$${finalEquity.toLocaleString()}` }
        ].map((stat) => (
          <div
            key={stat.label}
            className="terminal-border bg-white p-4 card-gradient hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="text-xs uppercase font-bold mb-1">{stat.label}</div>
            <div className="text-2xl font-mono">{stat.value}</div>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="terminal-border bg-white p-6 mb-8 card-gradient"
        {...fadeIn}
      >
        <h2 className="text-lg font-bold uppercase mb-4 tracking-wider">Equity Curve</h2>
        <div className="relative" style={{ height: chartHeight + padding * 2 }}>
          <svg width="100%" height={chartHeight + padding * 2} viewBox={`0 0 ${chartWidth} ${chartHeight + padding * 2}`}>
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
              <g key={ratio}>
                <line
                  x1={padding}
                  y1={padding + ratio * (chartHeight - 2 * padding)}
                  x2={chartWidth - padding}
                  y2={padding + ratio * (chartHeight - 2 * padding)}
                  stroke="#000"
                  strokeWidth="1"
                  opacity="0.1"
                />
                <text
                  x={padding - 10}
                  y={padding + ratio * (chartHeight - 2 * padding) + 4}
                  fontSize="10"
                  fill="#000"
                  textAnchor="end"
                >
                  ${(equityMax - ratio * equityRange).toLocaleString()}
                </text>
              </g>
            ))}
            
            {/* Equity curve */}
            <polyline
              points={equity.map((value, index) => `${scaleX(index)},${scaleEquityY(value)}`).join(' ')}
              fill="none"
              stroke="#000"
              strokeWidth="2"
            />
            
            {/* Max drawdown marker */}
            <circle
              cx={scaleX(maxDrawdownIndex)}
              cy={scaleEquityY(equity[maxDrawdownIndex])}
              r="4"
              fill="#c62828"
              stroke="#000"
              strokeWidth="1"
            />
          </svg>
        </div>
      </motion.div>

      <motion.div
        className="terminal-border bg-white p-6 card-gradient"
        {...fadeIn}
      >
        <h2 className="text-lg font-bold uppercase mb-4 tracking-wider">Drawdown Analysis</h2>
        <div className="relative" style={{ height: chartHeight + padding * 2 }}>
          <svg width="100%" height={chartHeight + padding * 2} viewBox={`0 0 ${chartWidth} ${chartHeight + padding * 2}`}>
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
              <g key={ratio}>
                <line
                  x1={padding}
                  y1={padding + ratio * (chartHeight - 2 * padding)}
                  x2={chartWidth - padding}
                  y2={padding + ratio * (chartHeight - 2 * padding)}
                  stroke="#000"
                  strokeWidth="1"
                  opacity="0.1"
                />
                <text
                  x={padding - 10}
                  y={padding + ratio * (chartHeight - 2 * padding) + 4}
                  fontSize="10"
                  fill="#000"
                  textAnchor="end"
                >
                  {(drawdownMax - ratio * drawdownRange).toFixed(1)}%
                </text>
              </g>
            ))}
            
            {/* Drawdown area */}
            <polygon
              points={`${padding},${scaleDrawdownY(0)} ${drawdowns.map((value, index) => `${scaleX(index)},${scaleDrawdownY(value)}`).join(' ')} ${chartWidth - padding},${scaleDrawdownY(0)}`}
              fill="#c62828"
              opacity="0.2"
              stroke="#000"
              strokeWidth="1"
            />
            
            {/* Drawdown line */}
            <polyline
              points={drawdowns.map((value, index) => `${scaleX(index)},${scaleDrawdownY(value)}`).join(' ')}
              fill="none"
              stroke="#c62828"
              strokeWidth="2"
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
