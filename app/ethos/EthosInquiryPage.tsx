'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import EthosFooter, { ethosMail } from './EthosFooter';
import EthosButton from './EthosButton';
import { EthosEyebrow } from './EthosHeading';
import { ethosBody } from './EthosSections';
import { entrance } from './EthosHero';
import { coaches, type EthosCoach } from './EthosCoaches';
import { ethosPreview } from './EthosPath';

// The live site posts to the existing EthosQuest endpoint, POST /api/inquiries, with the same JSON body as the
// previous site's form: { first_name, last_name, email, role, source, message, turnstile_token }. It answers
// 201 { ok: true, requestId } on success, or { error: 'verification_failed' | 'invalid_request' | ... }.
// The Turnstile site key is the one already used on ethosquest.com. Preview builds do not send anything.
const turnstileSiteKey = '0x4AAAAAAEFYtQqpI_IkI1Cy';
const messageLimit = 1000;
const sources: [string, string][] = [['', 'Prefer not to say'], ['referral', 'Personal referral'], ['partner', 'Professional network or partner'], ['event', 'Event or gathering'], ['website', 'Search or online'], ['other', 'Other']];
type InquiryReply = { ok?: boolean; error?: string; requestId?: string };
type Turnstile = { render: (el: HTMLElement, options: Record<string, unknown>) => string; reset: (id: string) => void };
const turnstileApi = () => (window as unknown as { turnstile?: Turnstile }).turnstile;
const errorMessages: Record<string, string> = {
 invalid_request: 'There was a problem with your submission. Please review the fields and try again.',
 verification_failed: 'We could not verify your submission. Please complete the verification again.',
 rate_limited: 'You have made too many attempts. Please wait a moment and try again, or write to us directly.',
 server: 'Something went wrong on our end. Please try again shortly, or write to us directly.',
 network: 'We could not reach our server. Please check your connection and try again, or write to us directly.',
 token: 'Please complete the verification before submitting.',
};
const fieldClass = 'ethos-input w-full min-w-0 border-0 border-b border-[#132040]/30 bg-transparent py-3 text-[17px] text-[#132040] outline-none focus:border-[#9E1B34]';
const labelClass = 'font-accent pointer-events-none absolute top-3 left-0 text-[12px] uppercase tracking-[0.22em] text-[#132040]/60 transition-all duration-300';
function Field({ name, label, type = 'text', autoComplete }: { name: string; label: string; type?: string; autoComplete?: string }) { return <div className="relative mt-4"><input id={name} name={name} type={type} autoComplete={autoComplete} required placeholder=" " className={fieldClass} /><label htmlFor={name} className={labelClass}>{label}</label></div>; }
export default function EthosInquiryPage() {
 const [submitted, setSubmitted] = useState(false);
 const [sending, setSending] = useState(false);
 const [error, setError] = useState<string | null>(null);
 const [token, setToken] = useState<string | null>(null);
 const success = useRef<HTMLDivElement>(null);
 const widget = useRef<HTMLDivElement>(null);
 const widgetId = useRef<string | null>(null);
 const [coach, setCoach] = useState<EthosCoach | null>(null);
 useEffect(() => { const slug = new URLSearchParams(window.location.search).get('coach'); setCoach(coaches.find(c => c.slug === slug) ?? null); }, []);
 const first = coach?.name.split(' ')[0];
 useEffect(() => { if (submitted) success.current?.focus(); }, [submitted]);
 // Turnstile, rendered explicitly once its script has loaded (live site only).
 useEffect(() => {
  if (ethosPreview) return;
  const render = () => {
   const turnstile = turnstileApi();
   if (!turnstile || !widget.current || widgetId.current) return;
   widgetId.current = turnstile.render(widget.current, { sitekey: turnstileSiteKey, theme: 'light', callback: (t: string) => setToken(t), 'expired-callback': () => setToken(null), 'error-callback': () => setToken(null) });
  };
  if (turnstileApi()) return render();
  const script = document.createElement('script');
  script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
  script.async = true;
  script.onload = render;
  document.head.appendChild(script);
 }, []);
 const resetTurnstile = () => { const turnstile = turnstileApi(); if (turnstile && widgetId.current) turnstile.reset(widgetId.current); setToken(null); };
 async function submit(form: HTMLFormElement) {
  if (ethosPreview) { setSubmitted(true); return; }
  if (sending) return;
  if (!token) { setError(errorMessages.token); return; }
  const data = new FormData(form);
  const value = (name: string) => String(data.get(name) ?? '').trim();
  // The endpoint takes no coach field, so a coach-specific inquiry names the coach at the top of the message.
  const message = (coach ? 'Requested coach: ' + coach.name + '\n\n' : '') + value('message');
  setSending(true);
  setError(null);
  let status = 0;
  let body: InquiryReply | null = null;
  try {
   const response = await fetch('/api/inquiries', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ first_name: value('first-name'), last_name: value('last-name'), email: value('email'), role: value('current-role'), source: value('referral'), message: message.trim().slice(0, messageLimit), turnstile_token: token }) });
   status = response.status;
   body = await response.json().catch(() => null) as InquiryReply | null;
  } catch { status = -1; }
  setSending(false);
  if (status === 201 && body?.ok) { setSubmitted(true); return; }
  resetTurnstile();
  const kind = status === -1 ? 'network' : status === 429 ? 'rate_limited' : body?.error === 'invalid_request' || body?.error === 'verification_failed' ? body.error : 'server';
  setError(errorMessages[kind] + (body?.requestId ? ' (Reference: ' + body.requestId + ')' : ''));
 }
 // The form sits beside the introduction (right column on wide screens) rather than below it.
 return <><main id="main-content"><section className="px-6 pt-36 pb-20 md:px-[48px] md:pt-44 md:pb-24 min-[1440px]:px-[64px]"><div className="mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-14 lg:grid-cols-[6fr_5fr] lg:gap-20">
  <div><motion.div {...entrance(0.15)}><EthosEyebrow>Private Inquiry</EthosEyebrow></motion.div><motion.h1 {...entrance(0.3)} className="font-accent mt-7 text-[40px] leading-[1.06] md:text-[52px] lg:text-[58px]">{coach ? 'A Discovery Call with ' + first : 'Request a Discovery Call'}</motion.h1><motion.div {...entrance(0.45)}><p className="mt-8 text-[18px] leading-[1.7] text-[#132040]/75 md:text-[20px]">The discovery call is not a sales conversation. It is the first act of the methodology. If you lead an organization and this work may be relevant to where you are, we would like to hear from you.</p><div className="my-10 h-px w-12 bg-[#9E1B34]" /><p className={ethosBody}>{coach ? <>This inquiry goes directly to {coach.name}, who will read it and reply personally. You will receive</> : <>Every inquiry is read and answered personally by a coach. You will receive</>} a direct, human response, not an automated acknowledgement. Confidentiality begins here, before any engagement does.</p><p className={ethosBody + ' mt-6'}>Share a few details in the form, or write to us directly. {coach ? first + ' will review your inquiry and contact you personally to arrange the call.' : 'A coach will review your inquiry and contact you personally to arrange the call.'}</p><a href={ethosMail} className="ethos-underline font-accent mt-8 inline-block max-w-full break-all text-[22px] md:text-[26px]">hello@ethosquest.com</a></motion.div></div>
  <motion.div {...entrance(0.35)} className="ethos-sand min-w-0 p-6 sm:p-8 md:p-10"><AnimatePresence mode="wait">{submitted ? <motion.div key="received" ref={success} tabIndex={-1} role="status" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center"><div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-[#9E1B34] text-[#9E1B34]"><Check size={28} strokeWidth={1.2} /></div><EthosEyebrow>Received</EthosEyebrow><h2 className="font-accent mt-6 text-[30px] leading-[1.2] md:text-[38px]">Your Inquiry Has Been Received</h2><p className={ethosBody + ' mt-6'}>Thank you. {coach ? first + ' will' : 'A coach will'} be in touch personally to arrange your discovery call.</p></motion.div> : <motion.form key="inquiry" initial={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={event => { event.preventDefault(); submit(event.currentTarget); }} className="space-y-8">{coach && <input type="hidden" name="coach" value={coach.slug} />}<div className="grid gap-8 sm:grid-cols-2"><Field name="first-name" label="First Name" autoComplete="given-name" /><Field name="last-name" label="Last Name" autoComplete="family-name" /></div><Field name="current-role" label="Current Role" autoComplete="organization-title" /><Field name="email" label="Email Address" type="email" autoComplete="email" /><div><label htmlFor="referral" className="font-accent block text-[11px] uppercase tracking-[0.25em] text-[#132040]/60">How did you hear about us? <span className="tracking-normal">(optional)</span></label><div className="relative mt-2"><select id="referral" name="referral" defaultValue="" className={fieldClass + ' appearance-none pr-7'}>{sources.map(([value, label]) => <option key={value} value={value} className="bg-[#F7F4EE]">{label}</option>)}</select><ChevronDown aria-hidden="true" size={16} className="pointer-events-none absolute top-4 right-0 text-[#9E1B34]" /></div></div><div><label htmlFor="message" className="font-accent block text-[11px] uppercase tracking-[0.25em] text-[#132040]/60">What brings you here? <span className="tracking-normal">(optional)</span></label><textarea id="message" name="message" rows={4} maxLength={messageLimit - (coach ? 40 : 0)} className={fieldClass + ' mt-2 resize-y'} /></div>{!ethosPreview && <div ref={widget} className="min-h-[65px]" />}{error && <p role="alert" className="text-[15px] leading-[1.6] text-[#9E1B34]">{error} <a href={ethosMail} className="underline">Email hello@ethosquest.com</a></p>}<EthosButton type="submit" className={'w-full max-sm:text-[11px] sm:text-[13px]' + (sending ? ' pointer-events-none opacity-60' : '')}>{sending ? 'Sending…' : 'Request a Discovery Call'}</EthosButton><p className="text-[12px] font-light leading-[1.6] text-[#132040]/60/60">Your information is read by {coach ? coach.name : 'a coach'} and by no one else.</p></motion.form>}</AnimatePresence></motion.div>
 </div></section></main><EthosFooter /></>;
}
