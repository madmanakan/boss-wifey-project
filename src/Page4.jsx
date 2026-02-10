import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti'; // 🔥 Import natin si Confetti

import sdvBG from './assets/sdv23.jpg'; 
import dog1 from './assets/dog1.gif'; 

function Page4({ onNext, onBack }) { 
  // 📏 Logic para makuha ang size ng screen (para sa confetti)
  const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });

  const detectSize = () => {
    setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
  }

  useEffect(() => {
    window.addEventListener('resize', detectSize);
    return () => window.removeEventListener('resize', detectSize);
  }, [windowDimension]);

  // ❤️ Custom Heart Shape Function para sa Canvas
  const drawHeart = (ctx) => {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-10, -10, -20, 5, 0, 20); // Left curve
    ctx.bezierCurveTo(20, 5, 10, -10, 0, 0);   // Right curve
    ctx.fill();
    ctx.closePath();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      
      {/* 🎉 FALLING HEART CONFETTI 🎉 */}
      <Confetti 
        width={windowDimension.width} 
        height={windowDimension.height} 
        numberOfPieces={400}             // Dami ng hearts
        gravity={0.05}                   // Bilis ng pagbagsak (mas mababa, mas slow-mo)
        colors={['#FF0000', '#FF69B4', '#FF1493', '#C71585', '#FFFFFF']} // Red, Pink, White colors
        drawShape={drawHeart}            // 🔥 Dito tinatawag yung Heart Shape
      />

      {/* 🖼️ STARDEW BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img src={sdvBG} className="w-full h-full object-cover" alt="BG" />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* 🔙 STICKY BACK BUTTON (Stardew Style) */}
      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={onBack}
        className="fixed top-6 left-6 z-[100] bg-[#634e34] border-4 border-[#3a2a1a] text-white px-3 py-1 font-black text-xs shadow-lg uppercase tracking-widest"
      >
        ⬅ BACK
      </motion.button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 flex flex-col items-center text-center px-6"
      >
        <img src={dog1} className="w-32 h-32 mb-6 drop-shadow-lg" alt="dog1" />

        <h1 className="text-white text-4xl font-black mb-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          "YESSS! Soulbound na tayo, Boss Rona! 💙"
        </h1>

        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-[#fbf0d5] border-8 border-[#72432d] p-6 shadow-2xl max-w-md"
        >
          <h3 className="text-[#72432d] font-black text-xl mb-3 underline">
            The Meaning of Soulbound
          </h3>
          <p className="text-[#3a2a1a] text-lg leading-relaxed font-medium italic">
            "In every game we play and every world we build, being 'Soulbound' means 
            we're linked forever. Hindi lang basta partner, kundi dalawang kaluluwa 
            na hinding-hindi na maghihiwalay na kahit anong boss fight pa ang dumating, 
            kayang kaya natin patumbahin at harapin yan na parang pagsubok natin sa life."
          </p>
          <div className="mt-4 text-[#ad261d] font-bold">
            — From your Lover, Bestfriend, Protector, and your One and Only Soulmate. 🖤🤍
          </div>
        </motion.div>

        {/* Updated Next Button */}
        <button 
          onClick={onNext}
          className="mt-10 bg-[#634e34] border-4 border-[#3a2a1a] text-white px-8 py-2 font-bold hover:scale-105 active:scale-95 transition-all shadow-lg"
        >
          MAY ISA PA AKONG SURPRISE... 👉
        </button>
      </motion.div>
    </div>
  );
}

export default Page4;