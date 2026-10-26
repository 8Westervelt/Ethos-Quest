'use client';
import { withBase, photoSrc } from './EthosPath';
import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import EthosReveal from './EthosReveal';
import EthosButton from './EthosButton';
import EthosImage from './EthosImage';
import { ethosEase } from './EthosHero';
import { ethosMedia } from './EthosMedia';
import {
 methodWhy, methodLens, methodCeo, methodCapacity, methodClassification, methodFoundations, methodPhases,
 methodGaps, methodGapMap, methodPacing, methodSignals, methodSequence, methodSocratic, methodDragon,
 methodDistinctions, methodCoreDistinction, methodProprietary, methodPatterns, methodMultiplier,
 methodStructure, methodChange, methodArcs, methodGraduation, methodReadiness, methodValues, methodStance, methodOrigin, methodHuman, methodTenets,
} from './EthosMethod';
import { basselProfile, basselFigures, basselRecognition, basselCareer } from './EthosBassel';
import { ethosAudiences, audiencePath } from './EthosAudiences';
import { usePhotoOption } from './EthosPhotoPicker';

const space = 'px-6 py-20 md:px-12 md:py-24 lg:px-20';
const wrap = 'mx-auto max-w-[1280px]';
const h2 = 'font-accent text-[34px] leading-[1.1] md:text-[46px] lg:text-[54px]';
const h3 = 'text-[24px] leading-[1.3] md:text-[28px]';
const body = 'text-[17px] leading-[1.8] text-[#132040]/75';
const small = 'text-[15px] leading-[1.75] text-[#132040]/70';
const line = 'border-[#132040]/12';
function Kicker({ children, className = '' }: { children: React.ReactNode; className?: string }) { return <p className={'font-accent text-[12px] uppercase tracking-[0.26em] text-[#9E1B34] ' + className}>{children}</p>; }
function Rule() { return <span aria-hidden="true" className="block h-px w-12 bg-[#9E1B34]" />; }
function Quote({ children, className = '' }: { children: React.ReactNode; className?: string }) { return <p className={'font-accent text-[24px] leading-[1.4] md:text-[30px] ' + className}>{children}</p>; }

/* Home: the standard we set, with the branded notebook. */
export function EthosManifesto() {
 return <section className={space + ' ethos-sand'}><div className={wrap}>
  <EthosReveal className="flex items-center gap-6"><Kicker>Why <span className="normal-case">EthosQuest</span> Exists</Kicker><span className={'h-px flex-1 bg-[#132040]/15'} /><Kicker className="hidden sm:block">Senior leaders exclusively</Kicker></EthosReveal>
  <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
   <EthosReveal><h2 className={h2 + ' max-w-[640px]'}>{methodWhy.standard}</h2><p className="mt-10 max-w-[600px] text-[21px] leading-[1.6] md:text-[24px]">{methodWhy.body}</p><p className={body + ' mt-6 max-w-[560px]'}>{methodWhy.promise}</p></EthosReveal>
   <EthosReveal delay={0.1} className="grid gap-8 sm:grid-cols-[0.9fr_1.1fr] lg:grid-cols-1"><EthosImage src={ethosMedia.notebook} alt="EthosQuest mark debossed into a leather notebook" ratio="aspect-[4/3]" /><div className={'border-t pt-7 ' + line}><h3 className={h3}>{methodCeo.title}</h3><p className={small + ' mt-4'}>{methodCeo.body}</p></div></EthosReveal>
  </div>
 </div></section>;
}

/* The lens: alignment, not performance. */
export function EthosLens({ slot = 'lens' }: { slot?: 'lens' | 'ceoLens' }) {
 const { photo, picker } = usePhotoOption(slot);
 return <section className={space}><div className={wrap + ' grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24'}>
  <EthosReveal className="relative"><EthosImage key={photo.src} src={photo.src} alt={photo.alt} ratio="aspect-[4/5]" />{picker}</EthosReveal>
  <EthosReveal delay={0.1}><Kicker>The Lens</Kicker><h2 className={h2 + ' mt-5'}>{methodLens.title}</h2><p className={body + ' mt-8 max-w-[560px]'}>{methodLens.body}</p><div className={'mt-10 border-t pt-8 ' + line}><Quote>{methodLens.question}</Quote><p className={small + ' mt-5 max-w-[520px]'}>The question is not how we optimize your output. It is whether your life, your choices, and your values actually fit together.</p></div></EthosReveal>
 </div></section>;
}

