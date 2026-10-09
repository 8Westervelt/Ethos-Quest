// Hyphenated words ("Equity-Backed") never split across lines in headings.
// Only those words are wrapped; the rest of the text stays a single string.
export const noBreakHyphens = (text: string) => text.split(/(\S+-\S+)/).map((part, i) => i % 2 ? <span key={i} className="whitespace-nowrap">{part}</span> : part);
