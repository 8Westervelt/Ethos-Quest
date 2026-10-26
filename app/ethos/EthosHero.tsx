'use client';
import { withBase } from './EthosPath';
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import EthosButton from './EthosButton';
import { ethosHeroOptions } from './EthosMedia';
import { ethosPreview } from './EthosPath';
export const ethosEase = [0.16,1,0.3,1] as const;
export function entrance(delay: number) { return { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease: ethosEase } }; }
export default function EthosHero() {
 const video = useRef<HTMLVideoElement>(null);
 const reduced = useReducedMotion();
 const [playing, setPlaying] = useState(false);
 const [paused, setPaused] = useState(false);
 const [option, setOption] = useState(0);
 // Review control: lets the team compare the hero with and without the small line above the headline.
 const [showTagline, setShowTagline] = useState(true);
 const hero = ethosHeroOptions[option];
 const step = (by: number) => setOption(i => (i + by + ethosHeroOptions.length) % ethosHeroOptions.length);
 useEffect(() => { const el = video.current; if (!el) return; el.playbackRate = 0.85; if (reduced === false && !paused) el.play().catch(() => setPlaying(false)); else el.pause(); }, [reduced, paused, option]);
 return <section className="relative isolate flex min-h-[720px] w-full flex-col justify-end overflow-hidden px-6 pb-14 pt-40 md:min-h-[92svh] md:px-[48px] md:pb-20 min-[1440px]:px-[64px]">
  {/* Starts below the fixed banner (75/81/85px tall) so the banner never hides the skyline; the crop comes off the bottom by default. */}
  <div className={'absolute -z-20 overflow-hidden ' + (hero.original ? 'inset-0' : 'inset-x-0 bottom-0 top-[75px] md:top-[81px] lg:top-[85px]')}><video key={option} ref={video} loop muted playsInline preload="metadata" poster={withBase(hero.poster)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} style={{ objectPosition: hero.original ? 'center' : hero.focus ?? 'center top' }} className="h-full w-full object-cover"><source src={withBase(hero.film)} type="video/mp4" /></video></div>
  {/* Two washes: the original top-to-bottom tint, plus a left-side shade so the copy reads over bright footage. */}
  <div className="absolute inset-0 -z-10" style={{ background: 'linear-gradient(90deg, rgba(19,32,64,0.62) 0%, rgba(19,32,64,0.38) 45%, rgba(19,32,64,0) 75%), linear-gradient(180deg, rgba(19,32,64,0.28) 0%, rgba(19,32,64,0.12) 40%, rgba(19,32,64,0.55) 100%)' }} />
  <div className="mx-auto w-full max-w-[1280px] text-[#F7F4EE]">
   {showTagline && <motion.p {...entrance(0.15)} className="font-accent mb-6 text-[12px] font-semibold uppercase tracking-[0.26em] text-[#E4A3AE]">Executive Coaching</motion.p>}
   <motion.h1 {...entrance(0.3)} className="font-accent max-w-[1000px] text-[40px] leading-[1.06] sm:text-[54px] lg:text-[74px]"><span className="block">Leaders face their</span><span className="block">hardest decisions alone.</span><span className="mt-3 block text-[0.6em] text-[#F7F4EE]/80">They should not have to.</span></motion.h1>
   <motion.div {...entrance(0.5)} className="mt-10 grid gap-10 md:grid-cols-[1fr_1fr] md:items-end"><div className="flex flex-col gap-3 sm:flex-row"><EthosButton href="/private-inquiry">Begin a Private Inquiry</EthosButton><EthosButton secondary light href="/approach">The Methodology</EthosButton></div><p className="max-w-[520px] text-[17px] leading-[1.7] text-[#F7F4EE]/90 md:justify-self-end md:text-[18px]">A thinking partner worthy of the moment: someone who will stay in your corner, hold the mirror, and help you find clarity when everything feels unclear.</p></motion.div>
  </div>
  {!reduced && <button type="button" onClick={() => { if (playing) { setPaused(true); video.current?.pause(); } else { setPaused(false); video.current?.play().catch(() => setPlaying(false)); } }} aria-label={playing ? 'Pause background film' : 'Play background film'} className="absolute right-6 top-28 flex items-center gap-2 border border-[#F7F4EE]/40 bg-[#132040]/25 px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-[#F7F4EE] backdrop-blur-md md:right-[48px]">{playing ? <Pause size={10} /> : <Play size={10} />}{playing ? 'Pause film' : 'Play film'}</button>}
  <div className="absolute left-6 top-28 flex flex-col items-start gap-2 md:left-[48px]">
   {ethosPreview && ethosHeroOptions.length > 1 && <div role="group" aria-label="Hero film options" className="flex items-center border border-[#F7F4EE]/40 bg-[#132040]/25 text-[10px] uppercase tracking-[0.12em] text-[#F7F4EE] backdrop-blur-md"><button type="button" onClick={() => step(-1)} aria-label="Previous hero film" className="px-2.5 py-2 hover:bg-[#F7F4EE]/15"><ChevronLeft size={14} /></button><span aria-live="polite" className="whitespace-nowrap px-1">Option {option + 1} of {ethosHeroOptions.length}: {hero.label}</span><button type="button" onClick={() => step(1)} aria-label="Next hero film" className="px-2.5 py-2 hover:bg-[#F7F4EE]/15"><ChevronRight size={14} /></button></div>}
   <button type="button" onClick={() => setShowTagline(s => !s)} aria-pressed={!showTagline} className="border border-[#F7F4EE]/40 bg-[#132040]/25 px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-[#F7F4EE] backdrop-blur-md hover:bg-[#F7F4EE]/15">{showTagline ? 'Hide' : 'Show'} “Executive Coaching” line</button>
  </div>
 </section>;
}
