export default function MethodologyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold uppercase mb-8 tracking-wider">
        Methodology
      </h1>

      <div className="space-y-8">
        <section className="terminal-border bg-white p-6">
          <h2 className="text-xl font-bold uppercase mb-4 tracking-wider">
            System Overview
          </h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              The Crypto News Monitor is an automated system designed to ingest, analyze, and structure 
              cryptocurrency-relevant news from multiple sources. The system operates continuously, processing 
              news feeds with sub-minute latency to extract structured metadata and generate actionable insights.
            </p>
            <p>
              The system does not provide trading advice, price predictions, or investment recommendations. 
              It is a monitoring and analysis tool that structures information for further evaluation by 
              qualified professionals.
            </p>
          </div>
        </section>

        <section className="terminal-border bg-white p-6">
          <h2 className="text-xl font-bold uppercase mb-4 tracking-wider">
            Data Ingestion
          </h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              News articles are collected from a curated set of sources including major cryptocurrency 
              publications, financial news outlets, and regulatory announcements. Sources are selected based 
              on reliability, update frequency, and relevance to cryptocurrency markets.
            </p>
            <p>
              Each article is timestamped at ingestion and assigned a unique identifier. Raw text is 
              preserved for archival purposes, while structured extraction occurs in parallel.
            </p>
          </div>
        </section>

        <section className="terminal-border bg-white p-6">
          <h2 className="text-xl font-bold uppercase mb-4 tracking-wider">
            Classification Framework
          </h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              Articles are classified along three primary dimensions:
            </p>
            <ul className="list-none space-y-2 ml-4">
              <li className="flex items-start">
                <span className="mr-2 font-bold">Category:</span>
                <span>Regulation, Technology, Market, Institutional, or Other. Determined through keyword matching and semantic analysis.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 font-bold">Bias:</span>
                <span>Positive, Negative, or Neutral. Assessed through sentiment analysis of article content and headline tone.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 font-bold">Horizon:</span>
                <span>Short (immediate impact), Medium (days to weeks), or Long (months to years). Based on temporal language and event type.</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="terminal-border bg-white p-6">
          <h2 className="text-xl font-bold uppercase mb-4 tracking-wider">
            Confidence Scoring
          </h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              Each classification is assigned a confidence score between 0.0 and 1.0. Confidence is 
              calculated based on the clarity of signals, source reliability, and consistency of 
              classification indicators.
            </p>
            <p>
              Scores above 0.8 indicate high confidence in classification accuracy. Scores below 0.6 
              suggest ambiguous content requiring manual review. The system flags low-confidence 
              classifications for human verification.
            </p>
          </div>
        </section>

        <section className="terminal-border bg-white p-6">
          <h2 className="text-xl font-bold uppercase mb-4 tracking-wider">
            Performance Validation
          </h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              System performance is measured through retrospective analysis of news classifications 
              against subsequent market movements. This validation process tracks the accuracy of 
              bias detection and horizon estimation.
            </p>
            <p>
              Performance metrics include classification accuracy, false positive rates, and temporal 
              relevance validation. These metrics are updated monthly and used to refine classification 
              algorithms.
            </p>
          </div>
        </section>

        <section className="terminal-border bg-white p-6">
          <h2 className="text-xl font-bold uppercase mb-4 tracking-wider">
            Limitations and Disclaimers
          </h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              The system processes publicly available information and does not have access to private 
              communications, insider information, or non-public data sources. Classification accuracy 
              depends on the quality and clarity of source material.
            </p>
            <p>
              The system does not account for market manipulation, coordinated information campaigns, 
              or false information. Users should verify critical information through independent sources 
              before making any decisions.
            </p>
            <p>
              Past performance of classification accuracy does not guarantee future results. Market 
              conditions, regulatory changes, and information landscape evolution may affect system 
              performance over time.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
