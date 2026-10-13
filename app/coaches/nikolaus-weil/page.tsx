import EthosCoachPage from '../../ethos/EthosCoachPage';
import { coaches, coachMetadata } from '../../ethos/EthosCoaches';
const coach = coaches.find(c => c.slug === 'nikolaus-weil')!;
export const metadata = coachMetadata(coach);
export default function Page() { return <EthosCoachPage coach={coach} />; }
