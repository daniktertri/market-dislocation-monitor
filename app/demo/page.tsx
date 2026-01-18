'use client';

const mockData = [
  {
    time: '2024-01-15 14:32:15',
    source: 'CoinDesk',
    category: 'Regulation',
    bias: 'Neutral',
    horizon: 'Medium',
    confidence: '0.87',
    summary: 'SEC delays decision on spot Bitcoin ETF applications until Q2 2024.'
  },
  {
    time: '2024-01-15 14:28:42',
    source: 'The Block',
    category: 'Technology',
    bias: 'Positive',
    horizon: 'Short',
    confidence: '0.92',
    summary: 'Ethereum network upgrade reduces gas costs by 15% in testnet deployment.'
  },
  {
    time: '2024-01-15 14:25:18',
    source: 'Reuters',
    category: 'Market',
    bias: 'Negative',
    horizon: 'Short',
    confidence: '0.78',
    summary: 'Major exchange reports technical issues during high-volume trading session.'
  },
  {
    time: '2024-01-15 14:20:05',
    source: 'Bloomberg',
    category: 'Institutional',
    bias: 'Positive',
    horizon: 'Long',
    confidence: '0.95',
    summary: 'Asset management firm announces $500M allocation to digital assets.'
  },
  {
    time: '2024-01-15 14:15:33',
    source: 'Decrypt',
    category: 'Technology',
    bias: 'Neutral',
    horizon: 'Medium',
    confidence: '0.81',
    summary: 'Layer 2 scaling solution reaches 1M daily transactions milestone.'
  },
  {
    time: '2024-01-15 14:10:22',
    source: 'CoinTelegraph',
    category: 'Regulation',
    bias: 'Negative',
    horizon: 'Long',
    confidence: '0.73',
    summary: 'Regulatory body proposes stricter KYC requirements for DeFi protocols.'
  },
  {
    time: '2024-01-15 14:05:11',
    source: 'The Block',
    category: 'Market',
    bias: 'Neutral',
    horizon: 'Short',
    confidence: '0.88',
    summary: 'Bitcoin options open interest reaches new all-time high of $18B.'
  },
  {
    time: '2024-01-15 14:00:47',
    source: 'CoinDesk',
    category: 'Institutional',
    bias: 'Positive',
    horizon: 'Medium',
    confidence: '0.91',
    summary: 'Central bank digital currency pilot program expands to 5 additional countries.'
  },
];

export default function DemoPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold uppercase mb-8 tracking-wider">
        News Feed Demo
      </h1>

      <div className="terminal-border bg-white overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-black bg-gray-100">
              <th className="border-r-2 border-black p-3 text-left text-xs uppercase font-bold">Time</th>
              <th className="border-r-2 border-black p-3 text-left text-xs uppercase font-bold">Source</th>
              <th className="border-r-2 border-black p-3 text-left text-xs uppercase font-bold">Category</th>
              <th className="border-r-2 border-black p-3 text-left text-xs uppercase font-bold">Bias</th>
              <th className="border-r-2 border-black p-3 text-left text-xs uppercase font-bold">Horizon</th>
              <th className="border-r-2 border-black p-3 text-left text-xs uppercase font-bold">Confidence</th>
              <th className="p-3 text-left text-xs uppercase font-bold">Summary</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((row, index) => (
              <tr 
                key={index} 
                className={`border-b border-gray-300 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                <td className="border-r-2 border-gray-300 p-3 text-xs font-mono">{row.time}</td>
                <td className="border-r-2 border-gray-300 p-3 text-xs">{row.source}</td>
                <td className="border-r-2 border-gray-300 p-3 text-xs uppercase">{row.category}</td>
                <td className="border-r-2 border-gray-300 p-3 text-xs">
                  <span className={`inline-block px-2 py-1 border border-black ${
                    row.bias === 'Positive' ? 'bg-green-100' : 
                    row.bias === 'Negative' ? 'bg-red-100' : 
                    'bg-gray-100'
                  }`}>
                    {row.bias}
                  </span>
                </td>
                <td className="border-r-2 border-gray-300 p-3 text-xs uppercase">{row.horizon}</td>
                <td className="border-r-2 border-gray-300 p-3 text-xs font-mono">{row.confidence}</td>
                <td className="p-3 text-xs">{row.summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-xs text-gray-600">
        <div className="uppercase font-bold mb-2">Note:</div>
        <div>Data shown is simulated for demonstration purposes. Real-time feed requires active monitoring subscription.</div>
      </div>
    </div>
  );
}