/* The arc of the first ninety days. */
export function EthosArc({ full = false }: { full?: boolean }) {
 const list = useRef<HTMLOListElement>(null);
 const reduced = useReducedMotion();
 const { scrollYProgress } = useScroll({ target: list, offset: ['start 0.8', 'end 0.7'] });
 return <section className={space + (full ? '' : ' ethos-sand')}><div className={wrap + ' grid gap-14 lg:grid-cols-[0.85fr_1.4fr] lg:gap-24'}>
  <div className="lg:sticky lg:top-32 lg:self-start"><EthosReveal><Kicker>The Arc</Kicker><h2 className={h2 + ' mt-5'}>The First<br />Ninety Days</h2><p className={small + ' mt-8 max-w-[440px]'}>Presented in sequence for clarity. In practice the coach moves fluidly, following the energy of the conversation and abandoning structure when the moment demands it. The structure is a container, not a script.</p>{!full && <div className="mt-10 flex"><EthosButton href="/approach" secondary>The Full Methodology</EthosButton></div>}</EthosReveal></div>
  <div className="relative lg:pl-12">
   <div aria-hidden="true" className="absolute top-2 bottom-2 left-0 hidden w-px bg-[#132040]/12 lg:block"><motion.div style={{ scaleY: reduced ? 1 : scrollYProgress }} className="h-full w-px origin-top bg-[#9E1B34]" /></div>
   <ol ref={list} aria-label="The first ninety days" className="m-0 list-none p-0">{methodPhases.map((p, i) => <EthosReveal key={p.phase} delay={i * 0.05}><li className={'grid gap-3 border-t py-9 md:grid-cols-[170px_1fr] md:gap-10 ' + line + (full ? ' lg:py-12' : '')}>
    <p className="font-accent pt-2 text-[12px] uppercase leading-[1.6] tracking-[0.2em] text-[#9E1B34]">{p.when}</p>
    <div><h3 className={h3}>{p.phase}</h3><p className="mt-3 max-w-[600px] text-[18px] leading-[1.6] text-[#132040]/85">{p.summary}</p>
     {full && <><p className={small + ' mt-5 max-w-[620px]'}>{p.detail}</p><ul className={'mt-7 max-w-[620px] divide-y border-y divide-[#132040]/12 ' + line}>{p.tools.map(t => <li key={t} className="py-3 text-[14px] text-[#132040]/80">{t}</li>)}</ul></>}
    </div>
   </li></EthosReveal>)}</ol>
  </div>
 </div></section>;
}

/* Full-bleed statement of the core capacity. The one dark moment, carried by a photograph. */
export function EthosCapacity({ full = false }: { full?: boolean }) {
 // The full version (Methodology page) draws from its own photos so the two pages never repeat.
 const { photo, picker } = usePhotoOption(full ? 'capacityMethod' : 'capacity', 'right-4 top-4 md:right-8 md:top-8');
 return <section className="ethos-dark relative isolate overflow-hidden px-6 py-28 md:px-12 md:py-40 lg:px-20">{picker}<img {...photoSrc(photo.src)} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center] saturate-[0.85]" /><div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(18,26,36,0.9)_0%,rgba(18,26,36,0.72)_55%,rgba(18,26,36,0.35)_100%)]" />
  <EthosReveal className={wrap}><div className="max-w-[760px]"><p className="font-accent text-[12px] uppercase tracking-[0.26em] text-[#E4A3AE]">The Core Capacity</p><div className="mt-6"><Rule /></div><h2 className="font-accent mt-10 text-[32px] leading-[1.15] md:text-[46px] lg:text-[54px]">{methodCapacity.statement}</h2><p className="mt-10 max-w-[620px] text-[18px] leading-[1.75] text-[#F7F4EE]/88">{methodCapacity.body}</p>{full && <p className="mt-6 max-w-[600px] text-[16px] leading-[1.8] text-[#F7F4EE]/72">{methodCapacity.close}</p>}</div></EthosReveal>
 </section>;
}

