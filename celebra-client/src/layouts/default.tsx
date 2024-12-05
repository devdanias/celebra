import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      {/* <LoginModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} /> */}
      <main className="w-97 flex flex-row flex-grow pt-3">{children}</main>
      <footer className="w-full flex items-center justify-center py-1"></footer>
    </div>
  );
}
