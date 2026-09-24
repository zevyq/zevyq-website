import Sidebar from "./components/Sidebar";

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

            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm font-semibold">
              M
            </div>
          </div>
        </div>
      </header>

      {/* App Area */}
      <div className="mx-auto flex max-w-7xl">
        <Sidebar />

        <main className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}