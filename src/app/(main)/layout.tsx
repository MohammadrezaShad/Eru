import { AppBar, Footer, Header } from '@/components';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer className="md:hidden" />
      <AppBar className="hidden md:block" />
    </>
  );
}
