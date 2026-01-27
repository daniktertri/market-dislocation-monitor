'use client';

import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.3 }
};

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold uppercase mb-6 tracking-wider text-shadow-pixel">
          Plateforme de paris sportifs
        </h1>
      </motion.div>

      <motion.div 
        className="terminal-border bg-white p-8 mb-12 card-gradient"
        {...fadeIn}
      >
        <h2 className="text-xl font-bold uppercase mb-6 tracking-wider">
          Fonctionnalités
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {['Inscription', 'Classement', 'Gestion'].map((title) => (
            <div
              key={title}
              className="border-2 border-black p-4 bg-white hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="text-sm uppercase font-bold mb-2">{title}</div>
              <div className="text-xs text-gray-600">
                {title === 'Inscription' && 'Créez votre compte avec nom, prénom, pseudo et email'}
                {title === 'Classement' && 'Consultez le classement avec pseudos et emails des participants'}
                {title === 'Gestion' && 'Gérez les matchs et supprimez ceux créés pour les tests'}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-6 mt-8">
        {[
          { title: 'Inscription', desc: 'Créez votre compte pour participer aux paris' },
          { title: 'Classement', desc: 'Consultez les résultats et contactez les gagnants' },
          { title: 'Matchs', desc: 'Gérez les matchs et supprimez ceux de test' }
        ].map((item) => (
          <motion.div
            key={item.title}
            className="border-2 border-black p-6 bg-white card-gradient hover:bg-gray-100 transition-colors duration-200"
            {...fadeIn}
          >
            <div className="text-sm uppercase font-bold mb-2">{item.title}</div>
            <div className="text-xs text-gray-600">{item.desc}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
