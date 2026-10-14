import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import Script from 'next/script';

export const dynamic = 'force-static';

async function getInvitationMarkup() {
  const source = await readFile(join(process.cwd(), 'index.html'), 'utf8');
  const body = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!body) throw new Error('Invitation markup was not found');
  return body[1].replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
}

export default async function InvitationPage() {
  const markup = await getInvitationMarkup();
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: markup }} />
      <Script src="/script.js?v=20261014-13" strategy="afterInteractive" />
    </>
  );
}
