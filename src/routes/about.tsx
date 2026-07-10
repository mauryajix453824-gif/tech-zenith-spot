import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Heart, Sparkles, Target, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — Device Hub" },
      {
        name: "description",
        content:
          "Device Hub was founded in 2018 to bring premium electronics to everyone. Meet the team behind your favorite devices.",
      },
      { property: "og:title", content: "About Device Hub" },
      { property: "og:description", content: "The team building your favorite gadget store." },
    ],
  }),
});

function About() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="gradient-hero absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center text-white sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
            <Sparkles className="size-3.5" /> Est. 2018
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold sm:text-6xl">
            Devices for the <span className="gradient-text">next generation</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-white/70 sm:text-lg">
            We started Device Hub with a simple belief: premium technology shouldn't feel out of
            reach. Six years later, we serve 12 million customers in 120 countries.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <Panel eyebrow="Our Story" title="Built by engineers who care">
            Device Hub began in a garage in Austin. Our founders — an engineer and a designer —
            were tired of buying gadgets from stores that treated them like transactions. So they
            built the store they wished existed: honest specs, expert reviews, and support
            that picks up on the first ring.
          </Panel>
          <Panel eyebrow="Mission" title="Make premium tech accessible">
            We negotiate directly with manufacturers so you don't pay a middleman markup. Every
            dollar we save gets passed on to you, or reinvested in warranty, support, and
            sustainability.
          </Panel>
          <Panel eyebrow="Vision" title="A device for every dream">
            Whether you're a student writing their first paper, a founder shipping their first
            product, or a gamer chasing their first tournament — we want your tools to feel
            like they were made for you.
          </Panel>
          <Panel eyebrow="Values" title="Trust, transparency, taste">
            Certified authentic devices. Real reviews, never paid. Sustainable packaging.
            Zero dark patterns at checkout.
          </Panel>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl gradient-hero p-10 text-white sm:p-14">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">By the numbers</h2>
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <Stat n="12M+" label="Customers" />
            <Stat n="120" label="Countries" />
            <Stat n="4.9/5" label="Average rating" />
            <Stat n="400+" label="Team members" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Achievements
          </div>
          <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
            Recognized for the work
          </h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { Icon: Award, title: "Best DTC 2024", body: "Fast Company Innovation Awards" },
            { Icon: Heart, title: "Top-rated support", body: "CNET Consumer Choice" },
            { Icon: Target, title: "Fastest growing", body: "Inc. 5000 · 3 years running" },
          ].map((a) => (
            <div
              key={a.title}
              className="rounded-2xl border border-border/60 bg-card p-6 transition hover:-translate-y-1 hover:shadow-soft"
            >
              <span className="grid size-11 place-items-center rounded-xl gradient-brand text-white shadow-glow">
                <a.Icon className="size-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{a.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            The Team
          </div>
          <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
            Faces behind Device Hub
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { name: "Elena Ross", role: "Founder & CEO", i: 1 },
            { name: "Kai Nakamura", role: "Head of Product", i: 2 },
            { name: "Naomi Ade", role: "Design Director", i: 3 },
            { name: "Diego Ortiz", role: "Head of Support", i: 4 },
          ].map((t) => (
            <div key={t.name} className="text-center">
              <div className="mx-auto aspect-square w-full overflow-hidden rounded-2xl bg-secondary">
                <img
                  src={`https://i.pravatar.cc/400?img=${t.i * 12}`}
                  alt={t.name}
                  loading="lazy"
                  className="size-full object-cover"
                />
              </div>
              <div className="mt-3 font-display font-semibold">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border/60 bg-secondary/40 p-10 text-center">
          <Users className="mx-auto size-8 text-primary" />
          <h3 className="mt-3 font-display text-2xl font-bold">Join 12M happy customers</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Free shipping, real support, and devices you'll love. Start browsing today.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-flex rounded-full gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow"
          >
            Explore devices
          </Link>
        </div>
      </section>
    </div>
  );
}

function Panel({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-8">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</div>
      <h3 className="mt-2 font-display text-2xl font-bold">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-foreground/80">{children}</p>
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-bold sm:text-4xl">{n}</div>
      <div className="text-xs uppercase tracking-widest text-white/60">{label}</div>
    </div>
  );
}
