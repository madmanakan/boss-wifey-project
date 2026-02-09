import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

// --- ASSETS IMPORT ---
import blueBG from './assets/bluebackground.jpg'; 
import whitelily from './assets/whitelily.jpg';
import sunflower from './assets/sunflower.jpg';
import royalblue from './assets/royalblueflowers.jpg';
import redflower from './assets/redflower.jpg';
import pinktulip from './assets/pinktulip.jpg';
import peony from './assets/peonyflower.jpg';
import driedmisty from './assets/driedmisty.jpg';
import carnation from './assets/carnation.jpg';
import kissGif from './assets/kiss.gif';

function Page11({ onNext, onBack }) {
  const [showShop, setShowShop] = useState(false);
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });
  
  // State para sa swipe arrow
  const [showArrow, setShowArrow] = useState(false);

  const detectSize = () => {
    setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
  }

  useEffect(() => {
    window.addEventListener('resize', detectSize);
    return () => window.removeEventListener('resize', detectSize);
  }, [windowDimension]);

  const flowers = [
    { id: 1, img: redflower, title: "The 'Huy Galit Ka Ba?' Rose", desc: "Para sa mga araw na masungit ka. Maganda pa rin kahit nakasimangot.", price: 750 },
    { id: 2, img: pinktulip, title: "The 'Sorry Na Boss' Tulips", desc: "Peace offering ko kapag makulit ako at pasaway.", price: 800 },
    { id: 3, img: sunflower, title: "The 'Litmatch Legend' Sunflower", desc: "Sumisimbolo sa pag-asa... na sana sagutin mo na ko. Yieee.", price: 600 },
    { id: 4, img: royalblue, title: "The Rona Blue Rose (Special)", desc: "Hindi nabibili ng pera. Exclusive lang para sa nag-iisang Boss ng buhay ko.", price: "PRICELESS", disabled: true },
    { id: 5, img: whitelily, title: "The 'Pure Intentions' Lily", desc: "Dahil malinis ang hangarin ko sayo, Boss. (Naks!)", price: 700 },
    { id: 6, img: peony, title: "The 'Ganda Mo' Peony", desc: "Kasing ganda mo 'to. Wala nang ibang description.", price: 900 },
    { id: 7, img: carnation, title: "The 'Kilig' Carnation", desc: "Para kiligin ka naman sakin kahit konti. Hahaha.", price: 550 },
    { id: 8, img: driedmisty, title: "The 'Forever' Misty", desc: "Tuyot pero maganda pa rin, tulad pagmamahal ko sayo, walang hangganan.", price: 500 },
  ];

  const paymentOptions = [
    { id: 'gkiss', label: 'G-Kiss (Kiss sa Cheeks/Lipstulips)', icon: '💋' },
    { id: 'mayakap', label: 'Maya-kap (Yakap na Mahigpit)', icon: '🤗' },
    { id: 'cashondate', label: 'Cash on Date (Ililibre mo ko next date)', icon: '💸' },
  ];

  const handleBuyClick = (flower) => {
    if (flower.disabled) return;
    setSelectedFlower(flower);
    setPaymentMethod(null);
  };

  const handlePlaceOrder = () => {
    if (paymentMethod) {
      setShowSuccess(true);
      setSelectedFlower(null);
      // 🔥 Modified logic: Close success modal after 5s, then show arrow
      setTimeout(() => {
        setShowSuccess(false);
        setShowArrow(true); // Litaw ang arrow after success
      }, 5000);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center p-4 overflow-y-auto font-sans">
      
      {showSuccess && <Confetti width={windowDimension.width} height={windowDimension.height} recycle={false} numberOfPieces={500} />}

      <div className="fixed inset-0 z-0">
        <img src={blueBG} className="w-full h-full object-cover" alt="Blue BG" />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={onBack}
        className="fixed top-6 left-6 z-[100] bg-[#634e34] border-4 border-[#3a2a1a] text-white px-3 py-1 font-black text-xs shadow-lg uppercase tracking-widest"
      >
        ⬅ BACK
      </motion.button>

      {/* 🔥 SWIPE ARROW COMPONENT (Walang Text, Arrow Lang) */}
      <AnimatePresence>
        {showArrow && (
           <motion.div
             initial={{ x: 100, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             // Fixed position sa Middle-Right
             className="fixed top-1/2 right-2 md:right-8 transform -translate-y-1/2 z-[300]"
           >
             {/* DRAGGABLE INVISIBLE CONTAINER WITH VISIBLE ARROWS */}
             <motion.div
                drag="x"
                dragConstraints={{ left: -300, right: 0 }} // Pwede hatakin pakaliwa
                dragElastic={0.2}
                onDragEnd={(e, { offset }) => {
                   // Pag hinatak ng malayo-layo (negative x), Next Page na
                   if (offset.x < -100) {
                      onNext();
                   }
                }}
                className="cursor-grab active:cursor-grabbing p-4"
             >
                {/* Eto yung Visuals: < < < */}
                <motion.div 
                  animate={{ x: [0, -15, 0] }} // Gumagalaw pakaliwa para ituro ang direction
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="flex items-center space-x-[-10px]" // Magkakadikit na arrows
                >
                  {/* Tatlong malinaw na 'Less Than' signs */}
                  <span className="text-6xl md:text-8xl font-black text-white drop-shadow-[0_0_15px_rgba(255,0,0,0.9)] opacity-100">
                    ‹
                  </span>
                  <span className="text-6xl md:text-8xl font-black text-white drop-shadow-[0_0_15px_rgba(255,0,0,0.9)] opacity-70">
                    ‹
                  </span>
                  <span className="text-6xl md:text-8xl font-black text-white drop-shadow-[0_0_15px_rgba(255,0,0,0.9)] opacity-40">
                    ‹
                  </span>
                </motion.div>
             </motion.div>
           </motion.div>
        )}
      </AnimatePresence>

      <div className="z-10 w-full max-w-5xl flex flex-col items-center mt-16 mb-20">
        
        {!showShop ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#fbf0d5] border-8 border-[#72432d] p-8 text-center shadow-2xl max-w-lg"
          >
            <h1 className="text-[#ad261d] text-3xl font-black mb-6 uppercase leading-tight">
              BOSS RONA'S DIGITAL FLOWER SHOP 🥀💻
            </h1>
            <p className="text-[#3a2a1a] text-lg font-bold italic leading-relaxed mb-8">
              "Sana malapit lang ako sayo boss para maabot sayo ang bulaklak this Valentines Day, dito ko muna idadaan ang pagbigay sayo ng iba't ibang variant ng flowers. :P"
            </p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowShop(true)}
              className="bg-[#489512] border-4 border-[#244a09] text-white px-8 py-3 font-black text-lg shadow-lg animate-bounce uppercase"
            >
              PASOK KA DITO, BOSS! 👉
            </motion.button>
          </motion.div>
        ) : (
          <>
            {/* 🔥 NEW GUIDE TEXT HERE PRE */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-[#fbf0d5] border-4 border-[#72432d] px-6 py-2 rounded-full shadow-lg text-center"
            >
              <p className="text-[#ad261d] font-black text-sm md:text-lg uppercase tracking-wider animate-pulse flex items-center gap-2">
                👇 PILI KA NG FLOWERS MO DYAN, BOSS! 💐
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 w-full"
            >
              {flowers.map((flower) => (
                <motion.div 
                  key={flower.id}
                  whileTap={{ scale: flower.disabled ? 1 : 0.95 }}
                  className={`bg-[#fbf0d5] border-2 md:border-4 border-[#72432d] p-2 md:p-3 flex flex-col shadow-lg relative ${flower.disabled ? 'opacity-95 cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => handleBuyClick(flower)}
                >
                  {flower.disabled && (
                    <div className="absolute top-1 right-1 md:top-2 md:right-2 bg-blue-600 text-white text-[8px] md:text-[10px] font-black px-2 py-1 rounded-full z-10 animate-pulse uppercase">
                      Special
                    </div>
                  )}
                  
                  <div className="w-full aspect-square relative overflow-hidden border-2 border-[#3a2a1a] bg-white mb-2 md:mb-3">
                    <img 
                      src={flower.img} 
                      alt={flower.title} 
                      className="absolute inset-0 w-full h-full"
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                  </div>

                  <h3 className="text-[#72432d] font-black text-[10px] md:text-sm text-center leading-tight mb-1 min-h-[30px] flex items-center justify-center">
                    {flower.title}
                  </h3>
                  
                  <p className="text-[#3a2a1a] text-[9px] md:text-[11px] text-center italic mb-2 line-clamp-2 leading-tight">
                    {flower.desc}
                  </p>
                  
                  <button className={`mt-auto w-full py-1.5 md:py-2 font-black text-white text-[10px] md:text-xs border-2 shadow-md transition-colors ${flower.disabled ? 'bg-blue-800 border-blue-950 cursor-not-allowed' : 'bg-[#ad261d] border-[#5c120d] hover:bg-[#c42d23]'}`}>
                    {flower.disabled ? "MINE ALL MINE 💙" : `₱ ${typeof flower.price === 'number' ? flower.price.toFixed(2) : flower.price}`}
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>

      <AnimatePresence>
        {selectedFlower && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80"
            onClick={() => setSelectedFlower(null)}
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, y: 50 }}
              className="bg-white border-8 border-[#72432d] p-6 max-w-sm w-full relative shadow-2xl font-mono"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedFlower(null)} className="absolute top-2 right-4 text-[#ad261d] font-black text-xl">✕</button>
              
              <h2 className="text-center text-xl font-black mb-4 uppercase border-b-4 border-dashed border-gray-400 pb-2">
                🧾 OFFICIAL RESIBO
              </h2>

              <div className="mb-6 text-[#3a2a1a] text-sm">
                <div className="flex justify-between font-bold mb-1">
                  <span>Item:</span> <span className="text-right ml-2 text-xs">{selectedFlower.title}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Price:</span> <span>₱ {typeof selectedFlower.price === 'number' ? selectedFlower.price.toFixed(2) : selectedFlower.price}</span>
                </div>
                <div className="flex justify-between text-[#489512] font-black italic mb-2 bg-green-100 p-1 text-xs">
                  <span>SF:</span> <span>₱ 0.00 (SHOULDERED BY KYLE)</span>
                </div>
                <div className="border-t-4 border-dashed border-gray-400 pt-2 mt-2">
                   <div className="flex flex-col md:flex-row justify-between text-base font-black text-[#ad261d] text-center md:text-left">
                    <span>TOTAL:</span> <span>IKAW ANG MUNDO KO 🌍</span>
                  </div>
                </div>
                <p className="text-center text-[10px] mt-2 font-bold text-gray-500 uppercase">Status: Pending Payment (Bayaran mo ko ng Kiss)</p>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-[11px] mb-2 text-[#72432d] uppercase tracking-wider text-center">Select Payment Method:</h3>
                <div className="flex flex-col gap-2">
                  {paymentOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => setPaymentMethod(option.id)}
                      className={`p-2 border-2 flex items-center gap-3 font-bold text-xs transition-all ${paymentMethod === option.id ? 'bg-[#ad261d] text-white border-[#5c120d]' : 'bg-gray-100 text-[#3a2a1a] border-gray-300 hover:bg-gray-200'}`}
                    >
                      <span className="text-xl">{option.icon}</span> {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={!paymentMethod}
                className={`w-full py-3 font-black text-lg border-4 shadow-lg uppercase transition-all ${paymentMethod ? 'bg-[#489512] border-[#244a09] text-white animate-bounce' : 'bg-gray-400 border-gray-600 text-gray-200 cursor-not-allowed'}`}
              >
                {paymentMethod ? "PLACE ORDER NA! 👉" : "PILI KA MUNA PAYMENT"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
       <AnimatePresence>
        {showSuccess && !selectedFlower && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80"
          >
             <motion.div 
              initial={{ scale: 0.8 }} animate={{ scale: 1 }}
              className="bg-[#fbf0d5] border-8 border-[#489512] p-8 text-center shadow-2xl max-w-sm"
            >
              <h2 className="text-2xl font-black text-[#489512] mb-4">PAYMENT ACCEPTED! 🎉</h2>
              <p className="text-lg font-bold italic text-[#3a2a1a] mb-6">
                "Sisingilin kita sa personal, wag kang mag-alala. 😏 Happy Valentine's Day ulit, Boss!"
              </p>
              
              <div className="border-t-2 border-[#489512]/20 pt-4">
                <p className="text-xs font-bold text-gray-500 uppercase">
                  (Sakin yung shipping fee, sayo yung mga price ng flowers. Example: "750" bleehh!! HAHAHAHA)
                </p>
                <div className="mt-4">
                  <img src={kissGif} alt="Kiss" className="w-32 h-32 mx-auto object-cover border-4 border-[#72432d] shadow-lg rounded-sm" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
       </AnimatePresence>

    </div>
  );
}

export default Page11;