'use client';
import { withBase, photoSrc } from './EthosPath';
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import EthosButton from './EthosButton';
import { ethosHeroOptions } from './EthosMedia';
import { ethosPreview } from './EthosPath';
export const ethosEase = [0.16,1,0.3,1] as const;
// A CSS animation (ethos-rise in EthosStyles.css), so headlines show on first paint instead of waiting for the page's JavaScript.
export function entrance(delay: number) { return { style: { animation: `ethos-rise 0.9s cubic-bezier(${ethosEase.join(',')}) ${delay}s both` } }; }
export default function EthosHero() {
 const video = useRef<HTMLVideoElement>(null);
 const reduced = useReducedMotion();
 const [option, setOption] = useState(0);
 const [playing, setPlaying] = useState(-1);
 // Preview-only review control: lets the team compare the hero with and without the small line above the headline.
 const [showTagline, setShowTagline] = useState(true);
 const hero = ethosHeroOptions[option];
 const step = (by: number) => setOption(i => (i + by + ethosHeroOptions.length) % ethosHeroOptions.length);
 // The film loads only once the page has, so it never competes with the first paint; the still shows until it plays.
 // On portrait screens the still is cropped to fill the height, so `sizes` asks for the full-width file; a softer
 // still would also let Chrome count the film, not the still, as the page's main paint (LCP).
 useEffect(() => {
  const el = video.current; if (!el) return;
  el.defaultPlaybackRate = el.playbackRate = 0.85;
  if (reduced !== false) { el.pause(); return; }
  const start = () => { el.play().catch(() => {}); };
  if (document.readyState === 'complete') start(); else { window.addEventListener('load', start, { once: true }); return () => window.removeEventListener('load', start); }
 }, [reduced, option]);
 const position = { objectPosition: hero.original ? 'center' : hero.focus ?? 'center top' };
 return <section className="relative isolate flex min-h-[720px] w-full flex-col justify-end overflow-hidden px-6 pb-14 pt-40 md:min-h-[92svh] md:px-[48px] md:pb-20 min-[1440px]:px-[64px]">
  {/* Starts below the fixed banner (75/81/85px tall) so the banner never hides the skyline; the crop comes off the bottom by default. */}
  <div className={'absolute -z-20 overflow-hidden ' + (hero.original ? 'inset-0' : 'inset-x-0 bottom-0 top-[75px] md:top-[81px] lg:top-[85px]')}><img key={hero.poster} {...photoSrc(hero.poster, '(orientation: portrait) 180vh, 100vw')} alt="" fetchPriority="high" style={position} className="absolute inset-0 h-full w-full object-cover" /><video key={option} ref={video} loop muted playsInline preload="none" aria-hidden="true" onPlaying={() => setPlaying(option)} style={position} className={'absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ' + (playing === option ? 'opacity-100' : 'opacity-0')}><source src={withBase(hero.film)} type="video/mp4" /></video></div>
  {/* Two washes: the original top-to-bottom tint, plus a left-side shade so the copy reads over bright footage. */}
  <div className="absolute inset-0 -z-10" style={{ background: 'linear-gradient(90deg, rgba(19,32,64,0.62) 0%, rgba(19,32,64,0.38) 45%, rgba(19,32,64,0) 75%), linear-gradient(180deg, rgba(19,32,64,0.28) 0%, rgba(19,32,64,0.12) 40%, rgba(19,32,64,0.55) 100%)' }} />
  <div className="mx-auto w-full max-w-[1280px] text-[#F7F4EE]">
   {showTagline && <motion.p {...entrance(0.15)} className="font-accent mb-6 text-[12px] font-semibold uppercase tracking-[0.26em] text-[#E4A3AE]">Executive Coaching</motion.p>}
   <motion.h1 {...entrance(0.3)} className="font-accent max-w-[1000px] text-[40px] leading-[1.06] sm:text-[54px] lg:text-[74px]"><span className="block">Leaders face their</span><span className="block">hardest decisions alone.</span><span className="mt-3 block text-[0.6em] text-[#F7F4EE]/80">They should not have to.</span></motion.h1>
   <motion.div {...entrance(0.5)} className="mt-10 grid gap-10 md:grid-cols-[1fr_1fr] md:items-end"><div className="flex flex-col gap-3 sm:flex-row"><EthosButton href="/private-inquiry">Begin a Private Inquiry</EthosButton><EthosButton secondary light href="/approach">The Methodology</EthosButton></div><p className="max-w-[520px] text-[17px] leading-[1.7] text-[#F7F4EE]/90 md:justify-self-end md:text-[18px]">A thinking partner worthy of the moment: someone who will stay in your corner, hold the mirror, and help you find clarity when everything feels unclear.</p></motion.div>
  </div>
  <div className="absolute left-6 top-28 flex flex-col items-start gap-2 md:left-[48px]">
   {ethosPreview && ethosHeroOptions.length > 1 && <div role="group" aria-label="Hero film options" className="flex items-center border border-[#F7F4EE]/40 bg-[#132040]/25 text-[10px] uppercase tracking-[0.12em] text-[#F7F4EE] backdrop-blur-md"><button type="button" onClick={() => step(-1)} aria-label="Previous hero film" className="px-2.5 py-2 hover:bg-[#F7F4EE]/15"><ChevronLeft size={14} /></button><span aria-live="polite" className="whitespace-nowrap px-1">Option {option + 1} of {ethosHeroOptions.length}: {hero.label}</span><button type="button" onClick={() => step(1)} aria-label="Next hero film" className="px-2.5 py-2 hover:bg-[#F7F4EE]/15"><ChevronRight size={14} /></button></div>}
   {ethosPreview && <button type="button" onClick={() => setShowTagline(s => !s)} aria-pressed={!showTagline} className="border border-[#F7F4EE]/40 bg-[#132040]/25 px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-[#F7F4EE] backdrop-blur-md hover:bg-[#F7F4EE]/15">{showTagline ? 'Hide' : 'Show'} “Executive Coaching” line</button>}
  </div>
 </section>;
}
