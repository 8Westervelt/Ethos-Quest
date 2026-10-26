import { copyWidths, imageWidths } from './EthosImageSizes';
// Prefixes site-relative links and media with the build's basePath (next.config.ts). It is empty for the real
// deployment and set only for previews served from a subfolder, such as GitHub Pages.
const basePath = process.env.__NEXT_ROUTER_BASEPATH ?? '';
export const withBase = (path: string) => (basePath && path.startsWith('/') && !path.startsWith('//') && !path.startsWith(basePath + '/') ? basePath + path : path);
// True on preview builds (served from a subfolder): the photo pickers show and the inquiry form does not send.
export const ethosPreview = basePath !== '';
// A photo's src plus its WebP copies (scripts/make-image-sizes.py), so phones download a phone-sized file.
// The original stays as src for browsers without WebP.
// `sizes` is how wide the photo shows on screen, as in the HTML attribute.
export function photoSrc(src: string, sizes = '100vw') {
 const full = imageWidths[src];
 if (!full) return { src: withBase(src) };
 const copies = [...copyWidths.filter(w => w < full), full].map(w => withBase(src.replace(/\.\w+$/, `-${w}.webp`)) + ` ${w}w`);
 return { src: withBase(src), srcSet: copies.join(', '), sizes };
}
