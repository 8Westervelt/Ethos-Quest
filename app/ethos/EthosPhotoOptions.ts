// Photo candidates for Samuel to choose between, three per slot. The slot shows arrows while it has more than one;
// trim a slot to its pick to remove them. Sources are listed in MEDIA-CREDITS.md.
export type EthosPhoto = { label: string; src: string; alt: string };

const o = (label: string, file: string, alt: string): EthosPhoto => ({ label, src: '/media/options/' + file + '.jpg', alt });

export const ethosPhotoOptions = {
 // Home: The Lens (portrait). "Are you living the life you think you are living?"
 lens: [
  o('Converging lines', 'lens-oculus', 'The white ribs of the Oculus converging overhead'),
  o('One World Trade through the trees', 'lens-wtc-trees', 'One World Trade Center framed by green trees on a sunny day'),
  o('Looking up', 'lens-glass-towers', 'Looking up glass towers into bright clouds'),
 ],
 // For Leaders page: The Lens, different photos from the home page.
 ceoLens: [
  o('Wall Street', 'ceo-lens-wall-street', 'A man in a suit on Wall Street beside the Stock Exchange flags'),
  o('Fifth Avenue', 'ceo-lens-fifth-ave', 'A smiling man in a suit by the Fifth Avenue street sign'),
  o('Bryant Park', 'ceo-lens-bryant-park', 'A man in a suit by the Bryant Park subway entrance under green trees'),
 ],
 // About page hero: a thinking partner worthy of the moment.
 aboutHero: [
  o('Near Hudson Yards', 'about-hero-hudson-yards', 'A man and a woman in conversation near Hudson Yards'),
  o('At the subway entrance', 'about-hero-subway', 'Two colleagues talking at a New York subway entrance'),
 ],
 // Who We Serve landing page heroes, keyed by profile slug (see EthosAudiences.ts).
 'founder-ceos': [
  o('Park Avenue in bloom', 'founders-park-ave-blossoms', 'Park Avenue in spring, cherry blossoms lining the street in the sun'),
  o('Park Ave and 53rd', 'founders-park-ave-53rd', 'People crossing Park Avenue at East 53rd Street'),
 ],
 'private-equity-ceos': [
  o('Wall Street', 'pe-wall-street', 'Two professionals talking outside the New York Stock Exchange'),
  o('Midtown from above', 'pe-midtown-skyline', 'The Midtown Manhattan skyline from high up on a clear day'),
  o('Lower Manhattan', 'pe-lower-manhattan', 'The Lower Manhattan skyline under a blue sky'),
 ],
 'family-enterprise-leaders': [
  o('The San Remo over Central Park', 'family-san-remo', 'The twin towers of the San Remo rising above Central Park under a bright sky'),
  o('Gramercy Park', 'family-gramercy-park', 'Elegant townhouses on Gramercy Park South in summer sun'),
  o('The family home', 'family-brownstone-door', 'The arched double doors and stoop of a classic New York brownstone'),
 ],
 'entrepreneurs-and-investors': [
  o('Park and skyline', 'investors-park-skyline', 'A sunny park with the New York skyline beyond the trees'),
  o('From a Brooklyn park', 'investors-brooklyn-park', 'Manhattan across the water from a green Brooklyn park'),
 ],
 'public-company-executives': [
  o('The Exchange on a busy day', 'public-nyse-busy-day', 'The New York Stock Exchange on a busy day, flags out and skyscrapers behind'),
  o('On Wall Street', 'public-nyse-wall-street', 'The New York Stock Exchange on Wall Street with people passing'),
  o('The flag', 'public-nyse-flag', 'The Stock Exchange façade draped in a giant American flag'),
  o('The columns', 'public-nyse-columns', 'American flags along the Stock Exchange columns in daylight'),
  o('The screen', 'public-chart-screen', 'A man standing before a large chart display in a dark room'),
  o('The desk', 'public-trading-desk', 'Two men discussing a position at a trading desk'),
 ],
 // Methodology page hero: unmistakably New York.
 methodHero: [
  o('Lower Manhattan', 'method-hero-lower-manhattan', 'Lower Manhattan across the water under a blue sky'),
  o('Brooklyn Bridge from above', 'method-hero-brooklyn-bridge', 'The Brooklyn Bridge and Lower Manhattan from above on a sunny day'),
  o('Stone and blue sky', 'method-hero-stone-building', 'A classic New York stone building against a deep blue sky'),
 ],
 // Home: Who We Serve (background).
 who: [
  o('Boardroom, dark', 'who-boardroom-dark', ''),
  o('Midtown from above', 'who-midtown-above', ''),
  o('Central Park from above', 'who-central-park-above', ''),
 ],
 // For Leaders page hero: the view from the top.
 ceoHero: [
  o('Rooftop terrace', 'ceo-hero-rooftop-terrace', 'A rooftop terrace facing the Midtown skyline on a sunny day'),
  o('Empire State over the rooftops', 'ceo-hero-empire-rooftops', 'The Empire State Building rising over Manhattan rooftops under a blue sky'),
 ],
 // Home: The Core Capacity (dark background).
 capacity: [
  o('Storm over the skyline', 'capacity-storm', ''),
  o('Sun through the clouds', 'capacity-sun-clouds', ''),
  o('Brooklyn Bridge Park at sunset', 'capacity-brooklyn-sunset', ''),
 ],
 // Methodology page: The Core Capacity, different photos from the home page.
 capacityMethod: [
  o('Manhattan from above', 'capacity-method-manhattan-above', ''),
  o('Walking toward the skyline', 'capacity-method-walking-skyline', ''),
 ],
 // Home: The Methodology panel.
 panelMethod: [
  o('Stock Exchange columns', 'panel-method-nyse', ''),
 ],
 // Home: Private Inquiry panel.
 panelInquiry: [
  o('Public Library lion', 'panel-inquiry-library-lion', ''),
  o('Grand Central', 'panel-inquiry-grand-central', ''),
 ],
};
export type EthosPhotoSlot = keyof typeof ethosPhotoOptions;
