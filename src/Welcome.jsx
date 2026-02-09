import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sdvBG from './assets/sdv_front_background2.jpg'; 
// I-import ang mga bagong GIF
import cat12 from './assets/cat12.gif';
import cat2 from './assets/cat2.gif';

function Welcome({ onNext, playMusic }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background Section */}
      <div className="absolute inset-0 z-0">
        <img src={sdvBG} className="w-full h-full object-cover" alt="BG" />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <AnimatePresence>
        {!isOpen ? (
          <motion.div 
            key="envelope"
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => { setIsOpen(true); playMusic(); }}
            className="z-10 cursor-pointer flex flex-col items-center"
          >
            <div className="text-9xl mb-4 drop-shadow-2xl">✉️</div>
            <p className="font-bold tracking-widest text-white drop-shadow-md animate-pulse">
              TAP TO OPEN...
            </p>
          </motion.div>
        ) : (
          <motion.div 
            key="greeting"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="z-10 flex flex-col items-center text-center px-4"
          >
            {/* DITO NA YUNG MGA GIF PRE! */}
            <div className="flex gap-4 mb-4 items-center">
               <img src={cat12} className="w-20 h-20" alt="cat12" />
               <div className="text-7xl">👋😊</div>
               <img src={cat2} className="w-20 h-20" alt="cat2" />
            </div>

            <h1 className="text-4xl font-black text-white mb-4 drop-shadow-lg">
              Magandang Araw/Gabi sa aking Boss Rona!!
            </h1>
            <p className="text-white text-lg max-w-sm mb-8 drop-shadow-md">
              "May suprise ako sayo this valentines day..."
            </p>
            
            <button 
              onClick={onNext} 
              className="bg-[#634e34] border-4 border-[#3a2a1a] text-white px-8 py-3 font-bold hover:scale-105 transition-transform"
            >
              Tignan natin? 👉
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Welcome;