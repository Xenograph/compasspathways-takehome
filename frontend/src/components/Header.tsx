import Link from 'next/link';
import { Button } from './ui/button';

type Props = {
  heading: string;
};

export default function Header({ heading }: Props) {
  return (
    <header className="flex justify-between items-center shadow-md min-h-16 px-4">
      <div className="flex-1">
        <Button variant="outline" asChild>
          <Link href="/" className="font-bold">
            Home
          </Link>
        </Button>
      </div>
      <h1 className="font-semibold flex-1 text-center">{heading}</h1>
      <div className="flex-1"></div>
    </header>
  );
}
