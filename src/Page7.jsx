import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import sdvBG from './assets/sdv6.jpg'; 
import akanFace from './assets/akan666.jpg'; 

function Page7({ onNext, onBack }) { 
  const [phase, setPhase] = useState('start'); // 'start', 'bubbling', 'reveal'
  const [currentEmoji, setCurrentEmoji] = useState(null);

  // Tongue-out Emoji Variants
  const emojis = ['😛', '😝', '😜', '🤪', '😋', '👻', '🤡'];

  useEffect(() => {
    if (phase === 'bubbling') {
      let count = 0;
      // Interval para magpalit-palit ng emoji every 400ms
      const interval = setInterval(() => {
        setCurrentEmoji(emojis[count % emojis.length]);
        count++;
      }, 400);

      // Timer para tapusin ang bubbling effect after 3 seconds
      const timeout = setTimeout(() => {
        clearInterval(interval);
        setPhase('reveal');
      }, 3000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [phase]);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 overflow-hidden">
      
      {/* 🖼️ Background Section */}
      <div className="absolute inset-0 z-0">
        <img src={sdvBG} className="w-full h-full object-cover" alt="SDV BG" />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* 🔙 STICKY BACK BUTTON */}
      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={onBack}
        className="fixed top-6 left-6 z-[100] bg-[#634e34] border-4 border-[#3a2a1a] text-white px-3 py-1 font-black text-xs shadow-lg uppercase tracking-widest"
      >
        ⬅ BACK
      </motion.button>

      <AnimatePresence mode="wait">
        
        {/* PHASE 1: START BUTTON */}
        {phase === 'start' && (
          <motion.div 
            key="button-stage"
            exit={{ opacity: 0, scale: 0.5 }}
            className="z-10 flex flex-col items-center"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setPhase('bubbling')}
              className="bg-[#ad261d] border-4 border-[#5c120d] text-white px-10 py-5 font-black text-2xl shadow-2xl animate-pulse uppercase"
            >
              OPEN WHEN YOU WANT THE REALITY... 🤫
            </motion.button>
            <p className="text-white mt-4 font-bold italic drop-shadow-md">
              (Handa ka na ba, Boss?)
            </p>
          </motion.div>
        )}

        {/* PHASE 2: BUBBLING EMOJIS (3 Seconds) */}
        {phase === 'bubbling' && (
          <motion.div
            key="bubble-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-20 flex items-center justify-center absolute inset-0"
          >
            {/* Emoji Container - Popping Effect */}
            <motion.span
              key={currentEmoji} // Mag-re-render bawat palit ng emoji para gumana animation
              initial={{ scale: 0, opacity: 0, y: 50 }}
              animate={{ scale: [1, 1.5, 1], opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-9xl drop-shadow-2xl"
            >
              {currentEmoji}
            </motion.span>
          </motion.div>
        )}

        {/* PHASE 3: THE REVEAL (Jumpscare/Surprise) */}
        {phase === 'reveal' && (
          <motion.div 
            key="jumpscare-stage"
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              rotate: [0, -5, 5, -5, 5, 0], // Shake Effect!
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="z-10 flex flex-col items-center text-center max-w-sm"
          >
            <div className="border-8 border-[#72432d] shadow-[10px_10px_0px_0px_rgba(0,0,0,0.5)] overflow-hidden bg-white mb-6">
              <img 
                src={akanFace} 
                alt="Reality Check" 
                className="w-full h-auto object-cover scale-110" 
              />
            </div>

            <div className="bg-[#fbf0d5] border-4 border-[#72432d] p-4 shadow-xl">
              <h2 className="text-[#ad261d] text-3xl font-black mb-2 uppercase">
                SURPRISE!! 🤪
              </h2>
              <p className="text-[#3a2a1a] text-lg font-bold italic">
                "Uu baby mo sila Mingyu, pero etong mukang i2 ang asawa mo HAHAHAHAHA kala mo ah!"
              </p>
              <p className="text-[#72432d] text-sm mt-4 font-black">
                "Eto talaga yung namimiss mo palagi asus, wag mo na ideny bleeehhh."
              </p>
            </div>

            <motion.button 
              onClick={onNext}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-10 bg-[#489512] border-4 border-[#244a09] text-white px-8 py-2 font-black uppercase shadow-lg"
            >
              ETO PAAA, PROCEED NA TAYO! 👉
            </motion.button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

export default Page7;