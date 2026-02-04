'use client';

/**
 * 사이트 상단 헤더 (고정)
 */
export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-white/70 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-center">
        <h1 className="text-lg font-black tracking-tight">
          <span className="mr-1">🧠</span>
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Brain Type
          </span>
        </h1>
      </div>
    </header>
  );
}
