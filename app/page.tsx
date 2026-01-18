'use client';

import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.4, ease: 'easeOut' }
};

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold uppercase mb-6 tracking-wider text-shadow-pixel">
          Continuous monitoring and structured analysis of crypto-relevant news.
        </h1>
      </motion.div>

      <motion.div 
        className="terminal-border bg-white p-8 mb-12 card-gradient"
        {...fadeInUp}
      >
        <h2 className="text-xl font-bold uppercase mb-6 tracking-wider">
          System Flow
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {['News', 'Analysis', 'Insight', 'Tracking'].map((title, index) => (
            <motion.div
              key={title}
              className="border-2 border-black p-4 bg-white hover:bg-gray-100 transition-all duration-200"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ translateY: -2, translateX: 2 }}
            >
              <div className="text-sm uppercase font-bold mb-2">{title}</div>
              <div className="text-xs text-gray-600">
                {title === 'News' && 'Raw feed ingestion from multiple sources'}
                {title === 'Analysis' && 'Structured extraction and classification'}
                {title === 'Insight' && 'Bias detection and horizon mapping'}
                {title === 'Tracking' && 'Performance monitoring and validation'}
              </div>
            </motion.div>
          ))}
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
      </motion.div>

      <div className="grid grid-cols-3 gap-6">
        {[
          { title: 'Real-time', desc: 'Continuous monitoring of news feeds with sub-minute latency' },
          { title: 'Structured', desc: 'Automated extraction of metadata, bias, and temporal relevance' },
          { title: 'Validated', desc: 'Performance tracking against market movements and outcomes' }
        ].map((item, index) => (
          <motion.div
            key={item.title}
            className="border-2 border-black p-6 bg-white card-gradient hover:bg-gray-100 transition-all duration-200"
            {...fadeInUp}
            transition={{ delay: index * 0.1 }}
            whileHover={{ translateY: -2, translateX: 2 }}
          >
            <div className="text-sm uppercase font-bold mb-2">{item.title}</div>
            <div className="text-xs text-gray-600">{item.desc}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