/* The business case, expandable. Home: each priority client and the core need it brings. For Leaders (full): five leadership patterns. */
export function EthosPatterns({ full = false }: { full?: boolean }) {
 const [active, setActive] = useState<number | null>(full ? 0 : null);
 const rows: { title: string; need?: string; cost: string; closes: string; href?: string }[] = full
  ? methodPatterns.map(([title, cost, closes]) => ({ title, cost, closes }))
  : ethosAudiences.map(a => ({ title: a.name, need: a.need[0], cost: a.need[1], closes: a.need[2], href: audiencePath(a) }));
 return <section className={space + (full ? ' ethos-sand' : '')}><div className={wrap}>
  <EthosReveal className="grid items-end gap-6 md:grid-cols-[1fr_340px]"><div><Kicker>The Business Case</Kicker><h2 className={h2 + ' mt-5 max-w-[760px]'}>When the leader changes, the business changes.</h2></div><p className={small + ' max-w-[320px]'}>{full ? 'Five integrity gaps we see in senior leaders, the cost each carries, and what happens when it closes.' : 'The leaders we serve, the core need each brings, what it costs when it goes unmet, and what changes when it is met.'}</p></EthosReveal>
  <div className={'mt-12 border-t ' + line}>{rows.map(({ title, need, cost, closes, href }, i) => <div key={title} className={'border-b ' + line}><h3><button id={'pattern-' + i} aria-expanded={active === i} aria-controls={'pattern-panel-' + i} onClick={() => setActive(active === i ? null : i)} className="group flex w-full items-center justify-between gap-8 bg-transparent py-6 text-left text-[#132040] transition-colors hover:text-[#9E1B34]"><span className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-6"><span className="text-[22px] leading-[1.3] md:text-[28px]">{title}</span>{need && <span className="font-accent text-[12px] uppercase tracking-[0.22em] text-[#9E1B34]">Core need: {need}</span>}</span><motion.span animate={{ rotate: active === i ? 45 : 0 }} className="shrink-0 text-[#9E1B34]"><Plus size={24} strokeWidth={1.4} /></motion.span></button></h3>
   <AnimatePresence initial={false}>{active === i && <motion.div key={'p' + i} id={'pattern-panel-' + i} role="region" aria-labelledby={'pattern-' + i} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: ethosEase }} className="overflow-hidden"><div className="grid gap-8 pb-9 md:grid-cols-2 md:gap-16"><div><Kicker>The cost</Kicker><p className={small + ' mt-4'}>{cost}</p></div><div><Kicker>{full ? 'When the gap closes' : 'When the need is met'}</Kicker><p className="mt-4 text-[15px] leading-[1.75] text-[#132040]/90">{closes}</p>{href && <a href={withBase(href)} className="mt-6 inline-flex items-center gap-2 border-b border-[#132040]/35 pb-1 text-[14px] transition-colors hover:text-[#9E1B34]">For {title}<ArrowUpRight size={16} strokeWidth={1.4} /></a>}</div></div></motion.div>}</AnimatePresence>
  </div>)}</div>
  <EthosReveal className="mt-12 grid gap-8 md:grid-cols-[1fr_1fr] md:gap-16"><p className="max-w-[600px] text-[21px] leading-[1.55] md:text-[24px]">{methodMultiplier}</p>{!full && <a href={withBase('/for-leaders')} className="flex items-end gap-8 self-end border-b border-[#132040]/35 pb-3 text-[14px] md:w-fit md:justify-self-end">What to expect as a client<ArrowUpRight size={18} strokeWidth={1.4} /></a>}</EthosReveal>
 </div></section>;
}

/* What changes, and when. */
export function EthosChange() {
 return <section className={space}><div className={wrap}>
  <EthosReveal><Kicker>The Nature of Change</Kicker></EthosReveal>
  <div className={'mt-8 grid border-y md:grid-cols-2 ' + line}>{methodChange.map(([when, body], i) => <EthosReveal key={when} delay={i * 0.1} className={'py-10 md:pr-16 ' + (i === 1 ? 'border-t md:border-t-0 md:border-l md:pl-16 ' + line : '')}><p className="font-accent text-[40px] leading-none text-[#9E1B34] md:text-[56px]">{when}</p><p className="mt-7 max-w-[460px] text-[17px] leading-[1.75] text-[#132040]/80">{body}</p></EthosReveal>)}</div>
  <EthosReveal className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16"><p className={body + ' max-w-[520px]'}>Change is not linear. Old patterns resurface under stress. The work is not about eliminating them. It is about mastery.</p><Quote>{methodDragon.statement}</Quote></EthosReveal>
 </div></section>;
}

