import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import sdvFrontBG from './assets/sdv_front_background2.jpg'; 
import discordImg from './assets/discord.jpg';
import undertaleBGM from './assets/undertale.mp3';
import undyneSFX from './assets/undyne.mp3'; 
import marioSFX from './assets/mario.mp3'; 

function Page12({ onBack, onReveal }) { 
  const [phase, setPhase] = useState('start');
  const [displayedText, setDisplayedText] = useState("");
  const [showAchievement, setShowAchievement] = useState(false);
  
  // 🔥 New State: Para i-lock ang click habang may notification
  const [isInteractionAllowed, setIsInteractionAllowed] = useState(false);
  
  const fullText = `HHabang binubuo ko itong website para sa'yo, Boss...
Naalala ko na may tinago akong letter sa discord archive ko.
Isang letter na sinulat ko noong Feb 2023... Ang mismong buwan kung kailan tayo pinagtagpo sa Litmatch. Isang araw bago mag-Valentine's.
Lasing ako nun. Tahimik. Malungkot. Nag-iisa.

Pero bigla akong napangiti...
Dahil hindi ko inakala na tutuparin pala ni God ang hiling ko sa dilim na 'yun.

Kaya eto, gusto ko mabasa mo ito dahil ikaw na ikaw pala ang hinihiling ko. 
At eto ang patunay..`;

  const bgmRef = useRef(new Audio(undertaleBGM));
  const sfxRef = useRef(new Audio(undyneSFX));
  const marioRef = useRef(new Audio(marioSFX)); 

  // 🏆 ACHIEVEMENT UNLOCKED LOGIC + CLICK BLOCKER
  useEffect(() => {
    const timer = setTimeout(() => {
      // 1. Play Mario Sound
      const mario = marioRef.current;
      mario.volume = 0.5;
      mario.play().catch(() => {});

      // 2. Show Notification
      setShowAchievement(true);

      // 3. Hide Notification after 4 seconds AND ALLOW CLICKING
      setTimeout(() => {
        setShowAchievement(false);
        setIsInteractionAllowed(true); // 🔥 Ngayon lang pwede pumindot
      }, 4000);

    }, 1000); // 1 Second Delay bago lumabas notification

    return () => clearTimeout(timer);
  }, []);

  // 🎵 Play Undertale BGM
  useEffect(() => {
    const bgm = bgmRef.current;
    bgm.volume = 0.5;
    bgm.loop = true;
    
    const playPromise = bgm.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => console.log("BGM Auto-play prevented", error));
    }

    return () => {
      bgm.pause();
      bgm.currentTime = 0;
    };
  }, []);

  // ⌨️ Typewriter Logic
  useEffect(() => {
    if (phase !== 'typing') return;

    const sfx = sfxRef.current;
    sfx.volume = 0.5; 

    let index = 0;
    setDisplayedText(""); 

    const intervalId = setInterval(() => {
      if (index >= fullText.length) {
        clearInterval(intervalId);
        setPhase('waiting_reveal');
        return;
      }

      setDisplayedText((prev) => prev + fullText.charAt(index));
      
      const currentChar = fullText.charAt(index);
      if (currentChar !== ' ' && currentChar !== '\n') {
         sfx.currentTime = 0;
         sfx.play().catch(() => {});
      }
      
      index++;
    }, 50); 

    return () => clearInterval(intervalId);
  }, [phase, fullText]);

  // 🔥 MAIN CLICK HANDLER
  const handleScreenClick = () => {
    // 🛑 HARANG: Kung hindi pa tapos ang achievement notif, bawal pumindot
    if (!isInteractionAllowed) return;

    if (phase === 'start') {
      setPhase('typing');
    } else if (phase === 'waiting_reveal') {
      setPhase('revealed');
      
      if (sfxRef.current) {
        sfxRef.current.pause();
        sfxRef.current.currentTime = 0;
      }
      
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current.currentTime = 0;
      }

      if (onReveal) {
        onReveal();
      }
    }
  };

  return (
    <div 
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden font-mono bg-black select-none"
      onClick={handleScreenClick}
    >
      
      {/* 🏆 ACHIEVEMENT NOTIFICATION POPUP */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute top-8 z-[200] flex items-center gap-3 bg-black/80 border-4 border-yellow-400 px-6 py-4 rounded-lg shadow-[0_0_20px_rgba(255,215,0,0.6)]"
          >
            <span className="text-4xl animate-bounce">🏆</span>
            <div className="flex flex-col">
              <span className="text-yellow-400 font-black text-xs uppercase tracking-widest mb-1">
                SECRET PAGE UNLOCKED!
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-black text-lg md:text-xl tracking-tighter uppercase drop-shadow-sm">
                CONFIDENTIAL FILE: FOR MY ONE AND ONLY BOSS RONA! 📂
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🖼️ BACKGROUND REVEAL */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'revealed' ? 1 : 0 }}
        transition={{ duration: 2 }} 
        className="absolute inset-0 z-0"
      >
        <img src={sdvFrontBG} className="w-full h-full object-cover" alt="BG" />
        <div className="absolute inset-0 bg-black/30"></div>
      </motion.div>

      {phase === 'revealed' && (
        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => { e.stopPropagation(); onBack(); }}
          className="fixed top-6 left-6 z-[100] bg-[#634e34] border-4 border-[#3a2a1a] text-white px-3 py-1 font-black text-xs shadow-lg uppercase tracking-widest"
        >
          ⬅ BACK
        </motion.button>
      )}

      <div className="z-10 w-full max-w-2xl p-6 relative flex flex-col items-center justify-center text-center">
        
        {/* 🔥 PROMPT: Show ONLY when interaction is allowed */}
        {phase === 'start' && isInteractionAllowed && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <p className="text-yellow-400 text-sm md:text-base uppercase tracking-[0.2em] animate-pulse font-bold border-2 border-yellow-400 px-6 py-3 rounded-full inline-block cursor-pointer">
              [ Click screen to continue ]
            </p>
          </motion.div>
        )}

        {(phase === 'typing' || phase === 'waiting_reveal') && (
          <div className="text-left w-full">
            <p className="text-white text-lg md:text-2xl leading-relaxed whitespace-pre-wrap tracking-wide drop-shadow-md font-bold">
              {displayedText}
              <span className="animate-pulse inline-block w-2 h-6 md:h-8 bg-white ml-1 align-middle"></span> 
            </p>

            <AnimatePresence>
              {phase === 'waiting_reveal' && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="mt-12 text-center"
                >
                  <p className="text-gray-400 text-xs md:text-sm uppercase tracking-[0.2em] animate-pulse">
                    [ Click screen to reveal ]
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {phase === 'revealed' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex flex-col items-center w-full"
          >
            <h1 className="text-white text-2xl md:text-5xl font-black mb-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] italic text-center uppercase">
              "THE PROPHECY (FEB 13, 2023)"✨
            </h1>

            <div className="flex justify-center w-full">
              <div className="bg-[#2f3136] p-2 rounded-lg border-4 border-[#7289da] shadow-2xl max-w-lg w-full">
                <img 
                  src={discordImg} 
                  alt="Discord Archive" 
                  className="w-full h-auto rounded shadow-inner object-contain"
                />
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="text-white/90 mt-10 text-center italic text-sm md:text-lg max-w-md font-sans font-medium mx-auto leading-relaxed"
            >
              <p className="mb-6">
                "Isang araw bago mag-Valentines noong 2023, lasing ako nito habang nanonood ng CS:GO. Wala ka pa sa buhay ko, pero nangako na ako sa sarili ko na pag dumating yung 'The One', irerespeto ko siya nang buong-buo at ipapabasa ko sa kanya 'to."
              </p>
              <p className="mb-6">
                "Boss, ikaw pala 'yung tinutukoy ko dito. Ikaw pala yung Waifu IRL na hinihintay ko."
              </p>
              <p className="mb-8">
                "Tinupad ko na yung promise ko haa? Binabasa mo na siya ngayon. PROMISE FULFILLED. ✅ (Angas mag-english eh no, pag lasing tsaka lumalabas yung english spokening na mali mali pa ang grammarist nyan sha HAHAHAH!)"
              </p>

              <div className="border-t-2 border-white/20 pt-6">
                <p className="font-black text-[#7289da] mb-2 uppercase tracking-wide">Pahabol pala, Boss:</p>
                <p className="mb-4">
                  Naalala mo nung tinanong mo ako sa call dati? (February din 'yun!) Ang tanong mo: 'Pag lasing ka ba, nagiging horny ka?'
                </p>
                <p className="mb-4">
                  Boss, basahin mo ulit 'yung letter sa taas. Bago mo pa ako tanungin, nasagot na ng Past Self ko 'yan.
                </p>
                <p className="mb-4">
                  Alam nating karamihan ng lalaki, sex lang ang habol lalo na pag nakainom. Pero eto ang patunay... Kahit lasing ako, ang default setting ng utak ko ay RESPETO at PROTEKSYON para sa Waifu/Asawa ko.
                </p>
                
                <p className="font-black text-white text-lg md:text-xl drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                  Kaya lasing man o hindi, hinding-hindi ko magagawang saktan ka at samantalahin. Safe na safe ka sa akin, habambuhay. 🛡️❤️
                </p>
              </div>
            </motion.div>
             
             <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4 }}
              className="text-[#7289da] mt-10 text-xs font-black uppercase tracking-widest text-center"
            >
              — 😊😊 —
            </motion.p>

          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Page12;