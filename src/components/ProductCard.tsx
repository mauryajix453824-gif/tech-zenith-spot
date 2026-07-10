import { Link } from "@tanstack/react-router";
import { Eye, Heart, Star } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/lib/products";
import { store, useHydrated, useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const hydrated = useHydrated();
  const wishing = useStore((s) => s.wishlist.includes(product.id));
  const inWishlist = hydrated && wishing;

  const off =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0;

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="block aspect-square overflow-hidden bg-secondary/60"
      >
        <img
          src={product.image}
          alt={product.name}
          loading={priority ? "eager" : "lazy"}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>

      <div className="absolute left-3 top-3 flex flex-col gap-1.5">
        {off > 0 && (
          <span className="rounded-full gradient-brand px-2.5 py-1 text-[10px] font-bold text-white shadow">
            -{off}%
          </span>
        )}
        {product.badge && off === 0 && (
          <span className="rounded-full bg-foreground px-2.5 py-1 text-[10px] font-bold text-background">
            {product.badge}
          </span>
        )}
      </div>

      <div className="absolute right-3 top-3 flex flex-col gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <button
          type="button"
          aria-label="Add to wishlist"
          onClick={() => {
            store.toggleWishlist(product.id);
            toast.success(inWishlist ? "Removed from wishlist" : "Added to wishlist");
          }}
          className={cn(
            "grid size-9 place-items-center rounded-full bg-background/95 text-foreground shadow-soft backdrop-blur transition hover:bg-primary hover:text-primary-foreground",
            inWishlist && "bg-primary text-primary-foreground",
          )}
        >
          <Heart className={cn("size-4", inWishlist && "fill-current")} />
        </button>
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          aria-label="Quick view"
          className="grid size-9 place-items-center rounded-full bg-background/95 text-foreground shadow-soft backdrop-blur transition hover:bg-primary hover:text-primary-foreground"
        >
          <Eye className="size-4" />
        </Link>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{product.brand}</span>
          <span className="inline-flex items-center gap-1">
            <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
            {product.rating}
          </span>
        </div>
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          className="mt-1 block font-display text-base font-semibold leading-tight hover:text-primary"
        >
          {product.name}
        </Link>
        <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{product.tagline}</p>

        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-lg font-bold">${product.price}</span>
              {product.oldPrice && (
                <span className="text-xs text-muted-foreground line-through">${product.oldPrice}</span>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              store.addToCart(product.id, { qty: 1 });
              toast.success(`${product.name} added to cart`);
            }}
            className="rounded-full gradient-brand px-3.5 py-2 text-xs font-semibold text-white shadow transition hover:shadow-glow"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-border/60 bg-card">
      <div className="aspect-square animate-pulse bg-secondary" />
      <div className="space-y-2 p-4">
        <div className="h-3 w-1/3 animate-pulse rounded bg-secondary" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-secondary" />
        <div className="h-5 w-1/2 animate-pulse rounded bg-secondary" />
      </div>
    </div>
  );
}
