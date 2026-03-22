"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname.startsWith("/app") || pathname.startsWith("/auth")) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-purple-900/20 bg-[#08080f]/85 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight text-white">
          agent<span className="text-[#6c3fe0]">0</span>
        </Link>
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/office" className={`text-sm hidden md:block transition-colors ${pathname === "/office" ? "text-white" : "text-[#8888aa] hover:text-white"}`}>Office</Link>
          <Link href="/insights" className={`text-sm hidden md:block transition-colors ${pathname.startsWith("/insights") ? "text-white" : "text-[#8888aa] hover:text-white"}`}>Insights</Link>
          <Link href="/agents" className={`text-sm hidden md:block transition-colors ${pathname.startsWith("/agents") ? "text-white" : "text-[#8888aa] hover:text-white"}`}>Agents</Link>
          <Link href="/build" className="text-sm font-semibold px-4 py-2 rounded-full bg-[#6c3fe0] text-white hover:bg-[#5a2fd0] transition-colors">
            Get Launchpad
          </Link>
        </div>
      </div>
    </nav>
  );
}
