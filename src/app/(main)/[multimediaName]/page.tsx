import { Breadcrumbs, MultimediaView } from '@/components';
import Image from 'next/image';

export default function Multimedia() {
  return (
    <div className="relative px-8">
      <div className="absolute right-0 -z-10 h-[530px] w-full before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:z-10 before:bg-background/90 before:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:z-20 after:bg-gradient-to-t after:from-background after:to-transparent after:content-['']">
        <Image
          src="https://api.paraj.ir/images/660b8b9a7657152dff73cce5"
          alt="image"
          fill
          className="object-cover object-top"
        />
      </div>
      <div className="mx-auto flex min-h-screen max-w-8xl flex-col">
        <div className="max-w-8xl py-4">
          <Breadcrumbs />
        </div>
        <MultimediaView />
      </div>
    </div>
  );
}
