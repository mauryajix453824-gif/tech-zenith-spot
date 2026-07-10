import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, X, Zap } from "lucide-react";
import { useState } from "react";
import { useHydrated, useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const hydrated = useHydrated();
  const cartCount = useStore((s) => s.cart.reduce((a, b) => a + b.qty, 0));
  const wishCount = useStore((s) => s.wishlist.length);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
          <span className="grid size-9 place-items-center rounded-xl gradient-brand text-white shadow-glow">
            <Zap className="size-5" strokeWidth={2.5} />
          </span>
          <span>Device<span className="gradient-text">Hub</span></span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Link
            to="/shop"
            className="hidden items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-2 text-sm text-muted-foreground transition hover:bg-secondary sm:flex"
            aria-label="Search products"
          >
            <Search className="size-4" />
            <span>Search devices…</span>
          </Link>
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative grid size-10 place-items-center rounded-full text-foreground/80 transition hover:bg-secondary"
          >
            <Heart className="size-5" />
            {hydrated && wishCount > 0 && <Badge count={wishCount} />}
          </Link>
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative grid size-10 place-items-center rounded-full text-foreground/80 transition hover:bg-secondary"
          >
            <ShoppingBag className="size-5" />
            {hydrated && cartCount > 0 && <Badge count={cartCount} />}
          </Link>
          <button
            aria-label="Menu"
            className="grid size-10 place-items-center rounded-full text-foreground/80 transition hover:bg-secondary md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "grid overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur md:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          "transition-[grid-template-rows] duration-300",
        )}
      >
        <div className="min-h-0">
          <div className="flex flex-col gap-1 px-4 py-3">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

function Badge({ count }: { count: number }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 grid min-h-5 min-w-5 place-items-center rounded-full gradient-brand px-1 text-[10px] font-bold text-white shadow">
      {count > 99 ? "99+" : count}
    </span>
  );
}
