import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MGA IMPORTS ---
import sdvBG from './assets/sdv6.jpg'; 
import jayb from './assets/jayb.jpg';
import harrys from './assets/harrys.jpg';
import mingyu from './assets/mingyu.jpg';

function Page6({ onNext, onBack }) { // Dagdag natin ang onBack prop dito pre
  const [modalContent, setModalContent] = useState(null);

  const messages = [
    { 
      id: 'mad', 
      label: "OPEN WHEN YOU'RE MAD...", 
      image: jayb, 
      text: "Isang ngiting Jay.B lang para sa galit na Boss Rona! 😊",
      type: 'image'
    },
    { 
      id: 'sad', 
      label: "OPEN WHEN YOU'RE SAD...", 
      image: harrys, 
      text: "Troll face ni Harry Styles para sumaya ka naman! 🤪",
      type: 'image'
    },
    { 
      id: 'missme', 
      label: "OPEN IF YOU MISS ME...", 
      image: mingyu, 
      text: "HAHAHHAHAH ANG HOT KO NOH BOSS? 😛", 
      type: 'joke' 
    }
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 overflow-hidden">
      
      {/* 🖼️ Background Section */}
      <div className="absolute inset-0 z-0">
        <img src={sdvBG} className="w-full h-full object-cover" alt="SDV BG" />
        <div className="absolute inset-0 bg-black/50"></div>
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
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-md text-center"
      >
        <h2 className="text-white text-3xl font-black mb-10 drop-shadow-lg tracking-tighter">
          EMOTIONS BOARD <br/> PARA SA AKING BOSS!📜
        </h2>

        {/* 🚀 "OPEN WHEN" Buttons */}
        <div className="grid grid-cols-1 gap-6">
          {messages.map((msg) => (
            <motion.button
              key={msg.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setModalContent(msg)}
              className="w-full bg-[#ad261d] border-4 border-[#5c120d] text-white px-6 py-4 font-black text-lg 
                         shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:bg-[#c42d23] transition-all uppercase"
            >
              {msg.label}
            </motion.button>
          ))}
        </div>

        {/* 💌 MODAL POP-UP */}
        <AnimatePresence>
          {modalContent && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80"
              onClick={() => setModalContent(null)}
            >
              <motion.div 
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-[#fbf0d5] border-8 border-[#72432d] p-6 max-w-sm w-full shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="border-4 border-[#3a2a1a] mb-4 overflow-hidden bg-white">
                  <img 
                    src={modalContent.image} 
                    alt="Open When" 
                    className="w-full h-auto object-contain"
                  />
                </div>

                <p className="text-[#3a2a1a] text-xl font-black text-center leading-tight mb-6 italic">
                  "{modalContent.text}"
                </p>

                <button 
                  onClick={() => setModalContent(null)}
                  className="w-full bg-[#ad261d] text-white py-2 font-bold border-4 border-[#5c120d] active:scale-95"
                >
                  CLOSE MESSAGE ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ✅ Next Button to Page 7 */}
        <motion.button 
          onClick={onNext}
          className="mt-12 bg-[#489512] border-4 border-[#244a09] text-white px-10 py-3 font-black 
                     shadow-lg hover:scale-105 active:scale-95 transition-all animate-bounce"
        >
          MARAMI PA AKONG SASABIHIN... 👉
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Page6;