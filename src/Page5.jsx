import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sdvBG from './assets/sdv45.jpg'; 
import chibiAkan from './assets/chibiakan123.png';
import chibiRona from './assets/chibirona123.png';
import heartGif from './assets/heart.gif';

function Page5({ onNext, onBack }) { 
  const [step, setStep] = useState(0); 
  const [isAkanKissing, setIsAkanKissing] = useState(false);
  const [isRonaKissing, setIsRonaKissing] = useState(false);

  const handleAkanKiss = () => {
    if (isAkanKissing || isRonaKissing) return;
    setIsAkanKissing(true);
    setTimeout(() => setIsAkanKissing(false), 2000); 
  };

  const handleRonaKiss = () => {
    if (isRonaKissing || isAkanKissing) return;
    setIsRonaKissing(true);
    setTimeout(() => setIsRonaKissing(false), 2000); 
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      
      {/* 🖼️ BACKGROUND SECTION */}
      <div className="absolute inset-0 z-0">
        <img src={sdvBG} className="w-full h-full object-cover" alt="SDV BG" />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* 🔙 STICKY BACK BUTTON */}
      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={onBack}
        className="fixed top-6 left-6 z-[100] bg-[#634e34] border-4 border-[#3a2a1a] text-white px-3 py-1 font-black text-xs shadow-lg uppercase tracking-widest"
      >
        ⬅ BACK
      </motion.button>

      <div className="z-10 flex flex-col items-center justify-center w-full max-w-4xl relative h-[600px]">
        
        <AnimatePresence>
          {step === 0 && (
            <motion.div key="doorAkan" exit={{ opacity: 0, scale: 0.5 }} className="flex flex-col items-center cursor-pointer" onClick={() => setStep(1)}>
              <div className="text-8xl mb-4 bg-[#72432d] p-10 border-8 border-[#3a2a1a] shadow-2xl">🚪</div>
              <p className="text-white font-black text-xl drop-shadow-lg animate-bounce">BUKSAN MO 'TO, BOSS!</p>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="doorRona" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.5 }} className="flex flex-col items-center cursor-pointer" onClick={() => setStep(2)}>
              <div className="text-8xl mb-4 bg-[#634e34] p-10 border-8 border-[#244a09] shadow-2xl">🚪</div>
              <p className="text-white font-black text-xl drop-shadow-lg animate-bounce">PINDUTIN MO RIN 'TO, BOSS!</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step === 2 && (
            <div className="relative flex items-end justify-center gap-6 sm:gap-20">
              <motion.img 
                src={heartGif} 
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -190, opacity: 1 }}
                className="absolute w-24 h-24 sm:w-28 sm:h-28 z-30"
                alt="Heart"
              />

              {/* Chibi Kyle (Akan) */}
              <motion.div 
                animate={{ x: isAkanKissing ? 80 : 0 }} 
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={handleAkanKiss}
                className="flex flex-col items-center cursor-pointer z-20 relative"
              >
                <div className="bg-white rounded-lg p-1 shadow-xl">
                  {/* 🔥 FIX: Tinanggal ang mix-blend-multiply */}
                  <img src={chibiAkan} className="w-32 h-32 sm:w-44 sm:h-44" alt="Kyle" />
                </div>
                <span className="text-white font-bold bg-black/40 px-4 py-1 rounded-full mt-4">Kyle</span>
                
                {isAkanKissing && (
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: -5 }} 
                    className="absolute top-0 text-3xl z-50"
                  >
                    😘
                  </motion.span>
                )}
              </motion.div>

              {/* Chibi Rona */}
              <motion.div 
                animate={{ x: isRonaKissing ? -80 : 0 }} 
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={handleRonaKiss}
                className="flex flex-col items-center cursor-pointer z-20 relative"
              >
                <div className="bg-white rounded-lg p-1 shadow-xl">
                  {/* 🔥 FIX: Tinanggal ang mix-blend-multiply */}
                  <img src={chibiRona} className="w-32 h-32 sm:w-44 sm:h-44" alt="Rona" />
                </div>
                <span className="text-white font-bold bg-black/40 px-4 py-1 rounded-full mt-4">Rona</span>
                
                {isRonaKissing && (
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: -5 }} 
                    className="absolute top-0 text-3xl z-50"
                  >
                    😚
                  </motion.span>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-6 mt-16 px-4 text-center">
            <p className="text-[#fdf2d5] text-sm font-black tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] animate-pulse mb-2">
                ( PSST, BOSS... PINDUTIN MO ITONG CHIBI NATIN! 😉 )
            </p>
            <h2 className="text-white text-2xl sm:text-3xl font-black drop-shadow-lg leading-tight italic">
              "Kahit saan mang lupalop ng mundo tayo mapunta, ikaw lang ang pipiliin ko."
            </h2>
            <button 
              onClick={onNext}
              className="bg-[#489512] border-4 border-[#244a09] text-white px-10 py-3 font-black text-lg shadow-lg active:scale-95 animate-bounce mt-4"
            >
              MERON PA BOSS... 💌
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Page5;