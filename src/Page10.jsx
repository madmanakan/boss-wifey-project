import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- ASSETS IMPORT ---
import sdvBG from './assets/sdv23.jpg'; 
import envelopeClosed from './assets/envelope_closed.png'; 
import envelopeOpen from './assets/envelope_open.png'; 

function Page10({ onNext, onBack }) { 
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  // 🔥 UPDATED LETTER CONTENT 🔥
  const letterContent = (
    <div className="flex flex-col gap-4 text-[#3a2a1a] text-lg md:text-xl font-medium leading-relaxed text-left font-sans">
      <p className="font-black text-xl md:text-2xl mb-2 text-[#ad261d]">
        Happy Valentine's Day sa nag-iisang topakin, maldita at suplada kong Boss Ronaaa! 😤💜
      </p>

      <p>
        &nbsp; &nbsp; &nbsp; &nbsp; Eto din pala yung month na kung saan tayo unang nagkakilala at nagtagpo sa app na Litmatch nuee. Dati sabi ko sayo patay na patay ako sayo kahit sa chat lang, pero nung nagkita tayo, narealize ko... mas malala pala tama ko sayo sa personal, grabeee.
      </p>

      <p>
        &nbsp; &nbsp; &nbsp; &nbsp; Akala ko noon, wala na akong makikilalang babae na talagang hahanap-hanapin ko, hanggang sa dumating ka—yung presensya na hinahanap-hanap ko kahit may mga months noon na hindi tayo nagkaintindihan, nag-away, at dumating sa point na kailangan akong i-block. Pero kailanman, hindi nagbago ang tingin ko sayo kahit balik-baliktarin pa man ang mundo.
      </p>

      <p>
        &nbsp; &nbsp; &nbsp; &nbsp; Naalala ko yung kwentuhan natin habang naglalakad tayo after kumain sa McDo (kala ko pampatunaw na ng kinain natin pero habang naglalakad tayo nararamdaman ko yung tawag ng kalikasan HAHAHAHA 😭). Nabanggit mo sakin yung hometown nyo sa Manaoag, Pangasinan. Sabi mo, kaunti lang yung pasyalan o galaan dun kumpara sa Cubao. Sabi ko naman, "Mas maganda talaga sa probinsya, like tahimik talaga ang environment."
      </p>

      <p>
        &nbsp; &nbsp; &nbsp; &nbsp; Ang sagot mo sakin? "Sige, tabi kayo dun ni Papa matulog."
      </p>

      <p>
        &nbsp; &nbsp; &nbsp; &nbsp; HAHAHAHA! Sige, deal 'yan. Tabi kami ni Tito matulog habang kinukwento ko sa kanya kung gaano ko ka-mahal... at kung gaano ko gustong pakasalan ang nag-iisa at sobrang ganda niyang anak. (Kala mo ah! 😝)

        Pero seryoso Boss, hoping ako na sa susunod, malibot natin ang mga pasyalan dyan sa Quezon City at yung mga napuntahan mo na. At soon, kung papayag ka... sa kinalakihan mo namang lugar tayo gagala, at ikaw naman din ang igagala ko dito sa lugar namin, hindi lang sa Tanza kundi dito sa buong Cavite (HAHAHAHA 😝). Manifesting 'yan! ✨
      </p>

      <p>
        &nbsp; &nbsp; &nbsp; &nbsp; Kaya lubos akong nagpapasalamat kay God dahil nakakilala ako ng isang babaeng maldita at topakin. Alam kong manhater ka (dati 😝) at may sarili kang mundo minsan, pero wala e.. ikaw na talaga. Yung nakaka-adik mong halimuyak, yung mukha mong sobrang ganda at sobrang cute tapos sinabayan pa ng maganda mong makeup na bagay na bagay sayo... at lalo na yung buhok mong napakaganda at bagsak na bagsak, na lalong nagpapatingkad sa mukha mo—sobrang lakas ng dating sakin. (Nababaliw na ko Boss, pigilan mo ko, aaaa!) Yung mga ngiti at tawa mo na hindi ko malimutan hanggang ngayon at yung pagiging morena mo na talagang bumagay sa pagiging maldita mo—ikaw na ikaw. Wala akong masabi sa kagandahan mo Boss, to the point na gusto lang kita titigan ng matagal. 🥺
      </p>

      <p>
        &nbsp; &nbsp; &nbsp; &nbsp; Tsaka yung boses mo... Sa tagal na nating naglalaro na naka-open mic at nag-v-vm tayo, matagal ko nang gusto sabihin sa'yo na sobrang lambing. Di ko malaman kung bumagay ba sa pagiging maldita mo Boss, pero ang sarap pakinggan talaga lalo na nung nag-uusap tayo. For sure magaling ka kumanta noh? Sample nga ng isang <b>'Cruel Summer'</b> ni Taylor Swift dyan! 😝
      </p>

      <p>
        &nbsp; &nbsp; &nbsp; &nbsp; Ikaw lang ang kaisa-isahang babae na sobrang patay na patay ako—hanggang sa pagtulog, ikaw pa rin ang iniisip ko kahit unan lang ang kayakap ko. Hinding-hindi mawawala sa isipan ko ang una nating pagkikita. Simula nung una mo sakin na pagkalabit sa likuran ko... nagulat talaga ako, akala ko may nakasanggi o bumangga lang sakin sabay sabi ng 'Hi Kyle' kaya nung moment na pagkalingon ko, wala na—yun na pala ang simula ng moment natin na hinding-hindi ko makakalimutan sa buong buhay ko (sabay bilis maglakad ih, kala mue ikaw lang ah, nyenyenye) hanggang sa pag-uwi nating dalawa... Hinahanap-hanap ko pa rin araw-araw yung magkasama tayo at yung pagyakap ko sayo (actually nahiya ako nun ih, sa susunod hihigpitan ko na, kala mo ah 😝).
      </p>

      <p>
        &nbsp; &nbsp; &nbsp; &nbsp; Hindi na ako makapag-wait kung kailan ang second date natin. Pinag-iipunan at pinaghahandaan ko na 'yan para sa susunod... relax ka lang ulit, ako na ang bahala sa lahat.
      </p>

      <p>
        &nbsp; &nbsp; &nbsp; &nbsp; Pero lagi kong ipapaalala sayo na mag-ingat ka araw-araw—lalo na sa work at sa kalusugan mo. Huwag laging pwersahin ang sarili ahh. Tandaan na kailangan ding magpahinga pag napapagod, okay?
      </p>

      <p>
        &nbsp; &nbsp; &nbsp; &nbsp; Sobrang saya ko na marinig sayo na nakakapagsimula ka nang makapag-adapt sa work mo ngayon. Alam nating nahihirapan ka nung una, pero tingnan mo ngayon, unti-unti mo nang kinakaya at nagagamay. Kaya I'm always proud of you, more than you know. Huwag mo sanang i-pressure lagi ang self mue. Tandaan mue lagii na:
      </p>

      <div className="bg-[#eecfa1] p-4 rounded-lg border-l-4 border-[#ad261d] my-2 shadow-sm">
        <p className="font-black italic text-[#72432d] text-center mb-2">
          "It's okay to cry. It's okay to run away. We were not made that strong."
        </p>
        <p className="font-black italic text-[#72432d] text-center">
          "Don't let yourself down. Life is made difficult, but tomorrow is another day."
        </p>
      </div>

      <p>
        &nbsp; &nbsp; &nbsp; &nbsp; Alam kong makakayanan natin 'to. Naniniwala ako na better things and a better future are waiting for us.
      </p>

      <p>
        &nbsp; &nbsp; &nbsp; &nbsp; Basta tandaan mo, nandito lang ako palagi sa tabi mo kahit anong mangyari. Laging validated ang feelings mo—pagod ka man, malungkot, o tinotopak. Hindi ka naging abala at hinding-hindi ka magiging abala sakin.
      </p>

      <p>
        &nbsp; &nbsp; &nbsp; &nbsp; Kaya laban lang, aking Boss Ronaaaa!! and always appreciated kita palagii! (Always na, palagi pa san kapa! 😝)
      </p>

      <p>
        &nbsp; &nbsp; &nbsp; &nbsp; May sasabihin pa talaga ako sayo nun nung nasa Seattle's Best Coffee tayo kaso pinangunahan ako ng kaba at nauutal-utal ako nun Boss sa sobrang ganda mo (aaaa) pero gusto kong malaman mo 'to. Naalala mo yung tinanong mo sakin dati sa call? Yung may dalawang magkaibigan na tingin nila pwede pa na mas higit pa sa friend/tropa na more than friend? Ang sagot ko nun, "oo naman, kung nakikita nilang compatible silang dalawa kumbaga may naghihintay lang na umamin sa kanila at mag first move."
      </p>

      <p>
        &nbsp; &nbsp; &nbsp; &nbsp; At eto... aaminin ko sa'yo na gusto kita. Gustong-gusto kita, Ronalyn. Seryoso ako sa'yo.
      </p>

      <p>
        &nbsp; &nbsp; &nbsp; &nbsp; Gaya ng inamin ko nung first date natin habang hawak ko ang kamay mo at suot mo 'yung bracelet (tandang-tanda ko pa yung kaba at saya ko nung sinuot mo yung para sakin..) oo, nag-try ako sa iba nung panahong wala tayong communication. Pero tinigil ko din agad.

        Kasi napatunayan ko... ibang-iba ka sa kanila. Kahit anong gawin nila, hinding-hindi ka nila kayang higitan at wala nang makakapantay sa'yo.
      </p>

      <p>
        &nbsp; &nbsp; &nbsp; &nbsp; Kaya simula nung una... hanggang ngayon, hinding-hindi nag-iba ang pagtingin ko. Ikaw at ikaw pa rin. Higit pa sa kaibigan lang ang nararamdaman ko.
      </p>

      <p>
        &nbsp; &nbsp; &nbsp; &nbsp; Naalala ko yung sinabi mo after ko sayo tanungin na kung "akin kana ba?" Ang sagot mo sakin... "hindi muna ako makakapag-yes sayo ngayon, at wag muna natin limitahan ang lahat." Tama ka, Boss. Mag-focus muna tayo sa goals natin, mag-explore, at mag-grow. Basta hintayin mo lang ako makapagtapos ng pag-aaral, magkaroon ng stable job, at talagang masasabing financially stable. Naalala mo yung sinend mo saking TikTok reel dati na 'balang araw makakaalis din tayo sa zero days, sa ngayon pautang muna ako ng 1k'?
        <br /><br />
        &nbsp; &nbsp; &nbsp; &nbsp; Wag ka mag-aalala Boss, hindi lang 1k kundi buong sahod ko na ibibigay ko sayo, ako nalang mangungutang sayo ng 1k. (HAHAHAHA BLEH!) Sisiguraduhin ko na lahat ng gusto natin at pangarap natin, makukuha natin. Wag ka mag-alala, andito lang ako nakasuporta sayo hanggang sa marinig ko mula sa mga labi mo ang matamis na 'oo'.
      </p>

      <p>
        &nbsp; &nbsp; &nbsp; &nbsp; Always remember, I will always be your biggest fan and the number 1 cheerleader of your life. Handa akong maghintay ng ilang oras, ilang araw o kahit gaano katagal basta sa dulo, ikaw ang kasama ko.
      </p>

      <p>
        &nbsp; &nbsp; &nbsp; &nbsp; Salamat kasi hinayaan mong yakapin kita, salamat kasi unti-unti kang nagtitiwala. Huwag ka mag-alala, safe ka sakin. Akin ka lang, Boss.
      </p>

      <p className="font-bold mt-2">
        &nbsp; &nbsp; &nbsp; &nbsp; I miss you so much and love love kita palagi Boss/Madam, ang "Boss Wifey" ko ngayon... at ang soon-to-be Asawa ko habambuhay 😊. Happy Hearts Day!! 🥰🥰
      </p>
    </div>
  );

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden font-sans">
      
      {/* 🖼️ BACKGROUND SECTION */}
      <div className="fixed inset-0 z-0">
        <img src={sdvBG} className="w-full h-full object-cover" alt="Background" />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* 🔙 STICKY BACK BUTTON */}
      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={onBack}
        className="fixed top-6 left-6 z-[100] bg-[#634e34] border-4 border-[#3a2a1a] text-white px-3 py-1 font-black text-xs shadow-lg uppercase tracking-widest"
      >
        ⬅ BACK
      </motion.button>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="z-10 w-full max-w-3xl flex flex-col items-center text-center"
      >
        <AnimatePresence mode="wait">
          {!isEnvelopeOpen ? (
            <motion.div
              key="closed"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="cursor-pointer flex flex-col items-center"
              onClick={() => setIsEnvelopeOpen(true)}
            >
              <h1 className="text-white text-3xl md:text-5xl font-black mb-8 drop-shadow-lg italic uppercase">
                PARA SA 'YO, BOSS RONA 💜
              </h1>
              <img src={envelopeClosed} alt="Envelope" className="w-64 md:w-80 drop-shadow-2xl" />
              <p className="text-white mt-6 font-bold text-xl animate-bounce">Open this, Boss! 💌</p>
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#fbf0d5] border-8 border-[#72432d] shadow-2xl w-full max-h-[85vh] overflow-y-auto rounded-sm relative"
            >
              {/* --- FIXED STICKY HEADER --- */}
              <div className="sticky top-0 bg-[#fbf0d5] pt-4 pb-4 px-4 mb-6 border-b-4 border-[#72432d] flex justify-between items-center z-50">
                <span className="text-[#72432d] font-black text-xl md:text-2xl uppercase tracking-tighter">
                  FROM: YOUR ASAWA 😝
                </span>
                <button 
                  onClick={() => setIsEnvelopeOpen(false)} 
                  className="text-[#ad261d] font-black text-lg hover:scale-110 transition-transform"
                >
                  CLOSE X
                </button>
              </div>

              {/* --- LETTER BODY --- */}
              <div className="px-6 pb-2">
                {letterContent}
              </div>

              {/* 👇 FOOTER WITH P.S. AND NEXT BUTTON 👇 */}
              <div className="mt-8 mb-6 pt-6 border-t-4 border-[#72432d] text-center px-4 bg-[#fbf0d5]">
                
                <p className="text-[#3a2a1a] font-bold text-sm md:text-base italic mb-6 animate-pulse">
                  (P.S. miss na miss q na voice muee.. 🥺🥺)
                </p>

                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="bg-[#ad261d] border-4 border-[#5c120d] text-white px-8 py-3 font-black text-lg shadow-lg animate-bounce uppercase"
                >
                    MAY LAST SURPRISE PA AKO... 👉
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Page10;