'use client';
import { withBase } from './EthosPath';
import { coaches, coachPortrait } from './EthosCoaches';
import EthosReveal from './EthosReveal';
import EthosFooter from './EthosFooter';
import EthosCta from './EthosCta';
import { EthosEyebrow } from './EthosHeading';
export default function EthosCoachesPage() {
 return <><main id="main-content"><section className="px-6 pb-14 pt-36 md:px-12 md:pt-44 lg:px-20"><EthosReveal className="mx-auto max-w-[1280px]"><EthosEyebrow>Our Coaches</EthosEyebrow><div className="mt-7 grid items-end gap-9 lg:grid-cols-[1.2fr_0.8fr]"><h1 className="font-accent text-[42px] leading-[1.06] md:text-[60px] lg:text-[68px]">Experience.<br /><span className="text-[#9E1B34]">With a human face.</span></h1><p className="max-w-[460px] text-[18px] leading-[1.75] text-[#132040]/75 md:text-[20px]">The quality of the relationship begins with the person across from you. Meet the people, perspectives, and professional backgrounds behind the work.</p></div></EthosReveal></section>
 <section aria-label="Meet our coaches" className="px-6 pb-20 md:px-12 md:pb-28 lg:px-20"><div className="mx-auto grid max-w-[1280px] gap-14 md:grid-cols-2 md:gap-8 lg:gap-12 xl:grid-cols-4">{coaches.map((coach,i)=><EthosReveal key={coach.slug} delay={i*0.08}><a href={withBase('/coaches/'+coach.slug)} className="group block"><div className="relative overflow-hidden bg-[#EEE8DC]"><img src={withBase(coachPortrait(coach))} alt={coach.name} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" /></div><p className="font-accent mt-7 text-[12px] uppercase tracking-[0.2em] text-[#9E1B34]">{coach.role}</p><h2 className="mt-3 text-[30px] leading-[1.15] lg:text-[36px]">{coach.name}</h2><p className="mt-3 text-[15px] leading-[1.7] text-[#132040]/70">{coach.credential}</p><p className="mt-5 text-[17px] leading-[1.75] text-[#132040]/80">{coach.summary}</p><span className="mt-7 inline-block border-b border-[#132040]/40 pb-2 text-[14px]">Meet {coach.name.split(' ')[0]}</span></a></EthosReveal>)}</div></section><EthosCta /></main><EthosFooter /></>;
}