/* Approach: classification and ICF foundation. */
export function EthosClassification() {
 return <section className={space + ' ethos-sand'}><div className={wrap}>
  <EthosReveal className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-24"><div><Kicker>Definition</Kicker><h2 className={h2 + ' mt-5'}>Transformational and adaptive developmental coaching.</h2></div><div className="flex flex-col justify-end"><p className={body + ' max-w-[520px]'}>Integrative in orientation, grounded in the principles and competency framework of the International Coaching Federation, in validated scientific assessments, and in five intellectual pillars. The ICF standard is the ethical baseline every EthosQuest coach operates within. This is non-negotiable.</p></div></EthosReveal>
  <div className={'mt-14 grid gap-x-8 border-t sm:grid-cols-2 lg:grid-cols-5 ' + line}>{methodClassification.map(([term, body], i) => <EthosReveal key={term} delay={i * 0.06} className={'border-b py-7 lg:border-b-0 ' + line}><h3 className="font-accent text-[14px] uppercase tracking-[0.18em]">{term}</h3><p className={small + ' mt-4'}>{body}</p></EthosReveal>)}</div>
 </div></section>;
}

/* Approach: five intellectual foundations. */
export function EthosFoundations() {
 return <section className={space}><div className={wrap}>
  <EthosReveal className="max-w-[820px]"><Kicker>Intellectual Foundations</Kicker><h2 className={h2 + ' mt-5'}>Extracted from practice. Consistent with the science.</h2><p className={body + ' mt-8 max-w-[600px]'}>The methodology did not emerge from theory. It emerged from thousands of hours sitting with leaders under pressure. That practice is informed by, and consistent with, several bodies of work that give it structure and credibility.</p></EthosReveal>
  <div className={'mt-12 border-t ' + line}>{methodFoundations.map(([title, source, body], i) => <EthosReveal key={title} delay={i * 0.05}><div className={'grid gap-3 border-b py-8 md:grid-cols-[1fr_1.3fr] md:gap-12 lg:grid-cols-[0.9fr_0.7fr_1.2fr] ' + line}><h3 className={h3}>{title}</h3><p className="font-accent text-[12px] uppercase leading-[1.7] tracking-[0.2em] text-[#9E1B34] md:pt-2">{source}</p><p className={small + ' md:col-span-2 lg:col-span-1'}>{body}</p></div></EthosReveal>)}</div>
  <EthosReveal className="mt-10 max-w-[760px]"><p className={small}>Philosophically, the work is grounded in existentialist and stoic traditions: meaning is constructed through choice, leaders must take full ownership of their lives, and mastery comes not from eliminating difficulty but from learning to relate to it wisely. None of this is named to clients. They experience it as a coach who takes their choices seriously and refuses to let them off the hook.</p></EthosReveal>
 </div></section>;
}

/* Approach: the reading. Integrity gaps and the gap map. */
export function EthosGapMap() {
 return <section className={space + ' ethos-sand'}><div className={wrap}>
  <EthosReveal className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-24"><div><Kicker>The Reading</Kicker><h2 className={h2 + ' mt-5'}>{methodGaps.title}</h2></div><div className="flex flex-col justify-end"><p className={body + ' max-w-[540px]'}>{methodGaps.body}</p></div></EthosReveal>
  <div className={'mt-14 grid gap-10 border-t pt-12 md:grid-cols-3 md:gap-12 ' + line}>{methodGapMap.map(([name, low, high, body], i) => <EthosReveal key={name} delay={i * 0.08}><h3 className="font-accent text-[14px] uppercase tracking-[0.22em]">{name}</h3><div className="mt-6 flex items-center gap-4"><span className="font-accent text-[11px] uppercase tracking-[0.16em] text-[#132040]/60">{low}</span><span aria-hidden="true" className="relative h-px flex-1 bg-[#132040]/25"><motion.span initial={{ left: '0%' }} whileInView={{ left: '100%' }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 1.6, delay: 0.3 + i * 0.15, ease: ethosEase }} className="absolute top-1/2 h-[8px] w-[8px] -translate-x-1/2 -translate-y-1/2 bg-[#9E1B34]" /></span><span className="font-accent text-[11px] uppercase tracking-[0.16em] text-[#132040]/60">{high}</span></div><p className={small + ' mt-6'}>{body}</p></EthosReveal>)}</div>
  <div className={'mt-16 grid gap-12 border-t pt-12 lg:grid-cols-[1fr_1fr] lg:gap-24 ' + line}>
   <EthosReveal><h3 className={h3}>{methodPacing.title}</h3><p className={small + ' mt-6 max-w-[540px]'}>{methodPacing.body}</p><Quote className="mt-8 !text-[22px] md:!text-[26px]">{methodPacing.close}</Quote></EthosReveal>
   <EthosReveal delay={0.1}><Kicker>What the coach listens for</Kicker><ul className="mt-5 grid gap-x-10 sm:grid-cols-2">{methodSignals.map(([s, body]) => <li key={s} className={'border-t py-5 ' + line}><p className="text-[17px] font-medium">{s}</p><p className="mt-2 text-[14px] leading-[1.7] text-[#132040]/65">{body}</p></li>)}</ul></EthosReveal>
  </div>
  <EthosReveal className="mt-14 max-w-[800px]"><Rule /><Quote className="mt-8">{methodGaps.principle}</Quote><p className={small + ' mt-6 max-w-[620px]'}>The assessments are mirrors, not verdicts. The coach does not use them to tell you what is wrong. The coach uses them so you discover it yourself.</p></EthosReveal>
 </div></section>;
}

