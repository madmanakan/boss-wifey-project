import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion' 

import Welcome from './Welcome.jsx'
import Page2 from './Page2.jsx'
import Page3 from './Page3.jsx'
import Page4 from './Page4.jsx'
import Page5 from './Page5.jsx'
import Page6 from './Page6.jsx'
import Page7 from './Page7.jsx'
import Page8 from './Page8.jsx'
import Page9 from './Page9.jsx'
import Page10 from './Page10.jsx'
import Page11 from './Page11.jsx'
import Page12 from './Page12.jsx'

// --- ASSETS IMPORT ---
import song1 from './assets/begin_again.mp3'
import song2 from './assets/daylight.mp3'
import song3 from './assets/lover.mp3'
import song4 from './assets/enchanted.mp3'
import song5 from './assets/tadhana.mp3'
import song6 from './assets/cruelsum.mp3'
import song7 from './assets/invistring.mp3'
import song8 from './assets/newyear.mp3'

function App() {
  const [stage, setStage] = useState(1);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [showNowPlaying, setShowNowPlaying] = useState(false);
  
  // Status kung tapos na ba ang drama sa Page 12
  const [isSecretIntroDone, setIsSecretIntroDone] = useState(false);
  
  // 🔥 NEW STATE: Para malaman kung nagpe-play yung video sa Page 12
  const [isSecretVideoPlaying, setIsSecretVideoPlaying] = useState(false);
  
  const [playlist] = useState(() => {
    const tier1 = [
      { src: song1, title: "Begin Again - Taylor Swift" },
      { src: song2, title: "Daylight - Taylor Swift" },
      { src: song3, title: "Lover - Taylor Swift" }
    ].sort(() => Math.random() - 0.5);

    const cruelSummer = { src: song6, title: "Cruel Summer - Taylor Swift" };
    const tadhana = { src: song5, title: "Tadhana - Up Dharma Down" };

    const tier3 = [
      { src: song4, title: "Enchanted - Taylor Swift" },
      { src: song7, title: "Invisible String - Taylor Swift" }
    ].sort(() => Math.random() - 0.5);

    const finale = { src: song8, title: "New Year's Day - Taylor Swift" };

    return [...tier1, cruelSummer, tadhana, ...tier3, finale];
  });

  const audioRef = useRef(null);

  const handlePlayMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(playlist[currentSongIndex].src);
      audioRef.current.volume = 0.4;
      
      audioRef.current.onplay = () => setShowNowPlaying(true);
      
      audioRef.current.onended = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex + 1) % playlist.length);
      };

      audioRef.current.play().catch(err => console.log("Music Error:", err));
    }
  };

  // 🔥 AUTO-RESET: Reset lahat pag umalis ng Page 12
  useEffect(() => {
    if (stage !== 12) {
      setIsSecretIntroDone(false);
      setIsSecretVideoPlaying(false);
    }
  }, [stage]);

  // 🔥 1. TRACK MANAGER
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = playlist[currentSongIndex].src;
      audioRef.current.load();
      
      // Play immediately unless nasa Secret Intro tayo
      if (!(stage === 12 && !isSecretIntroDone)) {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) playPromise.catch(e => console.log(e));
          setShowNowPlaying(true);
      }
    }
  }, [currentSongIndex, playlist]); 

  // 🔥 2. STAGE MANAGER (UPDATED LOGIC PARA SA VIDEO)
  useEffect(() => {
    if (!audioRef.current) return;

    if (stage === 12) {
        if (!isSecretIntroDone) {
            // Intro pa lang (Undertale), pause main music
            audioRef.current.pause();
            setShowNowPlaying(false);
        } else {
            // Reveal na! Check kung may video na nagpe-play
            if (isSecretVideoPlaying) {
                // 🛑 PAUSE MAIN MUSIC KASI NAG-P-PLAY SI KHAZY
                audioRef.current.pause();
                setShowNowPlaying(false);
            } else {
                // ✅ RESUME MAIN MUSIC (Tapos na video or di pa nag-play)
                if (audioRef.current.paused) {
                    audioRef.current.play().catch(e => console.log(e));
                    setShowNowPlaying(true);
                }
            }
        }
    } else {
      // Normal Pages (1-11)
      if (audioRef.current.paused && audioRef.current.src) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) playPromise.catch(e => console.log(e));
        setShowNowPlaying(true);
      }
    }
  }, [stage, isSecretIntroDone, isSecretVideoPlaying]); // Added isSecretVideoPlaying dep

  useEffect(() => {
    if (showNowPlaying) {
      const timer = setTimeout(() => setShowNowPlaying(false), 10000); 
      return () => clearTimeout(timer);
    }
  }, [showNowPlaying, currentSongIndex]);

  const goBack = () => setStage((prev) => prev - 1);

  return (
    <main className="min-h-screen bg-black overflow-hidden relative">
      
      <AnimatePresence mode="wait">
        {showNowPlaying && !(stage === 12 && (!isSecretIntroDone || isSecretVideoPlaying)) && (
          <motion.div
            key={currentSongIndex}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="fixed top-20 right-4 z-[200] bg-black/80 border-l-4 border-green-500 p-4 flex items-center gap-3 shadow-2xl backdrop-blur-sm"
          >
            <div className="text-xl animate-spin-slow">
              {playlist[currentSongIndex].src === song8 ? '✨' : '🎵'}
            </div>
            <div>
              <p className="text-gray-400 text-[10px] uppercase font-black tracking-widest">
                {playlist[currentSongIndex].src === song8 ? 'The Final Song' : 'Now Playing'}
              </p>
              <p className="text-white text-xs font-bold">{playlist[currentSongIndex].title}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {stage === 1 && <Welcome onNext={() => setStage(2)} playMusic={handlePlayMusic} />}
      {stage === 2 && <Page2 onSuccess={() => setStage(3)} onBack={() => setStage(1)} />}
      {stage === 3 && <Page3 onNext={() => setStage(4)} onBack={goBack} />}
      {stage === 4 && <Page4 onNext={() => setStage(5)} onBack={goBack} />}
      {stage === 5 && <Page5 onNext={() => setStage(6)} onBack={goBack} />}
      {stage === 6 && <Page6 onNext={() => setStage(7)} onBack={goBack} />}
      {stage === 7 && <Page7 onNext={() => setStage(8)} onBack={goBack} />}
      {stage === 8 && <Page8 onNext={() => setStage(9)} onBack={goBack} />}
      {stage === 9 && <Page9 onNext={() => setStage(10)} onBack={goBack} />}
      {stage === 10 && <Page10 onNext={() => setStage(11)} onBack={goBack} />}
      {stage === 11 && <Page11 onNext={() => setStage(12)} onBack={goBack} />}
      
      {stage === 12 && (
        <Page12 
          onBack={goBack} 
          onReveal={() => setIsSecretIntroDone(true)} 
          // 🔥 PASSING THE CONTROLLER TO PAGE 12
          onVideoPlay={(isPlaying) => setIsSecretVideoPlaying(isPlaying)}
        />
      )}
    </main>
  );
}

export default App;