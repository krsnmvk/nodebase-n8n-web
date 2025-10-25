import { Button } from '@/components/ui/button';
import db from '@/lib/db';

export default async function Home() {
  const users = await db.user.findMany();

  return (
    <div className="min-h-screen w-screen flex flex-col gap-4 items-center justify-center">
      <div>Home Page</div>
      <Button type="button" variant="default" size="lg">
        Click Me
      </Button>
      <div>{JSON.stringify(users, null, 2)}</div>
    </div>
  );
}
