import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { PRODUCTS } from "@/lib/products";
import { store, useHydrated, useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  component: Cart,
  head: () => ({
    meta: [
      { title: "Cart — Device Hub" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function Cart() {
  const hydrated = useHydrated();
  const items = useStore((s) => s.cart);
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState<null | { code: string; pct: number }>(null);

  const lines = useMemo(
    () =>
      items.map((it, idx) => ({
        ...it,
        idx,
        product: PRODUCTS.find((p) => p.id === it.id),
      })),
    [items],
  );

  const subtotal = lines.reduce(
    (sum, l) => sum + (l.product ? l.product.price * l.qty : 0),
    0,
  );
  const discount = applied ? (subtotal * applied.pct) / 100 : 0;
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 12;
  const tax = Math.round((subtotal - discount) * 0.08 * 100) / 100;
  const total = Math.max(0, subtotal - discount + shipping + tax);

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (!code) return;
    const map: Record<string, number> = { HUB10: 10, STUDENT: 15, FLASH20: 20 };
    if (map[code]) {
      setApplied({ code, pct: map[code] });
      toast.success(`Coupon ${code} applied — ${map[code]}% off`);
    } else {
      toast.error("Invalid coupon code");
    }
  };

  if (!hydrated) return null;

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="mx-auto grid size-20 place-items-center rounded-full bg-secondary">
          <ShoppingBag className="size-8 text-muted-foreground" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Looks like you haven't added anything yet. Start exploring premium devices.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex rounded-full gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">Your Cart</h1>
      <p className="text-sm text-muted-foreground">
        {lines.length} item{lines.length === 1 ? "" : "s"}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <ul className="space-y-3">
          {lines.map((l) =>
            !l.product ? null : (
              <li
                key={l.idx}
                className="grid grid-cols-[96px_1fr] gap-4 rounded-3xl border border-border/60 bg-card p-4 sm:grid-cols-[120px_1fr_auto]"
              >
                <Link
                  to="/product/$id"
                  params={{ id: l.product.id }}
                  className="overflow-hidden rounded-2xl bg-secondary"
                >
                  <img src={l.product.image} alt={l.product.name} className="aspect-square w-full object-cover" />
                </Link>
                <div className="min-w-0">
                  <Link
                    to="/product/$id"
                    params={{ id: l.product.id }}
                    className="line-clamp-1 font-display font-semibold hover:text-primary"
                  >
                    {l.product.name}
                  </Link>
                  <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {l.color && (
                      <span className="inline-flex items-center gap-1">
                        <span
                          className="inline-block size-3 rounded-full border border-border"
                          style={{ background: l.color }}
                        />
                        Color
                      </span>
                    )}
                    {l.storage && <span>{l.storage}</span>}
                    <span>{l.product.brand}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-3 sm:hidden">
                    <QtyStepper qty={l.qty} onDec={() => store.updateQty(l.idx, l.qty - 1)} onInc={() => store.updateQty(l.idx, l.qty + 1)} />
                    <span className="ml-auto font-display font-bold">${l.product.price * l.qty}</span>
                    <button
                      aria-label="Remove"
                      onClick={() => store.removeAt(l.idx)}
                      className="grid size-9 place-items-center rounded-full text-muted-foreground hover:bg-secondary hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
                <div className="hidden items-center gap-4 sm:flex">
                  <QtyStepper qty={l.qty} onDec={() => store.updateQty(l.idx, l.qty - 1)} onInc={() => store.updateQty(l.idx, l.qty + 1)} />
                  <span className="w-20 text-right font-display font-bold">${l.product.price * l.qty}</span>
                  <button
                    aria-label="Remove"
                    onClick={() => store.removeAt(l.idx)}
                    className="grid size-9 place-items-center rounded-full text-muted-foreground hover:bg-secondary hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </li>
            ),
          )}
        </ul>

        <aside className="h-fit rounded-3xl border border-border/60 bg-card p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-lg font-bold">Order Summary</h2>

          <div className="mt-4 flex gap-2">
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value.slice(0, 20).toUpperCase())}
              placeholder="Promo code"
              className="w-full rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
              aria-label="Promo code"
            />
            <button
              onClick={applyCoupon}
              className="rounded-full border border-primary px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              Apply
            </button>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Try HUB10, STUDENT, or FLASH20</p>

          <dl className="mt-6 space-y-2 text-sm">
            <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
            {applied && (
              <Row
                label={`Discount (${applied.code})`}
                value={`-$${discount.toFixed(2)}`}
                accent
              />
            )}
            <Row label="Shipping" value={shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`} />
            <Row label="Tax (est.)" value={`$${tax.toFixed(2)}`} />
          </dl>
          <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
            <span className="font-display text-sm font-semibold">Total</span>
            <span className="font-display text-2xl font-bold">${total.toFixed(2)}</span>
          </div>

          <Link
            to="/checkout"
            className="mt-6 block rounded-full gradient-brand px-6 py-3 text-center text-sm font-semibold text-white shadow-glow"
          >
            Secure Checkout
          </Link>
          <Link
            to="/shop"
            className="mt-2 block text-center text-xs text-muted-foreground hover:text-foreground"
          >
            or continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}

function QtyStepper({ qty, onDec, onInc }: { qty: number; onDec: () => void; onInc: () => void }) {
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-background">
      <button onClick={onDec} className="grid size-9 place-items-center rounded-l-full hover:bg-secondary" aria-label="Decrease">
        <Minus className="size-3.5" />
      </button>
      <span className="min-w-8 text-center text-sm font-semibold">{qty}</span>
      <button onClick={onInc} className="grid size-9 place-items-center rounded-r-full hover:bg-secondary" aria-label="Increase">
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={accent ? "font-medium text-primary" : "font-medium"}>{value}</dd>
    </div>
  );
}
