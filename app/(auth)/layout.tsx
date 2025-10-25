import Image from 'next/image';
import Link from 'next/link';

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-dvh flex flex-col justify-center items-center gap-6 p-6 md:p-10 bg-muted">
      <div className="flex flex-col gap-6 w-full max-w-sm">
        <Link
          href="/"
          className="flex items-center gap-x-2 self-center font-medium"
        >
          <Image src="/logo.svg" alt="Nodebase" width={30} height={30} />
          <span>Nodebase</span>
        </Link>
        {children}
      </div>
    </div>
  );
}
