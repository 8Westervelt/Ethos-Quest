'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Mail, X } from 'lucide-react';
import { photoSrc } from './EthosPath';
import EthosReveal from './EthosReveal';
import EthosFooter from './EthosFooter';
import EthosCta from './EthosCta';
import { EthosEyebrow } from './EthosHeading';
import { ethosBody } from './EthosSections';
import { ethosEase } from './EthosHero';
import { teamLeadership, teamAdvisors, teamInitials, type EthosTeamMember } from './EthosTeam';

// The headshot, or a monogram tile until a photo is supplied.
function Portrait({ member, large = false }: { member: EthosTeamMember; large?: boolean }) {
 return <motion.div layoutId={'team-photo-' + member.slug} className="relative aspect-[4/5] w-full overflow-hidden bg-[#132040]">
  {member.photo
   ? <img {...photoSrc(member.photo, '(min-width: 768px) 40vw, 100vw')} alt={member.name} className={'h-full w-full object-cover transition duration-700 ' + (large ? '' : 'group-hover:scale-[1.03]')} />
   : <div aria-hidden="true" className="absolute inset-0 flex flex-col items-center justify-center">
      <span className="absolute inset-4 border border-[#F7F4EE]/15" />
      <span className={'font-accent text-[#F7F4EE]/80 ' + (large ? 'text-[88px]' : 'text-[60px]')}>{teamInitials(member)}</span>
      <span className="font-accent mt-4 text-[11px] uppercase tracking-[0.26em] text-[#F7F4EE]/45">Portrait to come</span>
     </div>}
 </motion.div>;
}

// A card on the page. The whole card opens the profile: the name is a button stretched over the card.
function TeamCard({ member, onOpen }: { member: EthosTeamMember; onOpen: (member: EthosTeamMember, from: HTMLButtonElement) => void }) {
 return <motion.article layoutId={'team-card-' + member.slug} className="group relative flex h-full flex-col">
  <Portrait member={member} />
  <div className="flex flex-1 flex-col border-b border-[#132040]/15 pb-6 pt-6">
   <p className="font-accent text-[12px] uppercase tracking-[0.2em] text-[#9E1B34]">{member.title}</p>
   <h3 className="mt-3 text-[26px] leading-[1.2] lg:text-[28px]"><button type="button" onClick={event => onOpen(member, event.currentTarget)} aria-haspopup="dialog" className="bg-transparent p-0 text-left text-inherit outline-none after:absolute after:inset-0 after:content-[''] focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-[#9E1B34]">{member.name}</button></h3>
   {member.affiliation && <p className="mt-2 text-[15px] leading-[1.5] text-[#132040]/65">{member.affiliation}</p>}
   <span aria-hidden="true" className="mt-auto flex items-center gap-2 pt-6 text-[13px] uppercase tracking-[0.16em] text-[#132040]/70 transition-colors group-hover:text-[#9E1B34]">View profile<ArrowRight size={16} strokeWidth={1.4} className="transition-transform duration-300 group-hover:translate-x-1" /></span>
  </div>
 </motion.article>;
}

