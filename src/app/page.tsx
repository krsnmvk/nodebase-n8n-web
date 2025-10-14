import prisma from '@/lib/prisma';

export default async function Home() {
  const users = await prisma.user.findFirst();

  return (
    <div className="h-screen flex items-center justify-center">
      {JSON.stringify(users)}
    </div>
  );
}
