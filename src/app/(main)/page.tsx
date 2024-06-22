import { Multimedia } from '@/routes';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Multimedia.Link multimediaName="red">Test ME</Multimedia.Link>
    </div>
  );
}
