import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { CheckCircle2, CreditCard, Lock, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { PRODUCTS } from "@/lib/products";
import { store, useHydrated, useStore } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
  head: () => ({
    meta: [
      { title: "Checkout — Device Hub" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const schema = z.object({
  email: z.string().trim().email().max(255),
  name: z.string().trim().min(2).max(100),
  address: z.string().trim().min(4).max(200),
  city: z.string().trim().min(2).max(100),
  zip: z.string().trim().min(3).max(20),
  country: z.string().trim().min(2).max(60),
  card: z.string().trim().regex(/^\d{4} ?\d{4} ?\d{4} ?\d{4}$/, "Enter a 16-digit card number"),
  exp: z.string().trim().regex(/^\d{2}\/\d{2}$/, "MM/YY"),
  cvc: z.string().trim().regex(/^\d{3,4}$/, "3-4 digits"),
});

function Checkout() {
  const router = useRouter();
  const hydrated = useHydrated();
  const items = useStore((s) => s.cart);
  const [placed, setPlaced] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    name: "",
    address: "",
    city: "",
    zip: "",
    country: "United States",
    card: "",
    exp: "",
    cvc: "",
  });

  const lines = useMemo(
    () =>
      items.map((it) => ({ ...it, product: PRODUCTS.find((p) => p.id === it.id) })).filter((l) => l.product),
    [items],
  );
  const subtotal = lines.reduce((s, l) => s + (l.product?.price ?? 0) * l.qty, 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 12;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = subtotal + shipping + tax;

  if (!hydrated) return null;

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <div className="mx-auto grid size-20 place-items-center rounded-full gradient-brand text-white shadow-glow">
          <CheckCircle2 className="size-10" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold">Thanks for your order!</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Order <span className="font-mono text-foreground">#DH-{Math.floor(Math.random() * 9e5 + 1e5)}</span>{" "}
          confirmed. A receipt is on its way to your inbox.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/shop" className="rounded-full gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow">
            Keep shopping
          </Link>
          <Link to="/" className="rounded-full border border-border px-6 py-3 text-sm font-medium">
            Back home
          </Link>
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Nothing to check out yet</h1>
        <Link to="/shop" className="mt-4 inline-block text-primary underline">Browse products</Link>
      </div>
    );
  }

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Record<string, string> = {};
      for (const iss of r.error.issues) errs[iss.path[0] as string] = iss.message;
      setErrors(errs);
      toast.error("Please fix the highlighted fields");
      return;
    }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      store.clearCart();
      setPlaced(true);
      router.invalidate();
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">Secure Checkout</h1>
      <p className="mt-1 inline-flex items-center gap-2 text-xs text-muted-foreground">
        <Lock className="size-3.5" /> 256-bit TLS · PCI-DSS compliant · Never stored on our servers
      </p>

      <form onSubmit={submit} noValidate className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          <Card title="Contact">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value.slice(0, 255))}
                  className={inputCls}
                />
              </Field>
              <Field label="Full name" error={errors.name}>
                <input
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value.slice(0, 100))}
                  className={inputCls}
                />
              </Field>
            </div>
          </Card>

          <Card title="Shipping">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Address" error={errors.address} full>
                <input
                  autoComplete="street-address"
                  value={form.address}
                  onChange={(e) => set("address", e.target.value.slice(0, 200))}
                  className={inputCls}
                />
              </Field>
              <Field label="City" error={errors.city}>
                <input
                  autoComplete="address-level2"
                  value={form.city}
                  onChange={(e) => set("city", e.target.value.slice(0, 100))}
                  className={inputCls}
                />
              </Field>
              <Field label="ZIP / Postal" error={errors.zip}>
                <input
                  autoComplete="postal-code"
                  value={form.zip}
                  onChange={(e) => set("zip", e.target.value.slice(0, 20))}
                  className={inputCls}
                />
              </Field>
              <Field label="Country" error={errors.country} full>
                <input
                  autoComplete="country-name"
                  value={form.country}
                  onChange={(e) => set("country", e.target.value.slice(0, 60))}
                  className={inputCls}
                />
              </Field>
            </div>
          </Card>

          <Card title="Payment" icon={<CreditCard className="size-4" />}>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Card number" error={errors.card} full>
                <input
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="4242 4242 4242 4242"
                  value={form.card}
                  onChange={(e) => set("card", e.target.value.slice(0, 19))}
                  className={inputCls}
                />
              </Field>
              <Field label="Expiry" error={errors.exp}>
                <input
                  placeholder="MM/YY"
                  autoComplete="cc-exp"
                  value={form.exp}
                  onChange={(e) => set("exp", e.target.value.slice(0, 5))}
                  className={inputCls}
                />
              </Field>
              <Field label="CVC" error={errors.cvc}>
                <input
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  value={form.cvc}
                  onChange={(e) => set("cvc", e.target.value.slice(0, 4))}
                  className={inputCls}
                />
              </Field>
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-secondary/60 p-3 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-primary" />
              Payments processed securely. We never see your card details.
            </div>
          </Card>
        </div>

        <aside className="h-fit rounded-3xl border border-border/60 bg-card p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-lg font-bold">Order Summary</h2>
          <ul className="mt-4 space-y-3">
            {lines.map(
              (l, i) =>
                l.product && (
                  <li key={i} className="flex items-center gap-3">
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-secondary">
                      <img src={l.product.image} alt="" className="size-full object-cover" />
                      <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-foreground text-[10px] font-bold text-background">
                        {l.qty}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="line-clamp-1 text-sm font-semibold">{l.product.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {l.storage ?? l.product.brand}
                      </div>
                    </div>
                    <div className="text-sm font-semibold">
                      ${(l.product.price * l.qty).toFixed(2)}
                    </div>
                  </li>
                ),
            )}
          </ul>

          <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
            <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
            <Row label="Shipping" value={shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`} />
            <Row label="Tax" value={`$${tax.toFixed(2)}`} />
          </dl>
          <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
            <span className="font-display font-semibold">Total</span>
            <span className="font-display text-2xl font-bold">${total.toFixed(2)}</span>
          </div>

          <button
            disabled={loading}
            className="mt-6 w-full rounded-full gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:brightness-110 disabled:opacity-70"
          >
            {loading ? "Processing…" : `Pay $${total.toFixed(2)}`}
          </button>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            By placing this order you agree to our Terms and Privacy Policy.
          </p>
        </aside>
      </form>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30";

function Card({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-6">
      <div className="mb-4 flex items-center gap-2">
        {icon}
        <h3 className="font-display font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  children,
  error,
  full,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  full?: boolean;
}) {
  return (
    <label className={full ? "sm:col-span-2" : ""}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
