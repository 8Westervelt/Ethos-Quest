import EthosAudiencePage from '../../ethos/EthosAudiencePage';
import { ethosAudiences, audienceMetadata } from '../../ethos/EthosAudiences';
const audience = ethosAudiences.find(a => a.slug === 'family-enterprise-leaders')!;
export const metadata = audienceMetadata(audience);
export default function Page() { return <EthosAudiencePage audience={audience} />; }