// The full-screen profile: bio, LinkedIn and EthosQuest email.
function TeamProfile({ member, onClose }: { member: EthosTeamMember; onClose: () => void }) {
 const close = useRef<HTMLButtonElement>(null);
 useEffect(() => {
  close.current?.focus();
  const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
  const overflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  window.addEventListener('keydown', onKey);
  return () => { document.body.style.overflow = overflow; window.removeEventListener('keydown', onKey); };
 }, [onClose]);
 const contacts: [React.ReactNode, string, string][] = [];
 if (member.linkedin) contacts.push([<ArrowUpRight key="i" aria-hidden="true" size={18} strokeWidth={1.4} />, 'LinkedIn profile', member.linkedin]);
 if (member.email) contacts.push([<Mail key="i" aria-hidden="true" size={18} strokeWidth={1.4} />, member.email, 'mailto:' + member.email]);
 return <motion.div role="dialog" aria-modal="true" aria-labelledby={'team-name-' + member.slug} layoutId={'team-card-' + member.slug} transition={{ duration: 0.55, ease: ethosEase }} className="fixed inset-0 z-50 overflow-y-auto bg-[#F7F4EE]">
  <button ref={close} type="button" onClick={onClose} aria-label={'Close ' + member.name + '’s profile'} className="fixed right-5 top-5 z-10 flex h-12 w-12 items-center justify-center bg-[#132040] text-[#F7F4EE] transition-colors hover:bg-[#9E1B34] md:right-8 md:top-8"><X aria-hidden="true" size={22} strokeWidth={1.4} /></button>
  <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-24 md:px-[48px] lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:py-28 min-[1440px]:px-[64px]">
   <div className="max-w-[440px] lg:sticky lg:top-28 lg:self-start"><Portrait member={member} large /></div>
   <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5, ease: ethosEase }}>
    <p className="font-accent text-[12px] uppercase tracking-[0.26em] text-[#9E1B34]">{member.title}</p>
    <h2 id={'team-name-' + member.slug} className="font-accent mt-5 text-[40px] leading-[1.08] md:text-[54px]">{member.name}</h2>{member.affiliation && <p className="mt-4 text-[18px] text-[#132040]/70">{member.affiliation}</p>}
    <div className="my-9 h-px w-12 bg-[#9E1B34]" />
    {member.bio.length
     ? <div className="max-w-[640px] space-y-6">{member.bio.map(paragraph => <p key={paragraph} className={ethosBody}>{paragraph}</p>)}</div>
     : <p className={ethosBody + ' italic'}>Bio to come.</p>}
    <div className="mt-12 border-t border-[#132040]/12 pt-8">
     <p className="font-accent text-[12px] uppercase tracking-[0.22em] text-[#132040]/60">Contact</p>
     {contacts.length
      ? <ul className="mt-5 space-y-4">{contacts.map(([icon, label, href]) => <li key={href}><a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="inline-flex items-center gap-3 border-b border-[#132040]/30 pb-1 text-[16px] transition-colors hover:border-[#9E1B34] hover:text-[#9E1B34]">{label}{icon}</a></li>)}</ul>
      : <p className="mt-5 text-[15px] text-[#132040]/60">Contact details to come.</p>}
    </div>
   </motion.div>
  </div>
 </motion.div>;
}

function TeamGroup({ label, title, members, columns, onOpen }: { label: string; title: string; members: EthosTeamMember[]; columns: string; onOpen: (member: EthosTeamMember, from: HTMLButtonElement) => void }) {
 return <>
  <EthosReveal><EthosEyebrow>{label}</EthosEyebrow><h2 className="font-accent mt-6 text-[32px] leading-[1.1] md:text-[42px]">{title}</h2></EthosReveal>
  <ul className={'mt-12 grid gap-12 sm:grid-cols-2 md:gap-8 lg:gap-10 ' + columns}>{members.map((member, i) => <li key={member.slug}><EthosReveal delay={i * 0.06} className="h-full"><TeamCard member={member} onOpen={onOpen} /></EthosReveal></li>)}</ul>
 </>;
}

export default function EthosTeamPage() {
 const [open, setOpen] = useState<EthosTeamMember | null>(null);
 const opener = useRef<HTMLButtonElement | null>(null);
 const show = (member: EthosTeamMember, from: HTMLButtonElement) => { opener.current = from; setOpen(member); };
 const hide = useCallback(() => { setOpen(null); requestAnimationFrame(() => opener.current?.focus()); }, []);
 return <MotionConfig reducedMotion="user"><main id="main-content">
  <section className="px-6 pb-20 pt-36 md:px-12 md:pb-28 md:pt-44 lg:px-20"><EthosReveal className="mx-auto max-w-[1280px]"><EthosEyebrow>Our Team</EthosEyebrow><div className="mt-7 grid items-end gap-9 lg:grid-cols-[1.2fr_0.8fr]"><h1 className="font-accent text-[42px] leading-[1.06] md:text-[60px] lg:text-[68px]">The people<br /><span className="text-[#9E1B34]">behind the work.</span></h1><p className="max-w-[460px] text-[18px] leading-[1.75] text-[#132040]/75 md:text-[20px]">EthosQuest is led by people who have carried consequential decisions themselves, and guided by advisors who bring experience from across business and leadership.</p></div></EthosReveal></section>
  <section aria-label="Leadership" className="px-6 pb-20 md:px-12 md:pb-28 lg:px-20"><div className="mx-auto max-w-[1280px] border-t border-[#132040]/12 pt-16 md:pt-20"><TeamGroup label="Leadership" title="Leading EthosQuest." members={teamLeadership} columns="lg:grid-cols-3" onOpen={show} /></div></section>
  <section aria-label="Board and Advisors" className="ethos-sand px-6 py-20 md:px-12 md:py-28 lg:px-20"><div className="mx-auto max-w-[1280px]"><TeamGroup label="Board & Advisors" title="Counsel and perspective." members={teamAdvisors} columns="lg:grid-cols-4" onOpen={show} /></div></section>
  <EthosCta />
 </main><EthosFooter />
 <AnimatePresence>{open && <TeamProfile key={open.slug} member={open} onClose={hide} />}</AnimatePresence>
 </MotionConfig>;
}
