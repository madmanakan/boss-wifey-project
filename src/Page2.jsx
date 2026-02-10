import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sdvBG from './assets/sdv_front_background2.jpg'; 

function Page2({ onSuccess, onBack }) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0); 
  const [showHint, setShowHint] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault();
    setAttempts(prev => prev + 1);

    // Passcode based on shared special date
    if (passcode === "0920") {
      onSuccess();
    } else {
      setError("ENGGKKK, MALI KA BOSS. May lalabas na icon/hint sa gilid after ng 2 tries! 😝");
      setPasscode("");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Section */}
      <div className="absolute inset-0 z-0">
        <img src={sdvBG} className="w-full h-full object-cover" alt="Stardew BG" />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* 🔙 BACK BUTTON */}
      <button 
        onClick={onBack}
        className="absolute top-10 left-10 z-20 bg-[#634e34] border-4 border-[#3a2a1a] text-white px-4 py-2 font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-lg"
      >
        ⬅️ BACK
      </button>

      {/* 🎧 FIXED ADVISORY: CENTERED, MADILIM, & SAKTO LANG ANG LAKI */}
      <motion.div 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        // 🔥 bg-black/90 para madilim, text-center & items-center para gitna lahat
        className="z-20 mb-6 bg-black/90 backdrop-blur-md border-2 border-yellow-500/50 px-6 py-3 rounded-lg flex items-center justify-center gap-4 shadow-xl max-w-md w-fit mx-auto"
      >
        <span className="text-2xl animate-pulse">🎧</span>
        <div className="flex flex-col items-center text-center"> {/* 🔥 CENTERED NA DITO PRE */}
          <span className="text-yellow-500 text-[10px] md:text-xs font-black uppercase tracking-widest mb-0.1">
          ⚠️ ADVISORY:
          </span>
          <p className="text-white text-sm font-bold leading-tight tracking-tight">
            Use earphones/headphones for the best experience my boss. <br className="hidden md:block"/> 
            Hayaan mong dalhin ka ng musika sa mundo nating dalawa. 😊
          </p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="z-10 bg-[#e7b682] border-8 border-[#72432d] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] w-full max-w-sm relative"
      >
        <h2 className="text-[#3a2a1a] text-2xl font-black text-center mb-2 uppercase tracking-tighter">Security Check</h2>
        
        <p className="text-[#3a2a1a] text-center text-sm font-bold mb-6 tracking-wide">
          Enter the special date (4 DIGITS)
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative p-[4px] bg-gradient-to-r from-red-600 via-purple-500 to-blue-600 rounded-lg shadow-lg">
            <input 
              type="password" 
              placeholder="????"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full bg-[#fdf2d5] text-[#3a2a1a] placeholder-[#3a2a1a] text-center text-3xl py-3 font-black focus:outline-none rounded-sm"
            />
          </div>
          
          {error && (
            <p className="text-red-700 text-xs text-center font-black animate-pulse uppercase">
              {error}
            </p>
          )}

          <button 
            type="submit"
            className="bg-[#489512] border-4 border-[#244a09] text-white font-black py-3 shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] hover:bg-[#59b816] transition-all uppercase tracking-widest"
          >
            LOGIN
          </button>
        </form>

        {/* 📜 HINT BUTTON */}
        <AnimatePresence>
          {attempts >= 2 && (
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="absolute -right-20 top-1/2 -translate-y-1/2"
            >
              <button 
                onClick={() => setShowHint(!showHint)}
                className="bg-[#d3a372] border-4 border-[#72432d] p-2 text-2xl shadow-lg hover:rotate-12 transition-transform"
                title="Kailangan mo ba ng hint, Boss?"
              >
                📜
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {showHint && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-[#3a2a1a] text-sm text-center font-bold italic border-t-2 border-[#72432d]/20 pt-4"
          >
            Hint: "**20" <br/>
            (Yung araw ng kaarawan nating dalawa, bleehh!)
          </motion.p>
        )}
      </motion.div>

      <div className="absolute bottom-5 right-5 text-4xl opacity-50 grayscale hover:grayscale-0 transition-all cursor-help" title="Soulbound?">🐕</div>
    </div>
  );
}

export default Page2;