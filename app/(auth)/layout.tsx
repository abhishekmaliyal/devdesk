export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-[#050507] text-zinc-100 flex flex-col justify-between bg-[linear-gradient(to_right,#141417_1px,transparent_1px),linear-gradient(to_bottom,#141417_1px,transparent_1px)] bg-[size:32px_32px]">
      {/* Top Header */}
      <header className="h-11 w-full border-b border-zinc-800/80 bg-[#070709]/80 backdrop-blur-sm flex items-center px-4">
        <div className="border-r border-zinc-800/80 h-full pr-4 flex items-center gap-2">
          <span className="h-2 w-2 bg-[#00E599]" />
          <span className="font-mono text-xs font-bold tracking-wider text-zinc-200 uppercase">
            Devdesk
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>

      {/* Bottom Footer */}
      <footer className="h-10 w-full border-t border-zinc-800/80 bg-[#070709]/80 backdrop-blur-sm flex items-center justify-center font-mono text-xs text-zinc-500">
        Made with ❤️
      </footer>
    </div>
  );
}
