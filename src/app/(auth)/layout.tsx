import Image from 'next/image';
import Link from 'next/link';

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-muted min-h-svh flex flex-col items-center justify-center gap-6 md:gap-10">
      <div className="flex flex-col gap-6 max-w-sm w-full">
        <Link
          href="/"
          className="flex items-center self-center font-medium gap-2"
        >
          <Image src="/logo.svg" alt="Nodebase" width={30} height={30} />
          <span>Nodebase</span>
        </Link>
        {children}
      </div>
    </div>
  );
}