/* Approach: the intervention sequence and the Socratic path. */
export function EthosSequence() {
 return <section className={space}><div className={wrap}>
  <EthosReveal className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-24"><div><Kicker>The Intervention</Kicker><h2 className={h2 + ' mt-5'}>How a gap is worked.</h2></div><div className="flex flex-col justify-end"><p className={body + ' max-w-[520px]'}>Diagnosis becomes action. Most interventions follow this architecture. It adapts to the client, but the shape is consistent: the coach honors before challenging, frames the gap as strategic rather than moral, and never hands over the answer.</p></div></EthosReveal>
  <ol className={'mt-12 grid list-none gap-x-16 border-t p-0 md:grid-cols-2 ' + line}>{methodSequence.map(([title, body], i) => <EthosReveal key={title} delay={(i % 2) * 0.08}><li className={'grid h-full gap-3 border-b py-7 ' + line}><h3 className="text-[22px] leading-[1.3] md:text-[24px]">{title}</h3><p className={small}>{body}</p></li></EthosReveal>)}</ol>
  <div className="mt-16 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
   <EthosReveal><Kicker>The Socratic Path</Kicker><h3 className={h3 + ' mt-5'}>{methodSocratic.title}</h3><p className={small + ' mt-6 max-w-[460px]'}>{methodSocratic.body}</p></EthosReveal>
   <EthosReveal delay={0.1}><ul className={'border-t ' + line}>{methodSocratic.questions.map(q => <li key={q} className={'font-accent border-b py-5 text-[19px] leading-[1.4] md:text-[22px] ' + line}>{q}</li>)}</ul></EthosReveal>
  </div>
 </div></section>;
}

/* The dragon parable. */
export function EthosDragon() {
 return <section className={space + ' ethos-sand border-y ' + line}><EthosReveal className="mx-auto max-w-[900px] text-center"><Kicker>Mastery, Not Elimination</Kicker><h2 className="font-accent mt-8 text-[30px] leading-[1.25] md:text-[42px]">{methodDragon.statement}</h2><p className={body + ' mx-auto mt-10 max-w-[680px]'}>{methodDragon.body}</p></EthosReveal></section>;
}

/* Methodology page: the three core tenets (ETHOS-5). */
export function EthosTenets() {
 return <section className={space}><div className={wrap}>
  <EthosReveal className="max-w-[760px]"><Kicker>Three Core Tenets</Kicker><h2 className={h2 + ' mt-5'}>What the work rests on.</h2><p className={body + ' mt-8 max-w-[620px]'}>Every engagement is shaped around the leader in front of us. Three convictions hold it together.</p></EthosReveal>
  <ol className={'mt-14 grid border-t lg:grid-cols-3 ' + line}>{methodTenets.map(([title, text, line2], i) => <EthosReveal key={title} delay={i * 0.08} className={'border-b py-10 lg:border-b-0 lg:px-10 lg:first:pl-0 lg:last:pr-0 ' + (i > 0 ? 'lg:border-l ' : '') + line}><li className="flex h-full flex-col"><p className="font-accent text-[44px] leading-none text-[#9E1B34] md:text-[52px]">{String(i + 1).padStart(2, '0')}</p><h3 className="font-accent mt-6 text-[26px] leading-[1.2] md:text-[30px]">{title}</h3><p className={small + ' mt-5 flex-1'}>{text}</p><p className="mt-8 border-t border-[#132040]/12 pt-6 text-[17px] italic leading-[1.6] text-[#132040]/80">{line2}</p></li></EthosReveal>)}</ol>
 </div></section>;
}

