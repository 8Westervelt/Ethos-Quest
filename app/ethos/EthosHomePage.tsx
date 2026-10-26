'use client';
import { withBase, photoSrc } from './EthosPath';
import { ArrowUpRight } from 'lucide-react';
import EthosHero from './EthosHero';
import EthosLeadershipStage from './EthosLeadershipStage';
import { EthosManifesto, EthosLens, EthosArc, EthosCapacity, EthosPatterns, EthosChange } from './EthosMethodSections';
import { usePhotoOption } from './EthosPhotoPicker';
import EthosFooter from './EthosFooter';
const panels = [{slot:'panelMethod' as const, label:'The Methodology', title:'Alignment,',second:'Not Performance.',href:'/approach',cta:'Read the Methodology'},{slot:'panelInquiry' as const, label:'Private Inquiry',title:'Request a',second:'Discovery Call',href:'/private-inquiry',cta:'Begin a Private Inquiry'}];
// Each panel is a full link, so the photo arrows sit beside it rather than inside it.
function EthosPanel({ item }: { item: typeof panels[number] }) {
 const { photo, picker } = usePhotoOption(item.slot);
 return <div className="relative">{picker}<a href={withBase(item.href)} className="group relative isolate flex min-h-[480px] items-end overflow-hidden p-8 text-[#F7F4EE] md:min-h-[560px] md:p-12 lg:p-16"><img {...photoSrc(photo.src, '(min-width: 768px) 50vw, 100vw')} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105 group-focus-visible:scale-105" /><div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(18,26,36,0.05),rgba(18,26,36,0.78))]" /><div><p className="font-accent text-[12px] uppercase tracking-[0.26em] text-[#E4A3AE]">{item.label}</p><h2 className="font-accent mt-5 text-[34px] leading-[1.1] lg:text-[44px]">{item.title}<br /><span className="text-[#F7F4EE]/75">{item.second}</span></h2><span className="mt-8 inline-flex items-center gap-6 border-b border-[#F7F4EE]/60 pb-3 text-[14px]">{item.cta}<ArrowUpRight size={18} /></span></div></a></div>;
}
export default function EthosHomePage() { return <><main id="main-content"><EthosHero />
 <EthosManifesto />
 <EthosLens />
 <EthosLeadershipStage />
 <EthosArc />
 <EthosCapacity />
 <EthosPatterns />
 <EthosChange />
 <section className="grid md:grid-cols-2">{panels.map(item => <EthosPanel key={item.href} item={item} />)}</section>
 </main><EthosFooter /></>; }
