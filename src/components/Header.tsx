
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">ETCIO</span>
          <span className="text-sm text-gray-500">.com</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary">News</Link>
          <Link to="/" className="text-sm font-medium hover:text-primary">Exclusives</Link>
          <Link to="/" className="text-sm font-medium hover:text-primary">Leaders Speak</Link>
          <Link to="/" className="text-sm font-medium hover:text-primary">Events</Link>
          <Link to="/" className="text-sm font-medium hover:text-primary">Awards</Link>
          <Link to="/" className="text-sm font-medium hover:text-primary">Webinars</Link>
          <Link to="/" className="text-sm font-medium hover:text-primary">Brand Solutions</Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
          <Button className="rounded-full" size="sm">
            Login
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
