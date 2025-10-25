import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen w-screen flex flex-col gap-4 items-center justify-center">
      <div>Home Page</div>
      <Button type="button" variant="default" size="lg">
        Click Me
      </Button>
    </div>
  );
}
