'use client';
import { motion } from 'framer-motion';
import { entrance } from './EthosHero';
import { EthosEyebrow } from './EthosHeading';
import EthosImage from './EthosImage';
import { noBreakHyphens } from './EthosNoBreak';
import { usePhotoOption } from './EthosPhotoPicker';
import type { EthosPhotoSlot } from './EthosPhotoOptions';
// Pass `photoSlot` instead of `image` to show a slot's photo options with arrows to compare them.
export default function EthosPageHero(props: { label: string; lines: string[]; lede: string; image?: string; alt?: string; photoSlot?: EthosPhotoSlot }) {
 const { photo, picker } = usePhotoOption(props.photoSlot ?? 'methodHero');
 const image = props.photoSlot ? photo.src : props.image;
 const alt = props.photoSlot ? photo.alt : props.alt ?? '';
 const { label, lines, lede } = props;
 return <section className="px-6 pt-36 pb-16 md:px-[48px] md:pt-44 md:pb-20 min-[1440px]:px-[64px]"><div className={'mx-auto grid max-w-[1280px] items-end gap-12 ' + (image ? 'lg:grid-cols-[1.15fr_0.85fr] lg:gap-20' : '')}><div><motion.div {...entrance(0.15)}><EthosEyebrow>{label}</EthosEyebrow></motion.div><motion.h1 {...entrance(0.3)} className="font-accent mt-7 max-w-[820px] text-[40px] leading-[1.06] md:text-[56px] lg:text-[68px]">{lines.map((line,i) => <span key={line} className={'block ' + (i === 1 ? 'text-[#9E1B34]' : '')}>{noBreakHyphens(line)}</span>)}</motion.h1><motion.p {...entrance(0.45)} className="mt-8 max-w-[640px] text-[18px] leading-[1.7] text-[#132040]/75 md:text-[20px]">{lede}</motion.p></div>{image && <motion.div {...entrance(0.35)} className="relative"><EthosImage key={image} src={image} alt={alt} eager ratio="aspect-[5/4]" />{props.photoSlot && picker}</motion.div>}</div></section>;
}
