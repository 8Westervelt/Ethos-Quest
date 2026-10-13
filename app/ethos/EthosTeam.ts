// Our Team page: leadership and advisory board. Each card expands in place to show the full profile.
// Headshots are supplied by the team (dropped into /headshots, processed into /public/media/team/<slug>.jpg).
// Profiles without a photo show their initials; profiles without a bio show "Bio to come".
// Bassel's bio is a condensed version of the About page (EthosBassel.ts).

export type EthosTeamMember = {
 slug: string;
 name: string;
 title: string;
 // Advisors: their principal role elsewhere, shown on the card in place of the repeated "Advisor".
 affiliation?: string;
 photo?: string;
 bio: string[];
 linkedin?: string;
 email?: string;
 phone?: string;
};

export const teamLeadership: EthosTeamMember[] = [
 { slug: 'alexia-crawford', name: 'Alexia Crawford', title: 'CEO', photo: '/media/team/alexia-crawford.jpg', bio: [
  'Alexia is the CEO of EthosQuest, where she leads the firm’s strategy and growth and is building a curated global network of coaches and advisors for CEOs, founders, and family principals at pivotal moments in their leadership and lives.',
  'She brings more than three decades of building and scaling consumer brands. Arriving in the United States from Australia at 20, she went on to found the fashion accessories retailer Laila Rowe and led her own company, Alexia Crawford Inc., for more than thirty years, specializing in fashion accessories, private label, and sourcing.',
  'Alongside EthosQuest, she chairs 8westervelt, a firm that helps businesses put AI to work, advises the wellness brand SANCTUM on its U.S. expansion, and is an active leader in YPO. She studied at New York University.',
 ], linkedin: 'https://www.linkedin.com/in/alexia-crawford-/' },
 { slug: 'bassel-hamwi', name: 'Bassel Hamwi', title: 'Founder & Chairman', photo: '/media/team/bassel-hamwi.jpg', bio: [
  'Bassel has spent more than three decades in banking, private equity, and board leadership across the United States, the Middle East, and South Asia. As founder and CEO of Bank Audi Syria, he grew it from $50 million to $2 billion in assets in five years, making it the country’s largest private lender, and led it through the civil war. He helped launch Syria’s first stock exchange, then headed the IFC MENA Fund, a World Bank Group private equity fund.',
  'Today he chairs Globatech Group and TIGER 21 New York, leads BASY Ventures, and serves on the boards of the Damascus Securities Exchange and Syria Gulf Bank. He previously served on the global board of YPO.',
  'A certified coach with the International Coaching Federation and a member of the Forbes Coaches Council, he coaches senior leaders and advises family businesses and boards, bringing the perspective of someone who has carried the weight of consequential decisions himself.',
 ], linkedin: 'https://www.linkedin.com/in/basselhamwi' },
 { slug: 'paige', name: 'Paige', title: 'Executive', bio: [] },
];

export const teamAdvisors: EthosTeamMember[] = [
 { slug: 'alan-marash', affiliation: 'Partner, JATS Partners', name: 'Alan Marash', title: 'Advisor', photo: '/media/team/alan-marash.jpg', bio: [
  'Alan brings more than thirty years of leadership in professional services and governance. For two decades he was CEO and board chair of Oriel STAT A MATRIX, a family-owned global provider of training, consulting, and regulatory services to medical device manufacturers in more than 50 countries.',
  'He led the company through an acquisition and joint ventures in Japan and the Middle East, then sold it to a London-based private equity firm two years ahead of plan, after 52 years of family ownership.',
  'Today he is a partner at JATS Partners, investing in and advising growth-stage companies, and a strategic advisor to the AI education and certification group IQube. A longtime YPO leader, he serves on its Global Board after chairing the Northeast U.S. regional board, which supports more than 3,200 CEOs. He studied at Fordham University.',
 ], linkedin: 'https://www.linkedin.com/in/amarash/' },
 { slug: 'dan-hoffman', affiliation: 'Founder & CEO, ForumSpace', name: 'Dan Hoffman', title: 'Advisor', photo: '/media/team/dan-hoffman.jpg', bio: [
  'Dan is the founder and CEO of ForumSpace and CircleSpace, which help leaders build trust and learn together in small peer groups, the practice he first experienced in YPO. Clients have included Harvard Business School, the Aspen Institute, YPO, and Salesforce.',
  'He founded and led M5 Networks for eleven years, growing it from a startup into a leading cloud communications company for mid-market businesses before its sale to ShoreTel in 2012. Earlier, he helped build Asia Online across 13 countries.',
  'A Henry Crown Fellow of the Aspen Institute, he has served for nearly two decades on the board of Workshop in Business Opportunities, which helps entrepreneurs in underserved communities build stronger businesses. He studied at Harvard University.',
 ], linkedin: 'https://www.linkedin.com/in/danhoffman3/' },
 { slug: 'andrew-sacks', affiliation: 'CEO, AgencySacks', name: 'Andrew Sacks', title: 'Advisor', photo: '/media/team/andrew-sacks.jpg', bio: [
  'Andrew leads AgencySacks, the New York strategy and creative boutique he has run since 1999, which helps premium and luxury businesses build their brands among an affluent audience.',
  'His work spans brand strategy, positioning, and identity, grounded in the firm’s own research into affluent consumers. He acts as an editor and arbiter for the brands he works with, helping them discover what truly matters to them and carry it through everything from look, story, and voice to the internal organization.',
  'He studied at Tulane University and lives in New York and East Hampton.',
 ], linkedin: 'https://www.linkedin.com/in/andrewsacks/' },
 { slug: 'samer-hamwi', affiliation: 'Founder, GlobaConsult', name: 'Samer Hamwi', title: 'Advisor', photo: '/media/team/samer-hamwi.jpg', bio: [
  'Samer is the founder and managing principal of GlobaConsult, a Dubai-based advisory practice helping organizations across the UAE, the Gulf, and the Levant with AI strategy, digital transformation, venture building, and regulated digital infrastructure.',
  'Over more than 25 years he has built and led technology ventures across financial services, healthtech, and utilities, including Globatech, Globacom Technologies, and the interoperability platform Nexusware, and co-founded the fintech company FINALYTIX. Earlier, he spent eleven years as Group CIO of the Dubai-based investment bank SHUAA Capital.',
  'He serves on the boards of DATANUUM and the non-profit Bareeq Education & Development, co-founded the Syria AI Foundation, and studied at the University of Houston’s C.T. Bauer College of Business.',
 ], linkedin: 'https://www.linkedin.com/in/samhamwi/' },
];

export const teamInitials = (member: EthosTeamMember) => member.name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase();
