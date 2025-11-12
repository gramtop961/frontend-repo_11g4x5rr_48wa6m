import { ShoppingCart } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-orange-700 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            Trusted Packaging Partner
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            HNG PACKAGING SOLUTION
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Durable boxes, protective wraps, and shipping supplies to keep your products safe from warehouse to doorstep.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#catalog" className="inline-flex items-center gap-2 rounded-md bg-orange-600 text-white px-5 py-3 font-semibold shadow hover:bg-orange-700 transition">
              <ShoppingCart size={20} />
              Shop supplies
            </a>
            <a href="#about" className="inline-flex items-center gap-2 rounded-md border border-gray-300 text-gray-700 px-5 py-3 font-semibold hover:bg-white shadow-sm transition">
              Learn more
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-40" />
          <img className="relative w-full rounded-xl shadow-lg ring-1 ring-black/5" src="https://images.unsplash.com/photo-1683451148755-ca8d4430905f?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxQYWNrYWdpbmclMjBzdXBwbGllc3xlbnwwfDB8fHwxNzYyOTM2ODg5fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="Packaging supplies" />
        </div>
      </div>
    </section>
  );
}
