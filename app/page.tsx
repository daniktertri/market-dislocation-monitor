export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="text-3xl font-bold uppercase mb-6 tracking-wider">
          Continuous monitoring and structured analysis of crypto-relevant news.
        </h1>
      </div>

      <div className="terminal-border bg-white p-8 mb-12">
        <h2 className="text-xl font-bold uppercase mb-6 tracking-wider">
          System Flow
        </h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="border-2 border-black p-4 bg-white">
            <div className="text-sm uppercase font-bold mb-2">News</div>
            <div className="text-xs text-gray-600">
              Raw feed ingestion from multiple sources
            </div>
          </div>
          <div className="border-2 border-black p-4 bg-white">
            <div className="text-sm uppercase font-bold mb-2">Analysis</div>
            <div className="text-xs text-gray-600">
              Structured extraction and classification
            </div>
          </div>
          <div className="border-2 border-black p-4 bg-white">
            <div className="text-sm uppercase font-bold mb-2">Insight</div>
            <div className="text-xs text-gray-600">
              Bias detection and horizon mapping
            </div>
          </div>
          <div className="border-2 border-black p-4 bg-white">
            <div className="text-sm uppercase font-bold mb-2">Tracking</div>
            <div className="text-xs text-gray-600">
              Performance monitoring and validation
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="h-0.5 bg-black flex-1"></div>
          <div className="mx-2 text-xs">→</div>
          <div className="h-0.5 bg-black flex-1"></div>
          <div className="mx-2 text-xs">→</div>
          <div className="h-0.5 bg-black flex-1"></div>
          <div className="mx-2 text-xs">→</div>
          <div className="h-0.5 bg-black flex-1"></div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="border-2 border-black p-6 bg-white">
          <div className="text-sm uppercase font-bold mb-2">Real-time</div>
          <div className="text-xs text-gray-600">
            Continuous monitoring of news feeds with sub-minute latency
          </div>
        </div>
        <div className="border-2 border-black p-6 bg-white">
          <div className="text-sm uppercase font-bold mb-2">Structured</div>
          <div className="text-xs text-gray-600">
            Automated extraction of metadata, bias, and temporal relevance
          </div>
        </div>
        <div className="border-2 border-black p-6 bg-white">
          <div className="text-sm uppercase font-bold mb-2">Validated</div>
          <div className="text-xs text-gray-600">
            Performance tracking against market movements and outcomes
          </div>
        </div>
      </div>
    </div>
  );
}
