import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/products";
import { useHydrated, useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  component: Wishlist,
  head: () => ({
    meta: [
      { title: "Wishlist — Device Hub" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function Wishlist() {
  const hydrated = useHydrated();
  const ids = useStore((s) => s.wishlist);
  const items = PRODUCTS.filter((p) => ids.includes(p.id));

  if (!hydrated) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">Your Wishlist</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {items.length} saved device{items.length === 1 ? "" : "s"}
      </p>

      {items.length === 0 ? (
        <div className="mt-16 rounded-3xl border border-dashed border-border p-12 text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-secondary">
            <Heart className="size-7 text-muted-foreground" />
          </div>
          <h3 className="mt-4 font-display text-lg font-semibold">Nothing saved yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Tap the heart icon on any product to save it here.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-flex rounded-full gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
          >
            Browse devices
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
