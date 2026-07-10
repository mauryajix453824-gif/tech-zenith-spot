import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Heart, Minus, Plus, Shield, Star, Truck } from "lucide-react";
import { toast } from "sonner";
import { ProductCard } from "@/components/ProductCard";
import { findProduct, relatedProducts, type Product } from "@/lib/products";
import { store, useHydrated, useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = findProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Device Hub` },
          { name: "description", content: loaderData.product.tagline },
          { property: "og:title", content: `${loaderData.product.name} — Device Hub` },
          { property: "og:description", content: loaderData.product.tagline },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [{ title: "Product not found" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="font-display text-2xl font-bold">Product not found</h1>
      <Link to="/shop" className="mt-4 inline-block text-primary underline">Back to shop</Link>
    </div>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const data = Route.useLoaderData() as { product: Product };
  const product = data.product;
  const [imgIdx, setImgIdx] = useState(0);
  const [color, setColor] = useState<string>(product.colors[0]);
  const [storage, setStorage] = useState<string | undefined>(product.storage?.[0]);
  const [qty, setQty] = useState(1);
  const hydrated = useHydrated();
  const inWishlist = useStore((s) => s.wishlist.includes(product.id)) && hydrated;

  useEffect(() => {
    if (hydrated) store.markRecent(product.id);
  }, [hydrated, product.id]);

  const off =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0;

  const related = relatedProducts(product.id, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link> ·{" "}
        <Link to="/shop" className="hover:text-foreground">Shop</Link> ·{" "}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-3xl border border-border/60 bg-secondary/40">
            <img
              src={product.gallery[imgIdx]}
              alt={product.name}
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {product.gallery.map((g, i) => (
              <button
                key={g}
                onClick={() => setImgIdx(i)}
                className={cn(
                  "overflow-hidden rounded-xl border-2 bg-secondary/40",
                  i === imgIdx ? "border-primary" : "border-transparent",
                )}
                aria-label={`View image ${i + 1}`}
              >
                <img src={g} alt="" loading="lazy" className="aspect-square size-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-secondary px-2.5 py-1 font-semibold text-foreground/80">
              {product.brand}
            </span>
            <span className="rounded-full bg-secondary px-2.5 py-1 text-muted-foreground">
              {product.category}
            </span>
            {off > 0 && (
              <span className="rounded-full gradient-brand px-2.5 py-1 font-bold text-white">
                -{off}% off
              </span>
            )}
          </div>

          <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{product.name}</h1>
          <p className="mt-2 text-muted-foreground">{product.tagline}</p>

          <div className="mt-3 flex items-center gap-2 text-sm">
            <div className="flex items-center gap-0.5 text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn("size-4", i < Math.round(product.rating) && "fill-current")}
                />
              ))}
            </div>
            <span className="font-semibold">{product.rating}</span>
            <span className="text-muted-foreground">({product.reviews.toLocaleString()} reviews)</span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl font-bold">${product.price}</span>
            {product.oldPrice && (
              <span className="text-lg text-muted-foreground line-through">${product.oldPrice}</span>
            )}
            <span
              className={cn(
                "ml-auto inline-flex items-center gap-1 text-sm font-medium",
                product.stock > 0 ? "text-emerald-600" : "text-destructive",
              )}
            >
              <Check className="size-4" /> {product.stock > 0 ? "In stock" : "Sold out"}
            </span>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Color
              </div>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    aria-label={`Color ${c}`}
                    className={cn(
                      "size-9 rounded-full border-2 transition",
                      color === c ? "border-primary ring-2 ring-primary/30" : "border-border",
                    )}
                    style={{ background: c }}
                  />
                ))}
              </div>
            </div>

            {product.storage && (
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Storage
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.storage.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStorage(s)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-medium transition",
                        storage === s
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border hover:bg-secondary",
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Quantity
              </div>
              <div className="inline-flex items-center rounded-full border border-border bg-background">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid size-10 place-items-center rounded-l-full hover:bg-secondary"
                  aria-label="Decrease quantity"
                >
                  <Minus className="size-4" />
                </button>
                <span className="min-w-10 text-center font-display font-semibold">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  className="grid size-10 place-items-center rounded-r-full hover:bg-secondary"
                  aria-label="Increase quantity"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => {
                store.addToCart(product.id, { qty, color, storage });
                toast.success(`${product.name} added to cart`);
              }}
              className="flex-1 rounded-full border-2 border-primary bg-background px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              Add to Cart
            </button>
            <Link
              to="/checkout"
              onClick={() => store.addToCart(product.id, { qty, color, storage })}
              className="flex-1 rounded-full gradient-brand px-6 py-3 text-center text-sm font-semibold text-white shadow-glow transition hover:brightness-110"
            >
              Buy Now
            </Link>
            <button
              onClick={() => {
                store.toggleWishlist(product.id);
                toast.success(inWishlist ? "Removed from wishlist" : "Added to wishlist");
              }}
              aria-label="Toggle wishlist"
              className={cn(
                "grid size-12 place-items-center rounded-full border border-border transition",
                inWishlist && "border-primary bg-primary/10 text-primary",
              )}
            >
              <Heart className={cn("size-5", inWishlist && "fill-current")} />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 rounded-xl bg-secondary/60 p-3">
              <Truck className="size-4 text-primary" />
              <span>Free 2-day shipping</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-secondary/60 p-3">
              <Shield className="size-4 text-primary" />
              <span>2-year warranty included</span>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-16 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-3xl border border-border/60 bg-card p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold">Overview</h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/80">{product.description}</p>

          <h3 className="mt-8 font-display text-lg font-semibold">Highlights</h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                {f}
              </li>
            ))}
          </ul>

          <h3 className="mt-8 font-display text-lg font-semibold">Specifications</h3>
          <dl className="mt-3 grid gap-3 sm:grid-cols-2">
            {Object.entries(product.specs).map(([k, v]) => (
              <div key={k} className="rounded-xl bg-secondary/60 p-3">
                <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">{k}</dt>
                <dd className="mt-1 text-sm font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-border/60 bg-card p-6">
            <h3 className="font-display text-base font-semibold">Delivery</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Free carbon-neutral shipping, tracked and insured. Order in the next 4 hours to get it
              by Thursday.
            </p>
          </div>
          <div className="rounded-3xl border border-border/60 bg-card p-6">
            <h3 className="font-display text-base font-semibold">Warranty</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Every device includes a 2-year Device Hub warranty and 30-day return window.
            </p>
          </div>
          <div className="rounded-3xl border border-border/60 bg-card p-6">
            <h3 className="font-display text-base font-semibold">Customer reviews</h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold">{product.rating}</span>
              <span className="text-xs text-muted-foreground">
                / 5 · {product.reviews.toLocaleString()} reviews
              </span>
            </div>
            <div className="mt-3 space-y-2 text-sm">
              <ReviewLine name="Sam · Verified buyer" text="Genuinely the best device I've owned this year." />
              <ReviewLine name="Alex · Verified buyer" text="Fast shipping, careful packaging, exactly as described." />
            </div>
          </div>
        </aside>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold">You may also like</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ReviewLine({ name, text }: { name: string; text: string }) {
  return (
    <div className="rounded-xl bg-secondary/60 p-3">
      <div className="flex items-center gap-1 text-yellow-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-3 fill-current" />
        ))}
      </div>
      <p className="mt-1 text-xs leading-snug text-foreground/80">"{text}"</p>
      <p className="mt-1 text-[10px] text-muted-foreground">{name}</p>
    </div>
  );
}
