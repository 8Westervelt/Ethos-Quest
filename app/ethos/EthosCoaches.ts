export const coaches = [
 {
  slug:'severine-jourdain', name:'Séverine Jourdain', role:'Executive & Leadership Coach', credential:'MCC · International Coaching Federation',
  headline:'Depth of experience. An organizational perspective.',
  summary:'More than two decades supporting senior leaders, leadership teams, and organizations.',
  focus:['Executive leadership','Leadership teams','Organizational development'],
  bio:['Séverine brings more than 20 years of executive leadership and business coaching experience to her work with C-suite leaders, teams, and organizations. Her practice spans the individual leader and the wider system in which they operate.', 'An ICF Master Certified Coach, she is also co-director of the IMD Executive Coaching Certificate. Her background brings together senior coaching practice and the development of other executive coaches.'],
  qualifications:[['Master Certified Coach (MCC)','International Coaching Federation'],['Co-director','IMD Executive Coaching Certificate']],
  sources:[['IMD professional profile','https://www.imd.org/ibyimd/iauthors/severine-jourdain/']],
  photoSource:'https://www.imd.org/wp-content/uploads/2023/10/20230109-SeverineJourdain-590x640x2-comp.jpg',
 },
 {
  slug:'andrea-milwidsky', name:'Andrea Milwidsky', role:'Integral Coach', credential:'MA · Licensed Marriage & Family Therapist',
  headline:'A thoughtful space for personal growth.',
  summary:'A collaborative approach shaped by integral coaching, education, and a background in psychotherapy.',
  focus:['Personal growth','Self-compassion','Life transitions'],
  bio:['Andrea is an integral coach whose work focuses on personal growth, integration, and self-acceptance. She works collaboratively with clients to define goals and explore patterns that shape their lives.', 'Her professional background includes teaching, directing an early childhood center, and working with individuals, couples, families, and teams. She also holds a California Marriage and Family Therapist license. Her clinical background is part of her experience; coaching through EthosQuest remains distinct from psychotherapy.'],
  qualifications:[['MA in Marital and Family Therapy','Phillips Graduate Institute'],['Licensed Marriage and Family Therapist','California · License 126323'],['Professional membership','International Coaching Federation']],
  sources:[['Coaching background','https://ifilovedmyself.com/find-a-practitioner/'],['Education & professional license','https://www.psychologytoday.com/us/therapists/andrea-milwidsky-beverly-hills-ca/897786']],
  photoSource:'https://photos.psychologytoday.com/533b1b10-9104-4bae-a669-03a8e61dbf9a/2/320x400.jpeg',
 },
 {
  slug:'bassel-hamwi', name:'Bassel Hamwi', role:'Executive Coach & Business Advisor', credential:'ACC · MBA · Executive Coaching',
  headline:'Perspective earned in the decisions that matter.',
  summary:'Three decades of experience across banking, private equity, board leadership, and business building.',
  focus:['Senior leadership','Board governance','Family business'],
  bio:['Bassel brings a financial markets and operating leadership perspective to executive coaching. His career spans banking, investment, and private equity, with a particular interest in governance, family business, and supporting senior leaders.', 'He founded and led Bank Audi Syria from 2005 to 2014, headed the IFC MENA Fund from 2014 to 2022, and served on the YPO Global Board from 2018 to 2022. These experiences inform his understanding of organizational responsibility and leadership under pressure.'],
  qualifications:[['Associate Certified Coach (ACC)','International Coaching Federation'],['Advanced Certified Personal and Executive Coach','College of Executive Coaching · ICF Level 2/ACTP'],['MBA in International Finance','University of North Texas'],['BBA in Business Computer Information Systems and Organizational Management','University of North Texas'],['Business school alumnus','Harvard Business School']],
  sources:[['Professional background & education','https://hamwiconsult.com/about/'],['Coaching credentials','https://www.linkedin.com/in/basselhamwi']],
  photoSource:'https://www.ethosquest.com/media/coaches/bassel-hamwi.jpg',
 },
 {
  slug:'nikolaus-weil', name:'Nikolaus Weil', role:'Leadership Coach & Facilitator', credential:'CPCC · Trauma-Informed Coach',
  headline:'The power of choice.',
  summary:'Three decades of entrepreneurial leadership across media, finance, and executive education, brought to trauma-informed coaching.',
  focus:['Founders & entrepreneurs','Leadership & team development','Trauma-informed leadership'],
  bio:['Nikolaus brings more than three decades of entrepreneurial leadership across media, digital technology, and executive education to his coaching. Trained in law at the University of Munich, he founded a boutique film financing business, served as an executive producer on productions including Planet Earth and Deep Blue, and later co-founded a fund management company in telecommunications infrastructure.', 'He founded YPO’s Berlin chapter, co-owned and led Singularity University Germany, and has invested as an angel in media, health, education, and technology. His coaching centers on awareness, resourcing, and alignment: understanding the patterns behind how leaders decide, so they can choose their response rather than react to it.'],
  qualifications:[['Certified Professional Co-Active Coach (CPCC)','Co-Active Training Institute · ICF standards'],['Trauma-Informed Coach & Consultant','Thomas Hübel · Mobius'],['NLP Practitioner','Neuro-Linguistic Programming'],['Law degree','University of Munich']],
  sources:[['Professional background & coaching','https://www.nikolausweil.com/about'],['Experience','https://www.linkedin.com/in/nikolaus-weil-cpcc-85471623/']],
  photoSource:'https://www.ethosquest.com/media/coaches/nikolaus-weil.jpg',
 },
];
export type EthosCoach = typeof coaches[number];
export const coachPortrait = (coach: EthosCoach) => '/media/coaches/' + coach.slug + '.jpg';
export function coachMetadata(coach: EthosCoach) {
 const title = coach.name + ' | EthosQuest';
 return { title, description:coach.summary, openGraph:{title,description:coach.summary,images:[{url:coach.photoSource,alt:coach.name}]},twitter:{card:'summary_large_image' as const,title,description:coach.summary,images:[coach.photoSource]} };
}
