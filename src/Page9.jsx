import React, { useState, useEffect } from 'react'; // 🔥 Added useEffect here
import { motion, AnimatePresence } from 'framer-motion';

// --- ASSETS IMPORT ---
import blueBG from './assets/blue.jpg'; 
import dog1 from './assets/doggo1.gif';
import dog2 from './assets/doggo2.gif';
import dog3 from './assets/doggo3.gif';
import dog4 from './assets/doggo4.gif';
import dog5 from './assets/doggo5.gif';
import dog6 from './assets/doggo6.gif';
import catdog from './assets/dogcat.gif'; 
import kissGif from './assets/kiss.gif'; 

function Page9({ onNext, onBack }) {
  const [selectedId, setSelectedId] = useState(null);
  const [viewedIds, setViewedIds] = useState(new Set());
  const [showPledge, setShowPledge] = useState(false);

  // 🔥 FORCE SCROLL TO TOP ON LOAD
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = [
    { id: 1, gif: dog1, doubt: "You're going to get tired of my attitude eventually.", assurance: "Sinabi ko na sa sarili ko na ako ang anchor mo kaya gusto ko marinig mo to. Kahit gaano pa kalakas ang alon (o ang toyo mo), hindi ako bibitaw. Mahal ko ang pagka-Maldita mo gaya ng pagmamahal ko sa sweet side mo. Never ako na aalis." },
    { id: 2, gif: dog2, doubt: "I'm better off alone. Men always leave anyway.", assurance: "Alam kong kaya mong mag-isa, strong independent woman ka eh. Pero hindi mo na kailangang kayanin mag-isa. Iba ako sa kanila—Asawa mo ko. Ginawa ko itong website para patunayan na nandito lang ako sa tabi mo kahit topakin ka pa araw-araw." },
    { id: 3, gif: dog3, doubt: "I'm too much to handle. I'm broken.", assurance: "Hindi ka broken, Boss. Ikaw ang pahinga ko. Kung feeling mo 'too much' ka, edi papalakasin ko sarili ko para kayanin kita. baka Limuel Kyle na ito boss. Basic bleeehh!" },
    { id: 4, gif: dog4, doubt: "What if this is all just temporary?", assurance: "Tignan mo 'yang nasa pulso mo ngayon. Yan ang 'Soulbound Item' nating dalawa. Sa laro, pag soulbound, hindi na pwedeng burahin. Hindi ako nag-g-grind ng ganito para sa 'temporary' lang. Endgame na 'to." },
    { id: 5, gif: dog5, doubt: "Why are you doing all this for me?", assurance: "Kasi deserve mong makasigurado. Ayoko ng hulaan, ayoko ng mixed signals. Gusto ko, malinaw sayo na mahal kita. Ganun lang kasimple." },
    { id: 6, gif: dog6, doubt: "What if you find someone 'better' or prettier than me?", assurance: "Makinig ka, Boss. Maraming babae dito sa mundo, pero ibang-iba ka sa kanila. Ikaw yung nag-iisang 'Extraordinary' na nakilala ko. Wala nang hihigit, wala nang papantay pa. My eyes are locked on you." },
    { id: 7, gif: catdog, doubt: "Are you sure you won't hurt me? What happens when you lose your patience or get too angry?", assurance: "Hinding-hindi. Never. Tandaan mo, mas gugustuhin ko pang ako ang masaktan kesa ikaw ang umiyak. Pinangako ko ito nung nasa Seattle's Best Coffee tayo diba? Ang sabi ko sayo nun... 'Ako nalang saktan mo, arrghhh.' Ganun kita kamahal. Ako ang sasalo, hindi ikaw. At totoo 'yun. I really mean it. Lahat ng sinabi ko sayo nung sinuot ko yung bracelet... papanindigan ko 'yan habambuhay." },
  ];

  const handleSelect = (item) => {
    setSelectedId(item.id);
    setViewedIds((prev) => new Set(prev).add(item.id));
    setShowPledge(false); 
  };

  // 🔥 ANIMATION VARIANTS
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, 
        delayChildren: 0.5    
      }
    }
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center p-4 overflow-y-auto font-sans">
      <div className="fixed inset-0 z-0">
        <img src={blueBG} className="w-full h-full object-cover" alt="Blue BG" />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={onBack}
        className="fixed top-6 left-6 z-[100] bg-[#634e34] border-4 border-[#3a2a1a] text-white px-3 py-1 font-black text-xs shadow-lg uppercase"
      >
        ⬅ BACK
      </motion.button>

      <div className="z-10 w-full max-w-6xl flex flex-col items-center mt-16">
        
        {/* 🔥 TITLE ANIMATION: Slide Down & Fade In */}
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-white text-3xl md:text-5xl font-black mb-10 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] italic text-center uppercase tracking-tighter bg-black/30 px-6 py-2 rounded-lg backdrop-blur-sm border-2 border-white/10"
        >
          Overthinker Breaker ❤️
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-start">
          
          {/* 🔥 BUTTONS CONTAINER with Staggered Animation */}
          <motion.div 
            className="flex flex-col gap-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {content.map((item) => (
              <motion.button
                key={item.id}
                variants={itemVariants} 
                whileHover={{ scale: 1.02, x: 10 }} 
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(item)}
                className={`p-4 border-4 font-black text-left transition-all shadow-[4px_4px_0_0_rgba(0,0,0,0.5)] text-sm md:text-base rounded-sm
                  ${viewedIds.has(item.id) ? 'bg-blue-600 border-blue-900 text-white opacity-80' : 'bg-red-600 border-red-900 text-white'}`}
              >
                {item.doubt}
              </motion.button>
            ))}

            {/* 📖 THE OPEN BOOK PLEDGE TRIGGER */}
            {viewedIds.size === 7 && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => { setShowPledge(true); setSelectedId(null); }}
                className="p-4 border-4 border-yellow-900 bg-yellow-500 text-black font-black text-center shadow-xl animate-pulse mt-4 rounded-sm"
              >
                📖 ETO BOSS, LAGI MONG TANDAAN...
              </motion.button>
            )}
          </motion.div>

          <div className="min-h-[450px] flex flex-col items-center justify-start mt-4 md:mt-0 sticky top-20">
            <AnimatePresence mode="wait">
              {showPledge ? (
                <motion.div
                  key="pledge"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  className="bg-[#fbf0d5] border-8 border-yellow-700 p-6 shadow-2xl w-full flex flex-col items-center rounded-sm"
                >
                  <img src={kissGif} className="w-48 h-48 mb-4 border-4 border-[#3a2a1a] object-cover rounded-full" alt="Kiss" />
                  <p className="text-[#3a2a1a] text-lg md:text-xl font-black italic text-center leading-tight">
                    "Kung may bumabagabag pa sa isip mo na wala sa listahan, huwag kang mahiyang itanong boss. Walang pag-aalinlangan, sasagutin ko lahat 'yan nang buong-buo at tapat.
                    <br/><br/>
                    Kahit gaano pa karaming tanong ang nasa isip mo, hinding-hindi ka makakarinig ng buntong-hininga sakin. Hindi ako mapapagod na ipaintindi sa'yo kung gaano ka kahalaga sa buhay ko.
                    <br/><br/>
                    Open book ako sa'yo. Wala akong itatago. Kahit ano, kahit kailan—nandito lang ako."
                  </p>
                </motion.div>
              ) : selectedId ? (
                <motion.div
                  key={selectedId}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-[#fbf0d5] border-8 border-[#72432d] p-6 shadow-2xl w-full flex flex-col items-center rounded-sm"
                >
                  <img src={content.find(c => c.id === selectedId).gif} className="w-40 h-40 md:w-56 md:h-56 mb-4 border-4 border-[#3a2a1a] object-cover rounded-full" alt="Doggo" />
                  <p className="text-[#3a2a1a] text-lg md:text-xl font-black italic text-center leading-tight">
                    "{content.find(c => c.id === selectedId).assurance}"
                  </p>
                </motion.div>
              ) : (
                /* 🔥 INSTRUCTION CARD ANIMATION */
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }} 
                    className="bg-black/60 p-10 border-4 border-dashed border-white/30 rounded-xl text-center backdrop-blur-sm"
                >
                  <p className="text-white font-bold italic animate-pulse text-lg">
                    👈 Pindutin mo 'yung mga red buttons sa gilid, Boss. <br/><br/>
                    Kumbaga POV mo 'yan (mga iniisip mo), tapos sasagutin ko lahat yan once na pinindot muee. 😉😉
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {showPledge && (
          <motion.button
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            onClick={onNext}
            className="mt-12 mb-10 bg-[#489512] border-4 border-[#244a09] text-white px-10 py-4 font-black text-xl animate-bounce uppercase tracking-widest shadow-lg rounded-sm"
          >
            MWAAAHH... 👉
          </motion.button>
        )}
      </div>
    </div>
  );
}

export default Page9;