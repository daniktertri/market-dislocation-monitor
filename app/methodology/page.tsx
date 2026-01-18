'use client';

import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.3 }
};

export default function MethodologyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.h1
        className="text-3xl font-bold uppercase mb-8 tracking-wider text-shadow-pixel"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        Methodology
      </motion.h1>

      <div className="space-y-8">
        {[
          {
            title: 'System Overview',
            content: [
              'The Crypto News Monitor is an automated system designed to ingest, analyze, and structure cryptocurrency-relevant news from multiple sources. The system operates continuously, processing news feeds with sub-minute latency to extract structured metadata and generate actionable insights.',
              'The system does not provide trading advice, price predictions, or investment recommendations. It is a monitoring and analysis tool that structures information for further evaluation by qualified professionals.'
            ]
          },
          {
            title: 'Data Ingestion',
            content: [
              'News articles are collected from a curated set of sources including major cryptocurrency publications, financial news outlets, and regulatory announcements. Sources are selected based on reliability, update frequency, and relevance to cryptocurrency markets.',
              'Each article is timestamped at ingestion and assigned a unique identifier. Raw text is preserved for archival purposes, while structured extraction occurs in parallel.'
            ]
          },
          {
            title: 'Classification Framework',
            content: [
              'Articles are classified along three primary dimensions:',
              'Category: Regulation, Technology, Market, Institutional, or Other. Determined through keyword matching and semantic analysis.',
              'Bias: Bullish, Bearish, or Neutral. Assessed through sentiment analysis of article content and headline tone.',
              'Horizon: Short (immediate impact), Medium (days to weeks), or Long (months to years). Based on temporal language and event type.'
            ]
          },
          {
            title: 'Confidence Scoring',
            content: [
              'Each classification is assigned a confidence score between 0.0 and 1.0. Confidence is calculated based on the clarity of signals, source reliability, and consistency of classification indicators.',
              'Scores above 0.8 indicate high confidence in classification accuracy. Scores below 0.6 suggest ambiguous content requiring manual review. The system flags low-confidence classifications for human verification.'
            ]
          },
          {
            title: 'Performance Validation',
            content: [
              'System performance is measured through retrospective analysis of news classifications against subsequent market movements. This validation process tracks the accuracy of bias detection and horizon estimation.',
              'Performance metrics include classification accuracy, false positive rates, and temporal relevance validation. These metrics are updated monthly and used to refine classification algorithms.'
            ]
          },
          {
            title: 'Limitations and Disclaimers',
            content: [
              'The system processes publicly available information and does not have access to private communications, insider information, or non-public data sources. Classification accuracy depends on the quality and clarity of source material.',
              'The system does not account for market manipulation, coordinated information campaigns, or false information. Users should verify critical information through independent sources before making any decisions.',
              'Past performance of classification accuracy does not guarantee future results. Market conditions, regulatory changes, and information landscape evolution may affect system performance over time.'
            ]
          }
        ].map((section) => (
          <motion.section
            key={section.title}
            className="terminal-border bg-white p-6 card-gradient hover:bg-gray-100 transition-colors duration-200"
            {...fadeIn}
          >
            <h2 className="text-xl font-bold uppercase mb-4 tracking-wider">{section.title}</h2>
            <div className="space-y-4 text-sm leading-relaxed">
              {section.content.map((paragraph, pIndex) => (
                <p key={pIndex}>
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
