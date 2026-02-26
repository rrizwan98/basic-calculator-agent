import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              🧮 Basic Calculator Agent
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="#features" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Features
            </Link>
            <Link 
              href="#how-it-works" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              How It Works
            </Link>
            <Link 
              href="#examples" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Examples
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
