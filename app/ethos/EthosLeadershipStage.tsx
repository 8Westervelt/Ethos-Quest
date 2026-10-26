'use client';
import { withBase, photoSrc } from './EthosPath';
import { ArrowUpRight } from 'lucide-react';
import EthosReveal from './EthosReveal';
import { ethosAudiences, audiencePath } from './EthosAudiences';
import { usePhotoOption } from './EthosPhotoPicker';
import { noBreakHyphens } from './EthosNoBreak';
// Who We Serve: one clickable card per profile, each opening its own landing page (ETHOS-9).
// Five cards sit as two wide on top and three below; a lone last card on two-column screens spans the row.
const cardSpan = (i: number, total: number) => (i < 2 ? "lg:col-span-3" : "lg:col-span-2") + (total % 2 === 1 && i === total - 1 ? " sm:col-span-2 lg:col-span-2" : "");
export default function EthosLeadershipStage() {
 const { photo, picker } = usePhotoOption('who', 'right-4 top-4 md:right-8 md:top-8');
 return <section aria-labelledby="leadership-title" className="relative isolate overflow-hidden px-6 py-20 md:px-12 md:py-28 lg:px-20">
  {picker}<img {...photoSrc(photo.src)} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover saturate-[0.85]" aria-hidden="true" />
  <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(247,244,238,0.96)_0%,rgba(247,244,238,0.9)_45%,rgba(247,244,238,0.45)_100%)]" />
  <div className="mx-auto max-w-[1280px]">
   <div className="max-w-[640px]"><p className="font-accent text-[12px] uppercase tracking-[0.26em] text-[#9E1B34]">Who We Serve</p><h2 id="leadership-title" className="font-accent mt-5 text-[34px] leading-[1.1] md:text-[46px] lg:text-[54px]">Built for leaders.<br />Whatever the chapter.</h2><p className="mt-6 max-w-[440px] text-[17px] leading-[1.7] text-[#132040]/75">Choose the seat you sit in to see how the work applies.</p></div>
   <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">{ethosAudiences.map((audience, i) => <li key={audience.slug} className={"h-full " + cardSpan(i, ethosAudiences.length)}><EthosReveal delay={i * 0.05} className="h-full"><a href={withBase(audiencePath(audience))} className="group flex h-full flex-col bg-[#F7F4EE]/95 p-7 shadow-[0_30px_80px_-40px_rgba(19,32,64,0.35)] backdrop-blur-sm transition-colors hover:bg-white md:p-8"><p className="font-accent text-[11px] uppercase tracking-[0.22em] text-[#9E1B34]">For</p><h3 className="mt-3 text-[23px] leading-[1.25] md:text-[25px]">{noBreakHyphens(audience.name)}</h3><p className="mt-4 flex-1 text-[15px] leading-[1.7] text-[#132040]/75">{audience.card}</p><span className="mt-6 flex items-center justify-between border-t border-[#132040]/15 pt-4 text-[14px] text-[#132040] transition-colors group-hover:text-[#9E1B34]">Explore<ArrowUpRight size={18} strokeWidth={1.4} /></span></a></EthosReveal></li>)}</ul>
  </div>
 </section>;
}
