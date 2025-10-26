import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';
import { auth } from './auth';

export async function requireAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect('/sign-in');
  }

  return session;
}

export async function requireUnauth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect('/');
  }
}
