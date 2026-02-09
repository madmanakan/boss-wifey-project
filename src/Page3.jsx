import React, { useState } from 'react';
import { motion } from 'framer-motion';
import sdvBG from './assets/sdv23.jpg'; 
import pleadingCat from './assets/catcat.gif'; 

function Page3({ onNext, onBack }) { 
  const [yesSize, setYesSize] = useState(1);
  const [noClicks, setNoClicks] = useState(0);

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
    // 🔥 Dahan-dahan lang ang dagdag (0.15) para hindi halata sa simula
    setYesSize(prev => prev + 0.15); 
    
    // Para humaba yung "begging" phase natin
    if (noClicks < beggingTexts.length - 1) {
      setNoClicks(prev => prev + 1);
    }
  };

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
        className="z-10 bg-[#e7b682] border-8 border-[#72432d] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] max-w-sm w-full text-center flex flex-col items-center relative"
      >
        <img 
          src={pleadingCat} 
          alt="Pleading Cat" 
          className="w-48 h-48 mb-4 drop-shadow-md object-contain" 
        />

        <h2 className="text-[#3a2a1a] text-2xl font-black mb-10 leading-tight">
          "Boss Rona, will you be my Valentine?"
        </h2>

        <div className="flex flex-col gap-10 items-center justify-center w-full">
          {/* ✅ THE SNEAKY YES BUTTON */}
          <motion.button
            animate={{ scale: yesSize }}
            // Dahan-dahan ang transition para hindi "snap" ang laki
            transition={{ type: "spring", stiffness: 100, damping: 25 }}
            onClick={onNext}
            className="bg-[#489512] border-4 border-[#244a09] text-white px-10 py-3 font-bold shadow-lg active:scale-95 z-[60] whitespace-nowrap origin-center"
          >
            YES! 💙
          </motion.button>

          {/* ❌ THE FIXED NO BUTTON */}
          <button
            onClick={handleNoInteraction}      
            className="bg-[#ad261d] border-4 border-[#5c120d] text-white px-6 py-2 font-bold opacity-80 z-10 transition-colors duration-300"
          >
            {beggingTexts[noClicks]}
          </button>
        </div>
      </motion.div>
      
      <p className="z-10 mt-10 text-white/70 text-sm italic font-medium drop-shadow-md text-center max-w-xs">
         "Wala na talagang 'No' sa dictionary ko pagdating sayo, Boss."
      </p>
    </div>
  );
}

export default Page3;