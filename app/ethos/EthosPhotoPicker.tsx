'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ethosPhotoOptions, type EthosPhotoSlot } from './EthosPhotoOptions';
import { ethosPreview } from './EthosPath';

// Returns the slot's current photo plus arrows to cycle its options (null once a slot is down to one photo,
// and always null outside the preview, so the live site shows each slot's first option).
// Place `picker` inside a positioned parent; `at` sets its corner.
export function usePhotoOption(slot: EthosPhotoSlot, at = 'left-4 top-4') {
 const options = ethosPhotoOptions[slot];
 const [index, setIndex] = useState(0);
 const photo = options[index];
 const step = (by: number) => setIndex(i => (i + by + options.length) % options.length);
 const picker = ethosPreview && options.length > 1 ? <div role="group" aria-label="Photo options" className={'absolute z-10 flex items-center border border-[#F7F4EE]/40 bg-[#132040]/55 text-[10px] uppercase tracking-[0.12em] text-[#F7F4EE] backdrop-blur-md ' + at}><button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="px-2.5 py-2 hover:bg-[#F7F4EE]/15"><ChevronLeft size={14} /></button><span aria-live="polite" className="whitespace-nowrap px-1">Photo {index + 1} of {options.length}: {photo.label}</span><button type="button" onClick={() => step(1)} aria-label="Next photo" className="px-2.5 py-2 hover:bg-[#F7F4EE]/15"><ChevronRight size={14} /></button></div> : null;
 return { photo, picker };
}
