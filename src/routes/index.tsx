import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Award,
  Cpu,
  Headphones,
  RefreshCw,
  Shield,
  Sparkles,
  Star,
  Truck,
  Zap,
} from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Device Hub — Premium Electronics & Gadgets" },
      {
        name: "description",
        content:
          "Discover the latest phones, laptops, audio, wearables and gaming gear. Free shipping and 30-day returns.",
      },
    ],
  }),
});

function Home() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 4);
  const best = PRODUCTS.filter((p) => p.bestSeller);
  const flash = PRODUCTS.filter((p) => p.flashSale);

  return (
    <div>
      <Hero />
      <PromoStrip />
      <Section
        eyebrow="Featured"
        title="Devices we're loving right now"
        cta={{ to: "/shop", label: "Shop all" }}
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 2} />
          ))}
        </div>
      </Section>

      <Categories />

      <FlashSale products={flash} />

      <Section
        eyebrow="Best Sellers"
        title="What everyone's buying"
        cta={{ to: "/shop", label: "Explore" }}
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {best.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>

      <WhyChoose />
      <Reviews />
      <NewsletterCTA />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="gradient-hero absolute inset-0" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28 lg:px-8">
        <div className="text-white">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
            <Sparkles className="size-3.5" /> New arrivals — Fall '26 lineup
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            Tomorrow's tech,
            <br />
            <span className="gradient-text">delivered today.</span>
          </h1>
          <p className="mt-5 max-w-lg text-base text-white/70 sm:text-lg">
            From flagship phones to studio-grade laptops — curated devices with 2-year warranty,
            free 2-day shipping, and a secure checkout you can trust.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 rounded-full gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:brightness-110"
            >
              Shop Now
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Explore Deals
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 text-xs text-white/60">
            <Stat n="12M+" label="Devices shipped" />
            <Stat n="4.9/5" label="Customer rating" />
            <Stat n="120+" label="Countries" />
          </div>
        </div>

        <div className="relative">
          <div className="animate-float relative rounded-[2rem] p-2 shadow-glow">
            <div className="overflow-hidden rounded-[1.6rem] bg-white/5 backdrop-blur">
              <img
                src={PRODUCTS[1].image}
                alt="Featured device"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 hidden rounded-2xl glass-dark px-4 py-3 text-white sm:block">
            <div className="text-[10px] uppercase tracking-wider text-white/60">Now shipping</div>
            <div className="font-display text-sm font-semibold">Nova Phone X · from $1,099</div>
          </div>
          <div className="absolute -right-4 top-6 hidden rounded-2xl glass-dark px-4 py-3 text-white sm:block">
            <div className="flex items-center gap-2">
              <Star className="size-4 fill-yellow-400 text-yellow-400" />
              <span className="font-display text-sm font-semibold">4.9 · 3,421 reviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-display text-xl font-bold text-white">{n}</div>
      <div>{label}</div>
    </div>
  );
}

