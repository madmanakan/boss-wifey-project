import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import sdvFrontBG from './assets/sdv_front_background2.jpg'; 
import discordImg from './assets/discord.jpg';
import undertaleBGM from './assets/undertale.mp3';
import undyneSFX from './assets/undyne.mp3'; 

function Page12({ onBack, onReveal }) { 
  // State management for phases
  const [phase, setPhase] = useState('start'); // 'start', 'typing', 'waiting_reveal', 'revealed'
  const [displayedText, setDisplayedText] = useState("");
  
  const fullText = `HHabang binubuo ko itong website para sa'yo, Boss...
Naalala ko na may tinago akong letter sa discord archive ko.
Isang letter na sinulat ko noong Feb 2023... Ang mismong buwan kung kailan tayo pinagtagpo. Isang araw bago mag-Valentine's.
Lasing ako nun. Tahimik. Malungkot. Nag-iisa.

Pero bigla akong napangiti...
Dahil hindi ko inakala na tutuparin pala ni God ang hiling ko sa dilim na 'yun.

Kaya eto, gusto ko mabasa mo ito dahil ikaw na ikaw pala ang hinihiling ko.`;

  const bgmRef = useRef(new Audio(undertaleBGM));
  const sfxRef = useRef(new Audio(undyneSFX));

  // 🎵 Play Undertale BGM on Mount (Looping)
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

  // ⌨️ Typewriter Logic (Runs only when phase is 'typing')
  useEffect(() => {
    if (phase !== 'typing') return;

    const sfx = sfxRef.current;
    sfx.volume = 0.5; 

    let index = 0;
    setDisplayedText(""); 

    const intervalId = setInterval(() => {
      if (index >= fullText.length) {
        clearInterval(intervalId);
        setPhase('waiting_reveal'); // Tapos na mag-type, wait for click to reveal
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

  // 🔥 MAIN CLICK HANDLER (Controls Flow)
  const handleScreenClick = () => {
    if (phase === 'start') {
      // From "Touch to continue" -> Start Typewriter
      setPhase('typing');
    } else if (phase === 'waiting_reveal') {
      // From "Typewriter Done" -> Reveal Everything
      setPhase('revealed');
      
      // Stop Undertale Music immediately
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current.currentTime = 0;
      }

      // Resume Main Music
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
      
      {/* 🖼️ BACKGROUND REVEAL */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'revealed' ? 1 : 0 }}
        transition={{ duration: 2 }} 
        className="absolute inset-0 z-0"
      >
        <img src={sdvFrontBG} className="w-full h-full object-cover" alt="BG" />
        <div className="absolute inset-0 bg-black/60"></div>
      </motion.div>

      {/* 🔙 BACK BUTTON */}
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

      {/* 📝 CONTENT CONTAINER */}
      <div className="z-10 w-full max-w-2xl p-6 relative flex flex-col items-center justify-center text-center">
        
        {/* PHASE 0: INITIAL START PROMPT */}
        {phase === 'start' && (
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

        {/* PHASE 1: TYPEWRITER TEXT */}
        {(phase === 'typing' || phase === 'waiting_reveal') && (
          <div className="text-left w-full">
            <p className="text-white text-lg md:text-2xl leading-relaxed whitespace-pre-wrap tracking-wide drop-shadow-md font-bold">
              {displayedText}
              <span className="animate-pulse inline-block w-2 h-6 md:h-8 bg-white ml-1 align-middle"></span> 
            </p>

            {/* Show prompt again only when typing is done */}
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

        {/* PHASE 2: DISCORD REVEAL - CENTERED & STATIC */}
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

            {/* 🔥 STATIC CENTERED IMAGE CONTAINER */}
            <div className="flex justify-center w-full">
              <div className="bg-[#2f3136] p-2 rounded-lg border-4 border-[#7289da] shadow-2xl max-w-lg w-full">
                <img 
                  src={discordImg} 
                  alt="Discord Archive" 
                  className="w-full h-auto rounded shadow-inner object-contain"
                />
              </div>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="text-white/90 mt-10 text-center italic text-sm md:text-lg max-w-md font-sans font-medium mx-auto leading-relaxed"
            >
              "Isang araw bago mag-Valentines noong 2023, lasing ako nito habang nanonood ng CS:GO. Wala ka pa sa buhay ko, pero nangako na ako sa sarili ko na pag dumating yung 'The One', irerespeto ko siya nang buong-buo at ipapabasa ko sa kanya 'to."
              <br /><br />
              "Boss, ikaw pala 'yung tinutukoy ko dito. Ikaw pala yung Waifu IRL na hinihintay ko."
              <br /><br />
              "Tinupad ko na yung promise ko haa? Binabasa mo na siya ngayon. PROMISE FULFILLED. ✅ (Angas mag-english eh no, pag lasing tsaka lumalabas yung english spokening na mali mali pa ang grammarist nyan sha HAHAHAH!)"
            </motion.p>
             
             <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4 }}
              className="text-[#7289da] mt-8 text-xs font-black uppercase tracking-widest text-center"
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