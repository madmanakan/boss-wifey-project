import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- ASSETS IMPORT ---
import sdvBG from './assets/sdv6.jpg'; 
import pic1 from './assets/caferoblox1.jpg';
import pic2 from './assets/mvp.jpg'; 
import pic3 from './assets/together1.jpg';
import pic4 from './assets/99nights.jpg';
import pic5 from './assets/screenshot.jpg'; 

function Page8({ onNext, onBack }) { 
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [openedCount, setOpenedCount] = useState(new Set());

  const memories = [
    { 
      img: pic1, 
      text: "naks oh, nakakamiss to palong palo magbenta ng iced caramel salted mocha ba yorn? barista ng bohai ko, ay" 
    },
    { 
      img: pic2, 
      text: "OOOOHHH, lakas talaga oh! Lalo na yung nasa Top 3, grabe ang ganda ng name ng baril... default daw dapat yun sabi mo non? (Nyenyenye, kala mo ah! 😝)\n\nWala, miss ko na ang SR God at ang nag-iisang Registered Nurse (RNLARE) ng buhay kooo 😝." 
    },
    { 
      img: pic3, 
      text: "kamiss oh.. gulat aq biglang nawala sa friendlist ko talaga sa rolbox UHHHH, pero kahit anong unfriend or unfollow yan, tayo parin talaga gaya ng title sa game 'TOGETHER' kahit anong mangyari at dumaan sa ating buhay. *ihh, sana mag moots na ulit tayo talaga sa rolbox at IG.. miss ko na yung mga piksur mo sa IG highlights lalo na yung nakasalamin kaa.. 👀" 
    },
    { 
      img: pic4, 
      text: "eto yung solid na may picture tayong dalawa sa roblox, sabay pagkapasok ingame LT mga kaganapan e, namatay sa loob ng maze HAHAHAHA" 
    },
    { 
      img: pic5, 
      text: "THE LEGENDARY RESIBO (Feb 19, 2025):\nEto yung mga panahong sobrang daldal ng boss ko talaga, may pa-VM pa yan! Inaabot pa ng 1AM talaga na nagkkwentuhan MWAHAHAHA! Nanggigigil ako sayo dito (araw-araw naman talaga, kala mo ah!) grabe chubet daw oh 🤨, ngayon asawa na HAHAHAHA bleh. Kala mo ah, naka-tago 'to sa baul ko. Sa susunod ilalabas ko na yung iba ko pang SS sa convo natin MWAHAHAHA! 😝 Sige po tulog na tayo, asawa ko. 😊😊"
    },
  ];

  const handleOpen = (index) => {
    setSelectedIdx(index);
    setOpenedCount((prev) => new Set(prev).add(index));
  };

  // 🔥 ANIMATION VARIANTS (ELASTIC POP EFFECT)
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay bawat card para sunod-sunod
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.3, // Magsisimula sa maliit
      y: 100 // Magsisimula sa baba
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", // Physics-based animation
        stiffness: 150, // Gaano katigas yung spring
        damping: 12,    // Gaano kabilis tumigil (lower = more bounce)
        mass: 1.2       // Bigat ng item
      } 
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center p-6 overflow-y-auto bg-[#0a0a2e]">
      
      {/* 🖼️ BACKGROUND SECTION */}
      <div className="fixed inset-0 z-0">
        <img src={sdvBG} className="w-full h-full object-cover opacity-40" alt="BG" />
      </div>

      {/* 🔙 STICKY BACK BUTTON */}
      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={onBack}
        className="fixed top-6 left-6 z-[100] bg-[#634e34] border-4 border-[#3a2a1a] text-white px-3 py-1 font-black text-xs shadow-lg uppercase tracking-widest"
      >
        ⬅ BACK
      </motion.button>

      <div className="z-10 w-full max-w-2xl mt-16">
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "backOut" }}
          className="text-white text-4xl font-black text-center mb-12 drop-shadow-[0_4px_4px_rgba(0,0,0,1)] italic"
        >
          2025 MEMORIES W/ YOU 💌
        </motion.h1>

        {/* 📂 GRID WITH STAGGERED ANIMATION */}
        <motion.div 
          className="grid grid-cols-2 gap-6 mb-20"
          variants={gridContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {memories.map((_, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants} // Apply bouncy effect per item
              whileHover={{ 
                scale: 1.05, 
                rotate: idx % 2 === 0 ? 2 : -2, // Konting tilt pag hover
                transition: { type: "spring", stiffness: 300 } 
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleOpen(idx)}
              className={`cursor-pointer bg-[#e7b682] border-4 border-[#72432d] p-4 flex flex-col items-center shadow-[6px_6px_0px_0px_rgba(0,0,0,0.5)] ${idx === 4 ? 'col-span-2 mx-auto w-1/2' : ''}`}
            >
              <motion.span 
                className="text-4xl mb-2"
                animate={{ scale: openedCount.has(idx) ? [1, 1.2, 1] : 1 }} // Pulse effect pag nabuksan
                transition={{ duration: 0.3 }}
              >
                {openedCount.has(idx) ? '📂' : '✉️'}
              </motion.span>
              <span className="text-[#3a2a1a] font-black text-xs uppercase text-center">Moment #{idx + 1}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Final Message & Page 9 Button */}
        {openedCount.size === memories.length && (
          <motion.div 
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 10 }}
            className="flex flex-col items-center gap-6 mb-16"
          >
            <div className="bg-[#fbf0d5] border-8 border-[#489512] p-6 text-center shadow-2xl">
              <p className="text-[#1a3a0a] text-xl font-black italic leading-tight">
                "Wishing na more pictures to come satin ngayong taon, at sa lahat ng mga susunod pang kabanata ng buhay natin. Wala nang katapusan 'to, Boss. 😊"
              </p>
            </div>

            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onNext}
              className="bg-[#ad261d] border-4 border-[#5c120d] text-white px-10 py-3 font-black text-lg 
                         shadow-[0_0_20px_rgba(255,0,0,0.5)] animate-bounce uppercase mt-4"
            >
              BLEEHHH... 👉
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* 🖼️ MODAL FOR MEMORIES (POP EFFECT) */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/90"
            onClick={() => setSelectedIdx(null)}
          >
            <motion.div 
              initial={{ scale: 0.5, opacity: 0, y: 100 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.5, opacity: 0, y: 100 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }} // POP UP EFFECT
              className="bg-[#fbf0d5] border-8 border-[#72432d] p-4 max-w-sm w-full relative max-h-[85vh] overflow-y-auto no-scrollbar rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedIdx(null)} className="absolute top-2 right-2 z-50 bg-red-600 text-white w-8 h-8 rounded-full font-black border-2 border-white flex items-center justify-center shadow-md">X</button>
              
              <div className={`mb-4 ${selectedIdx === 4 ? 'w-full' : 'border-4 border-[#3a2a1a] overflow-hidden bg-white'}`}>
                <img 
                    src={memories[selectedIdx].img} 
                    className={selectedIdx === 4 
                      ? "w-full h-auto rounded-md" 
                      : "w-full h-auto max-h-[400px] object-contain mx-auto shadow-inner"
                    }
                    alt="Memory" 
                />
              </div>
              
              <p className="text-[#3a2a1a] font-bold italic text-center leading-snug whitespace-pre-line pb-2">
                "{memories[selectedIdx].text}"
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Page8;