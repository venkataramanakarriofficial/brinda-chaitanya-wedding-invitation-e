import Invitation from './invitation';
import InvitationController from './invitation-controller';

export const dynamic = 'force-static';

export default function InvitationPage() {
  return (
    <>
      <Invitation />
      <InvitationController />
    </>
  );
}