/* Coaching, therapy, mentoring, consulting. */
export function EthosDistinctionsGrid() {
 return <section className={space}><div className={wrap}>
  <EthosReveal className="max-w-[820px]"><Kicker>The Distinctions</Kicker><h2 className={h2 + ' mt-5'}>Coaching. Not therapy, mentoring, or consulting.</h2></EthosReveal>
  <div className="mt-12 grid gap-px bg-[#132040]/12 md:grid-cols-2 lg:grid-cols-4">{methodDistinctions.map(([name, concern, body], i) => { const us = i === methodDistinctions.length - 1; return <EthosReveal key={name} delay={i * 0.07} className={'flex flex-col p-8 lg:p-9 ' + (us ? 'bg-[#132040] text-[#F7F4EE]' : 'bg-[#F7F4EE]')}><p className={'font-accent text-[12px] tracking-[0.24em] ' + (us ? 'normal-case ' : 'uppercase ') + (us ? 'text-[#E4A3AE]' : 'text-[#9E1B34]')}>{name}</p><h3 className="mt-8 text-[24px] leading-[1.3]">{concern}</h3><p className={'mt-5 text-[15px] leading-[1.75] ' + (us ? 'text-[#F7F4EE]/80' : 'text-[#132040]/70')}>{body}</p></EthosReveal>; })}</div>
  <EthosReveal className="mt-12 max-w-[840px]"><Quote>{methodCoreDistinction}</Quote><p className={small + ' mt-6 max-w-[660px]'}>The difference is not subtle. It requires the coach to go deeper, stay longer, and resist the urge to solve quickly. It requires the client to face things they may have been avoiding for years. And it produces a different kind of result: not just better performance, but genuine alignment between what a senior leader says matters and how they actually live.</p></EthosReveal>
 </div></section>;
}

/* What is proprietary. */
export function EthosProprietary() {
 return <section className={space + ' ethos-sand'}><div className={wrap}>
  <EthosReveal className="max-w-[860px]"><Kicker>What Is Proprietary</Kicker><h2 className={h2 + ' mt-5'}>Experienced coaches will recognize the tools. What goes inside them is ours.</h2><p className={body + ' mt-8 max-w-[600px]'}>GROW, the Wheel of Life, 360 feedback, accountability frameworks: none of these are proprietary. Six things are.</p></EthosReveal>
  <div className={'mt-12 grid gap-x-16 border-t md:grid-cols-2 ' + line}>{methodProprietary.map(([title, body], i) => <EthosReveal key={title} delay={(i % 2) * 0.08}><div className={'border-b py-7 ' + line}><h3 className="text-[22px] leading-[1.3] md:text-[24px]">{title}</h3><p className={small + ' mt-3'}>{body}</p></div></EthosReveal>)}</div>
  <EthosReveal className="mt-10 max-w-[680px]"><p className={small}>{methodHuman}</p></EthosReveal>
 </div></section>;
}

/* For Leaders page: the structure of an engagement. */
export function EthosStructure() {
 return <section className={space}><div className={wrap}>
  <EthosReveal className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-24"><div><Kicker>The Structure</Kicker><h2 className={h2 + ' mt-5'}>Same structure for everyone.</h2></div><div className="flex flex-col justify-end"><p className={body + ' max-w-[520px]'}>The value proposition is simple and it does not vary. What varies is everything inside it: the reading, the pace, and how deep the work goes.</p></div></EthosReveal>
  <div className={'mt-12 grid border-t md:grid-cols-2 ' + line}>{methodStructure.map(([title, body], i) => <EthosReveal key={title} delay={i * 0.07} className={'border-b py-8 md:pr-12 ' + line + (i % 2 === 1 ? ' md:border-l md:pl-12' : '')}><h3 className={h3}>{title}</h3><p className={small + ' mt-4 max-w-[480px]'}>{body}</p></EthosReveal>)}</div>
 </div></section>;
}

