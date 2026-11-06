import Sidebar from "./components/Sidebar";
import ProfileAvatar from "./components/ProfileAvatar";
import MobileNavigation from "./components/MobileNavigation";
import PremiumRouteGuard from "./components/PremiumRouteGuard";
import Link from "next/link";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Top Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <MobileNavigation />
          <div>
            <div className="text-xl font-bold tracking-[0.2em]">
              ZEVYQ
            </div>

            <div className="mt-1 text-xs text-white/40">
              AI SPORTS INTELLIGENCE
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <div className="text-sm font-medium">Willkommen</div>
              <div className="text-xs text-white/40">
                Dein Dashboard
              </div>
            </div>

            <ProfileAvatar />
          </div>
        </div>
      </header>

      {/* App Area */}
      <div className="mx-auto flex max-w-7xl">
        <Sidebar />

        <main className="min-w-0 flex-1">
          <PremiumRouteGuard>{children}</PremiumRouteGuard>
          <nav aria-label="Vertragsverwaltung" className="flex flex-wrap gap-4 border-t border-white/10 px-6 py-5 text-sm text-white/60">
            <Link href="/vertrag" className="underline hover:text-white">Verträge hier kündigen</Link>
            <Link href="/vertrag?art=widerruf" className="underline hover:text-white">Vertrag widerrufen</Link>
          </nav>
        </main>
      </div>
    </div>
  );
}
