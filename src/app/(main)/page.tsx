import { Breadcrumbs, HomeView } from '@/components';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="px-8 py-4">
        <Breadcrumbs />
      </div>
      <HomeView />
    </div>
  );
}