/* For Leaders page: how engagements evolve and end. */
export function EthosArcs() {
 return <section className={space + ' ethos-sand'}><div className={wrap}>
  <EthosReveal className="max-w-[800px]"><Kicker>How Engagements Evolve</Kicker><h2 className={h2 + ' mt-5'}>Two arcs. Neither is superior.</h2><p className={body + ' mt-8 max-w-[600px]'}>Engagements do not follow a single path. The arc is determined by what you need and what life presents, not by a predetermined timeline.</p></EthosReveal>
  <div className={'mt-12 grid border-t md:grid-cols-2 ' + line}>{methodArcs.map(([title, span, body], i) => <EthosReveal key={title} delay={i * 0.1} className={'py-9 md:pr-12 ' + (i === 1 ? 'border-t md:border-t-0 md:border-l md:pl-12 ' + line : '')}><p className="font-accent text-[12px] uppercase tracking-[0.2em] text-[#9E1B34]">{span}</p><h3 className={h3 + ' mt-4'}>{title}</h3><p className={small + ' mt-5 max-w-[520px]'}>{body}</p></EthosReveal>)}</div>
  <EthosReveal className={'mt-12 grid gap-10 border-t pt-12 lg:grid-cols-[1fr_1fr] lg:gap-24 ' + line}><div><h3 className={h3}>{methodGraduation.title}</h3><p className={small + ' mt-5 max-w-[520px]'}>{methodGraduation.body}</p></div><div className="flex flex-col justify-end"><Rule /><Quote className="mt-7 !text-[21px] md:!text-[24px]">{methodGraduation.measure}</Quote></div></EthosReveal>
 </div></section>;
}

/* For Leaders page: readiness. */
export function EthosReadiness() {
 return <section className={space}><div className={wrap + ' grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-24'}>
  <EthosReveal><Kicker>Readiness</Kicker><h2 className={h2 + ' mt-5'}>{methodReadiness.title}</h2><p className={body + ' mt-8 max-w-[500px]'}>{methodReadiness.body}</p><div className="mt-10 flex"><EthosButton href="/private-inquiry">Request a Discovery Call</EthosButton></div></EthosReveal>
  <EthosReveal delay={0.1} className="flex flex-col justify-center"><Kicker>Three questions we will ask</Kicker><ul className={'mt-5 border-t ' + line}>{methodReadiness.questions.map(q => <li key={q} className={'font-accent border-b py-6 text-[20px] leading-[1.4] md:text-[24px] ' + line}>{q}</li>)}</ul></EthosReveal>
 </div></section>;
}

/* About: Bassel's credentials, up front (ETHOS-7). */
export function EthosBassel() {
 return <section className={space + ' ethos-sand'}><div className={wrap}>
  <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
   <EthosReveal><figure className="max-w-[420px]"><EthosImage src="/media/coaches/bassel-hamwi.jpg" alt={basselProfile.name + ', ' + basselProfile.role} ratio="aspect-[4/5]" /></figure></EthosReveal>
   <EthosReveal delay={0.1} className="flex flex-col justify-center"><Kicker>Leadership</Kicker><h2 className={h2 + ' mt-5'}>{basselProfile.name}</h2><p className="font-accent mt-4 text-[13px] uppercase tracking-[0.2em] text-[#132040]/65">{basselProfile.role}<span className="mx-3 text-[#9E1B34]">·</span>{basselProfile.credential}</p>{basselProfile.bio.map((p, i) => <p key={i} className={body + ' mt-7 max-w-[640px]'}>{p}</p>)}<a href={withBase('/coaches/bassel-hamwi')} className="mt-9 inline-flex w-fit items-center gap-6 border-b border-[#132040]/35 pb-3 text-[14px]">Full coaching profile<ArrowUpRight size={17} strokeWidth={1.4} /></a></EthosReveal>
  </div>
  <dl className={'mt-16 grid border-t sm:grid-cols-2 lg:grid-cols-4 ' + line}>{basselFigures.map(([figure, label], i) => <EthosReveal key={figure} delay={i * 0.06} className={'border-b py-8 sm:pr-8 lg:border-b-0 ' + line}><dt className="font-accent text-[44px] leading-none text-[#9E1B34] md:text-[52px]">{figure}</dt><dd className={small + ' mt-4 max-w-[260px]'}>{label}</dd></EthosReveal>)}</dl>
  <EthosReveal className={'flex flex-col gap-3 border-t pt-8 md:flex-row md:flex-wrap md:gap-x-10 ' + line}>{basselRecognition.map(item => <p key={item} className="flex items-baseline gap-3 text-[14px] leading-[1.6] text-[#132040]/70"><span aria-hidden="true" className="inline-block h-px w-5 shrink-0 translate-y-[-4px] bg-[#9E1B34]" />{item}</p>)}</EthosReveal>
 </div></section>;
}

