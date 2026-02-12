import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MGA IMPORTS ---
import sdvBG from './assets/sdv6.jpg'; 
import jayb from './assets/jayb.jpg';
import harrys from './assets/harrys.jpg';
import mingyu from './assets/mingyu.jpg';

function Page6({ onNext, onBack }) { 
  const [modalContent, setModalContent] = useState(null);
  
  // 🔥 STATE PARA SA TRACKING NG OPENED MESSAGES
  const [openedIds, setOpenedIds] = useState(new Set());

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

  const handleOpen = (msg) => {
    setModalContent(msg);
    // Add ID to set to track progress
    setOpenedIds(prev => new Set(prev).add(msg.id));
  };

  // Check if all messages are opened
  const allOpened = openedIds.size === messages.length;

  // 🔥 ANIMATION VARIANTS
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3 // Delay bawat button
      }
    }
  };

  const itemVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 120 } }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 overflow-hidden">
      
      {/* 🖼️ Background Section */}
      <div className="absolute inset-0 z-0">
        <img src={sdvBG} className="w-full h-full object-cover" alt="SDV BG" />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* 🔙 STICKY BACK BUTTON */}
      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={onBack}
        className="fixed top-6 left-6 z-[100] bg-[#634e34] border-4 border-[#3a2a1a] text-white px-3 py-1 font-black text-xs shadow-lg uppercase tracking-widest"
      >
        ⬅ BACK
      </motion.button>

      <div className="z-10 w-full max-w-md text-center">
        <motion.h2 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-white text-3xl font-black mb-10 drop-shadow-lg tracking-tighter"
        >
          EMOTIONS BOARD <br/> PARA SA AKING BOSS!📜
        </motion.h2>

        {/* 🚀 "OPEN WHEN" Buttons with Staggered Animation */}
        <motion.div 
          className="grid grid-cols-1 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {messages.map((msg) => (
            <motion.button
              key={msg.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleOpen(msg)}
              className={`w-full border-4 border-[#5c120d] text-white px-6 py-4 font-black text-lg 
                          shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] transition-all uppercase relative overflow-hidden
                          ${openedIds.has(msg.id) ? 'bg-gray-600 opacity-80' : 'bg-[#ad261d] hover:bg-[#c42d23]'}`}
            >
              {msg.label}
              {openedIds.has(msg.id) && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl">✅</span>}
            </motion.button>
          ))}
        </motion.div>

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
                initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.5, opacity: 0, rotate: 10 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
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
                  className="w-full bg-[#ad261d] text-white py-2 font-bold border-4 border-[#5c120d] active:scale-95 hover:bg-[#c42d23] transition-colors"
                >
                  CLOSE MESSAGE ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ✅ Next Button - APPEARS ONLY WHEN ALL OPENED */}
        <AnimatePresence>
          {allOpened && (
            <motion.button 
              initial={{ scale: 0, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              onClick={onNext}
              className="mt-12 bg-[#489512] border-4 border-[#244a09] text-white px-10 py-3 font-black 
                         shadow-lg hover:scale-110 active:scale-95 transition-all animate-bounce uppercase tracking-widest"
            >
              MARAMI PA AKONG SASABIHIN... 👉
            </motion.button>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

export default Page6;