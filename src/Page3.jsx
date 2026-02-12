import React, { useState } from 'react';
import { motion } from 'framer-motion';

// --- ASSETS ---
import sdvBG from './assets/sdv23.jpg'; 
import pleadingCat from './assets/catcat.gif'; // Default
import cry1 from './assets/cry1.gif';
import cry2 from './assets/cry2.gif';
import cry3 from './assets/cry3.gif';
import cry4 from './assets/cry4.gif';
import cry5 from './assets/cry5.gif';
import cry6 from './assets/cry6.gif';
import cry7 from './assets/cry7.gif';

function Page3({ onNext, onBack }) { 
  const [yesSize, setYesSize] = useState(1);
  const [noClicks, setNoClicks] = useState(0);

  // Array ng mga iyak GIFs
  const gifs = [pleadingCat, cry1, cry2, cry3, cry4, cry5, cry6, cry7];

  const beggingTexts = [
    "No? 🥺",
    "LUH LUH.. 😭",
    "LUHH LUHH... 💔",
    "LUHHH LUHHH.... 😰",
    "LUHHHH LUHHHH..... 😖",
    "LUHHHHH LUHHHHH..... 🥺",
    "LUHHHHHH LUHHHHH...... 😭",
    "LUHHHHHHH LUHHHHHH.......🙏",
    "IH..",
    "IHH...",
    "IHHHH.",
    "🙏🙏"
  ];

  const handleNoInteraction = () => {
    // 🔥 ADJUSTED GROWTH: Times 1.3 lang para hindi agad-agad sakop ang screen
    setYesSize(prev => prev * 1.3); 
    
    // Dagdag count para mag-iba text at GIF
    setNoClicks(prev => prev + 1);
  };

  // 🔥 Logic para sa GIF
  const currentGif = gifs[noClicks % gifs.length];

  // 🔥 Logic para sa NO Button scaling: Bumabawas ng 0.10 para mas matagal mawala (dati 0.15)
  const noScale = Math.max(0, 1 - (noClicks * 0.10));

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      
      {/* 🖼️ BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img src={sdvBG} className="w-full h-full object-cover" alt="BG" />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* 🔙 BACK BUTTON */}
      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={onBack}
        className="fixed top-6 left-6 z-[100] bg-[#634e34] border-4 border-[#3a2a1a] text-white px-3 py-1 font-black text-xs shadow-lg uppercase tracking-widest"
      >
        ⬅ BACK
      </motion.button>

      {/* 🪵 Dialogue Box */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="z-10 bg-[#e7b682] border-8 border-[#72432d] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] max-w-lg w-full text-center flex flex-col items-center relative"
      >
        {/* 🐱 DYNAMIC GIF */}
        <motion.img 
          key={currentGif} 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          src={currentGif} 
          alt="Crying Cat" 
          className="w-48 h-48 mb-6 drop-shadow-md object-contain" 
        />

        <h2 className="text-[#3a2a1a] text-2xl font-black mb-12 leading-tight">
          "Boss Rona, will you be my Valentine?"
        </h2>

        {/* BUTTON CONTAINER: Side-by-side layout na may malaking GAP */}
        <div className="flex items-center justify-center gap-10 w-full relative min-h-[100px]">
          
          {/* ✅ THE YES BUTTON */}
          {/* Lower Z-Index (10) para nasa ilalim siya pag nag-overlap */}
          <motion.button
            animate={{ scale: yesSize }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            onClick={onNext}
            className="bg-[#489512] border-4 border-[#244a09] text-white px-8 py-3 font-bold shadow-lg active:scale-95 z-10 whitespace-nowrap"
          >
            YES! 💙
          </motion.button>

          {/* ❌ THE NO BUTTON */}
          {/* Higher Z-Index (50) para laging nakapatong/kita hanggang mawala */}
          {noScale > 0 && (
            <motion.button
              animate={{ scale: noScale, rotate: noClicks * 5 }} // Konting rotate effect para dramatic
              onClick={handleNoInteraction}      
              className="bg-[#ad261d] border-4 border-[#5c120d] text-white px-6 py-2 font-bold opacity-90 z-50 transition-colors duration-300 hover:bg-red-700"
            >
              {beggingTexts[Math.min(noClicks, beggingTexts.length - 1)]}
            </motion.button>
          )}
        </div>
      </motion.div>
      
      <p className="z-10 mt-10 text-white/70 text-sm italic font-medium drop-shadow-md text-center max-w-xs">
          "Wala na talagang 'No' sa dictionary ko pagdating sayo, Boss."
      </p>
    </div>
  );
}

export default Page3;