function PromoStrip() {
  const items = [
    { Icon: Truck, title: "Free 2-day shipping", desc: "On orders over $50" },
    { Icon: RefreshCw, title: "30-day returns", desc: "No-questions-asked" },
    { Icon: Shield, title: "2-year warranty", desc: "On every device" },
    { Icon: Headphones, title: "24/7 support", desc: "Real humans, real fast" },
  ];
  return (
    <div className="border-b border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:px-6 md:grid-cols-4 lg:px-8">
        {items.map(({ Icon, title, desc }) => (
          <div key={title} className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl gradient-brand text-white">
              <Icon className="size-5" />
            </span>
            <div className="min-w-0">
              <div className="truncate font-display text-sm font-semibold">{title}</div>
              <div className="truncate text-xs text-muted-foreground">{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Section({
  eyebrow,
  title,
  cta,
  children,
}: {
  eyebrow: string;
  title: string;
  cta?: { to: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </div>
          <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{title}</h2>
        </div>
        {cta && (
          <Link
            to={cta.to}
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            {cta.label} <ArrowRight className="size-4" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

function Categories() {
  return (
    <Section eyebrow="Categories" title="Shop by category">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {CATEGORIES.map((c) => (
          <Link
            key={c.name}
            to="/shop"
            search={{ category: c.name }}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-4 transition hover:-translate-y-1 hover:shadow-soft"
          >
            <div className="aspect-square overflow-hidden rounded-xl bg-secondary">
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="mt-3">
              <div className="font-display text-sm font-semibold">{c.name}</div>
              <div className="text-xs text-muted-foreground">{c.blurb}</div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

function FlashSale({ products }: { products: typeof PRODUCTS }) {
  const [t, setT] = useState({ h: 5, m: 42, s: 11 });
  useEffect(() => {
    const id = setInterval(() => {
      setT((p) => {
        let { h, m, s } = p;
        if (s > 0) s--;
        else if (m > 0) {
          m--;
          s = 59;
        } else if (h > 0) {
          h--;
          m = 59;
          s = 59;
        }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl gradient-hero p-8 text-white sm:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
              <Zap className="size-3.5" /> Flash Sale
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
              Up to <span className="gradient-text">40% off</span> — ends soon
            </h2>
            <p className="mt-2 max-w-lg text-white/70">
              Handpicked devices with steep discounts. Once they're gone, they're gone.
            </p>
          </div>
          <div className="flex gap-3">
            {(["h", "m", "s"] as const).map((k, i) => (
              <div key={k} className="rounded-2xl glass-dark px-4 py-3 text-center">
                <div className="font-display text-3xl font-bold tabular-nums">{pad(t[k])}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/60">
                  {["Hrs", "Min", "Sec"][i]}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
          {products.slice(0, 3).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  const items = [
    { Icon: Cpu, title: "Only the latest silicon", desc: "We stock this year's chips — no last-gen surprises." },
    { Icon: Shield, title: "Secure checkout, always", desc: "PCI-DSS payments, encrypted end-to-end." },
    { Icon: Award, title: "Certified authentic", desc: "Every device sourced directly from brands." },
    { Icon: Truck, title: "Fast, tracked delivery", desc: "Real-time tracking, insured shipping." },
  ];
  return (
    <Section eyebrow="Why Device Hub" title="A shopping experience that respects you">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {items.map(({ Icon, title, desc }) => (
          <div
            key={title}
            className="rounded-2xl border border-border/60 bg-card p-6 transition hover:-translate-y-1 hover:shadow-soft"
          >
            <span className="grid size-11 place-items-center rounded-xl gradient-brand text-white shadow-glow">
              <Icon className="size-5" />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Reviews() {
  const reviews = [
    {
      name: "Ava Chen",
      role: "Product Designer",
      quote:
        "Ordered the Aurora Pro 15 on Tuesday, arrived Thursday. Packaging felt like unboxing an heirloom.",
    },
    {
      name: "Marcus Reed",
      role: "Streamer",
      quote:
        "Support helped me pick between two consoles for over an hour. Nobody does customer care like this.",
    },
    {
      name: "Priya Shah",
      role: "CS Student",
      quote:
        "Student discount + free shipping made a $1,899 laptop actually attainable. Genuinely grateful.",
    },
  ];
  return (
    <Section eyebrow="Reviews" title="Loved by 12 million customers">
      <div className="grid gap-4 md:grid-cols-3">
        {reviews.map((r) => (
          <figure
            key={r.name}
            className="rounded-2xl border border-border/60 bg-card p-6 transition hover:-translate-y-1 hover:shadow-soft"
          >
            <div className="flex items-center gap-1 text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-3 text-sm leading-relaxed text-foreground/90">
              "{r.quote}"
            </blockquote>
            <figcaption className="mt-4">
              <div className="font-display text-sm font-semibold">{r.name}</div>
              <div className="text-xs text-muted-foreground">{r.role}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

function NewsletterCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-border/60 bg-secondary/40 p-10 text-center">
        <h3 className="font-display text-2xl font-bold sm:text-3xl">
          Get early access to <span className="gradient-text">every drop</span>
        </h3>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
          Join 400,000+ subscribers. New arrivals, restocks and members-only deals in your inbox.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-full gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow"
        >
          Start Shopping <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