/* About: Bassel's career, in order. */
export function EthosBasselCareer() {
 return <section className={space}><div className={wrap + ' grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24'}>
  <EthosReveal className="lg:sticky lg:top-32 lg:self-start"><Kicker>The Record</Kicker><h2 className={h2 + ' mt-5'}>Three decades of decisions that mattered.</h2><p className={small + ' mt-8 max-w-[420px]'}>Institutions built, funds raised, boards served. The experience behind the conversations Bassel has with the leaders he coaches.</p></EthosReveal>
  <ol className={'border-t ' + line}>{basselCareer.map(([years, title, detail], i) => <EthosReveal key={title} delay={i * 0.04}><li className={'grid gap-2 border-b py-7 md:grid-cols-[150px_1fr] md:gap-10 ' + line}><p className="font-accent text-[12px] uppercase tracking-[0.18em] text-[#9E1B34] md:pt-1.5">{years}</p><div><h3 className="text-[20px] leading-[1.35] md:text-[22px]">{title}</h3><p className={small + ' mt-2'}>{detail}</p></div></li></EthosReveal>)}</ol>
 </div></section>;
}

/* About: origin story. */
export function EthosOrigin() {
 return <section className={space + ' ethos-sand'}><div className={wrap + ' grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24'}>
  <EthosReveal className="lg:sticky lg:top-32 lg:self-start"><Kicker>The Origin</Kicker><h2 className={h2 + ' mt-5'}>{methodOrigin.title}</h2></EthosReveal>
  <EthosReveal delay={0.1} className="flex flex-col justify-center">{methodOrigin.body.map((p, i) => <p key={i} className={(i === 0 ? 'text-[24px] leading-[1.5] md:text-[28px]' : body + ' mt-7')}>{p}</p>)}<div className="mt-10"><Rule /></div><Quote className="mt-8">{methodOrigin.close}</Quote></EthosReveal>
 </div></section>;
}

/* About: five values. */
export function EthosValues() {
 return <section className={space}><div className={wrap}>
  <EthosReveal className="max-w-[720px]"><Kicker>Our Values</Kicker><h2 className={h2 + ' mt-5'}>Five commitments. No exceptions.</h2></EthosReveal>
  <div className={'mt-12 grid gap-x-8 border-t sm:grid-cols-2 lg:grid-cols-5 ' + line}>{methodValues.map(([v, body], i) => <EthosReveal key={v} delay={i * 0.06} className={'border-b py-8 lg:border-b-0 ' + line}><h3 className="font-accent text-[16px] uppercase tracking-[0.18em]">{v}</h3><p className={small + ' mt-5'}>{body}</p></EthosReveal>)}</div>
 </div></section>;
}

/* About: the coach's stance. */
export function EthosStance() {
 return <section className={space + ' ethos-sand'}><div className={wrap + ' grid gap-14 lg:grid-cols-[0.9fr_1.4fr] lg:gap-24'}>
  <EthosReveal className="lg:sticky lg:top-32 lg:self-start"><Kicker>The Coach’s Stance</Kicker><h2 className={h2 + ' mt-5'}>Not a neutral facilitator.</h2><p className={small + ' mt-8 max-w-[440px]'}>The coach does not have an opinion about what you should do. The coach has a commitment to ensuring you see clearly, decide honestly, and act in alignment with what you actually value. When the coach mirrors back, you are not hearing their perspective. You are hearing your own truth, organized and reflected with precision.</p><div className="mt-10 flex"><EthosButton href="/coaches" secondary>Meet the Coaches</EthosButton></div></EthosReveal>
  <div className={'border-t ' + line}>{methodStance.map(([title, body], i) => <EthosReveal key={title} delay={i * 0.05}><div className={'grid gap-3 border-b py-7 md:grid-cols-[260px_1fr] md:gap-10 ' + line}><h3 className="text-[21px] leading-[1.3] md:text-[23px]">{title}</h3><p className={small}>{body}</p></div></EthosReveal>)}</div>
 </div></section>;
}
