export const ethosMedia = {
 heroFilm: '/media/dawn.mp4',
 heroPoster: '/media/dawn-poster.jpg',
 notebook: '/media/ethos-notebook.jpg',
 atrium: '/media/atrium.jpg',
 facade: '/media/facade.jpg',
 windowFigure: '/media/window-figure.jpg',
 conversation: '/media/conversation.jpg',
 windowsOffice: '/media/windows-office.jpg',
 readingRoom: '/media/reading-room.jpg',
 study: '/media/study.jpg',
 tower: '/media/tower.jpg',
};

// Financial District hero candidates for Samuel to choose between (ETHOS-3), shortlisted by the team.
// The hero shows arrows while there is more than one; trim to the pick to remove them.
// `focus` is an optional CSS object-position; the hero anchors to the top when it is omitted.
// `original` uses the first framing (centered, running under the banner).
type EthosHeroOption = { label: string; film: string; poster: string; focus?: string; original?: boolean };
export const ethosHeroOptions: EthosHeroOption[] = [
 { label: 'Golden hour', film: '/media/hero/fidi-golden-hour.mp4', poster: '/media/hero/fidi-golden-hour-poster.jpg' },
 { label: 'Among the towers', film: '/media/hero/fidi-towers.mp4', poster: '/media/hero/fidi-towers-poster.jpg' },
 { label: 'Downtown towers', film: '/media/hero/fidi-towers-daylight.mp4', poster: '/media/hero/fidi-towers-daylight-poster.jpg' },
 { label: 'Summer harbor', film: '/media/hero/fidi-summer-harbor.mp4', poster: '/media/hero/fidi-summer-harbor-poster.jpg', focus: 'center 35%' },
 { label: 'One World Trade (original framing)', film: '/media/hero/fidi-one-wtc.mp4', poster: '/media/hero/fidi-one-wtc-poster.jpg', original: true },
];
