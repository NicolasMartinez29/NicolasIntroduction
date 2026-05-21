'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Chat' },
  { href: '/dashboard', label: 'Dashboard' }
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 border-b border-ink-700/60 bg-ink-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-edge to-cool text-ink-950">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          </span>
          <span className="font-semibold tracking-tight">
            MarketEdge <span className="text-edge">AI</span>
          </span>
          <span className="ml-2 hidden text-[10px] uppercase tracking-[0.16em] text-ink-400 sm:inline">
            Private reseller copilot
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {links.map((l) => {
            const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-md px-3 py-1.5 transition ${
                  active
                    ? 'bg-ink-700 text-white'
                    : 'text-ink-400 hover:bg-ink-800 hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <a
            href="/api/export"
            className="ml-2 rounded-md border border-ink-700 px-3 py-1.5 text-xs text-ink-400 transition hover:border-edge/50 hover:text-edge"
          >
            Export CSV
          </a>
        </nav>
      </div>
    </header>
  );
}
