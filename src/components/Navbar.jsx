import { ShoppingCart, Package, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar({ cartCount, onOpenCart }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-extrabold text-gray-900 text-lg">
          <Package className="text-orange-600" />
          HNG PACKAGING SOLUTION
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#catalog" className="hover:text-orange-600">Catalog</a>
          <a href="#about" className="hover:text-orange-600">About</a>
          <a href="#contact" className="hover:text-orange-600">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={onOpenCart} className="relative rounded-full p-2 hover:bg-gray-100">
            <ShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-xs bg-orange-600 text-white rounded-full px-1.5">
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={() => setOpen(!open)} className="md:hidden rounded-md p-2 hover:bg-gray-100">
            <Menu />
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-2">
          <a href="#catalog" className="block">Catalog</a>
          <a href="#about" className="block">About</a>
          <a href="#contact" className="block">Contact</a>
        </div>
      )}
    </header>
  );
}
