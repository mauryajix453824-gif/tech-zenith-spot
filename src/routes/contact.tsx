import { createFileRoute } from "@tanstack/react-router";
import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  subject: z.string().trim().min(2, "Enter a subject").max(150),
  message: z.string().trim().min(10, "Message is too short").max(2000),
});

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — Device Hub" },
      { name: "description", content: "Reach Device Hub's support team. We reply in under 4 hours." },
    ],
  }),
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Record<string, string> = {};
      for (const iss of r.error.issues) errs[iss.path[0] as string] = iss.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent — we'll reply within 4 hours.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 900);
  };

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="gradient-hero absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center text-white sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">
            We're here to <span className="gradient-text">help</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Questions about a device, an order, or your warranty? Real humans reply within 4 hours,
            24/7.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <form
            onSubmit={onSubmit}
            noValidate
            className="rounded-3xl border border-border/60 bg-card p-6 sm:p-8"
          >
            <h2 className="font-display text-2xl font-bold">Send us a message</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill out the form and our team will get back to you shortly.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Name" error={errors.name}>
                <input
                  value={form.name}
                  onChange={(e) => set("name", e.target.value.slice(0, 100))}
                  autoComplete="name"
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                  required
                />
              </Field>
              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value.slice(0, 255))}
                  autoComplete="email"
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                  required
                />
              </Field>
              <Field label="Phone" hint="Optional" error={errors.phone}>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value.slice(0, 30))}
                  autoComplete="tel"
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                />
              </Field>
              <Field label="Subject" error={errors.subject}>
                <input
                  value={form.subject}
                  onChange={(e) => set("subject", e.target.value.slice(0, 150))}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                  required
                />
              </Field>
            </div>
            <Field label="Message" error={errors.message}>
              <textarea
                value={form.message}
                onChange={(e) => set("message", e.target.value.slice(0, 2000))}
                rows={5}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                required
              />
              <div className="mt-1 text-right text-[10px] text-muted-foreground">
                {form.message.length}/2000
              </div>
            </Field>

            <div className="mt-3 flex items-center gap-2 rounded-xl bg-secondary/50 p-3 text-xs text-muted-foreground">
              <div className="grid size-6 place-items-center rounded-md border border-border bg-background font-mono text-[10px]">
                ✓
              </div>
              Protected by hCaptcha · we never share your data
            </div>

            <button
              disabled={loading}
              className="mt-5 w-full rounded-full gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:brightness-110 disabled:opacity-70 sm:w-auto"
            >
              {loading ? "Sending…" : "Send message"}
            </button>
          </form>

          <aside className="space-y-4">
            <InfoCard Icon={MapPin} title="Visit us">
              1200 Signal Ave, Suite 400
              <br />
              Austin, TX 78701
            </InfoCard>
            <InfoCard Icon={Phone} title="Call us">
              <a href="tel:+18005551212" className="hover:text-primary">
                +1 (800) 555-1212
              </a>
            </InfoCard>
            <InfoCard Icon={Mail} title="Email">
              <a href="mailto:hello@devicehub.example" className="hover:text-primary">
                hello@devicehub.example
              </a>
            </InfoCard>
            <InfoCard Icon={Clock} title="Business hours">
              Mon–Fri · 8am–8pm CT
              <br />
              Sat–Sun · 10am–6pm CT
            </InfoCard>

            <div className="rounded-3xl border border-border/60 bg-card p-2">
              <div className="aspect-video overflow-hidden rounded-2xl bg-secondary">
                <iframe
                  title="Store location"
                  loading="lazy"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-97.7527%2C30.2635%2C-97.7327%2C30.2735&layer=mapnik"
                  className="size-full border-0"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 px-1">
              {[Twitter, Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">FAQ</div>
          <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">Common questions</h2>
        </div>
        <div className="mt-8 space-y-3">
          {FAQS.map((f, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-border/60 bg-card p-5 transition hover:border-primary/40"
            >
              <summary className="cursor-pointer list-none font-display font-semibold marker:hidden">
                <span className="flex items-center justify-between gap-3">
                  {f.q}
                  <span className="text-primary transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  children,
  error,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  hint?: string;
}) {
  return (
    <label className="mt-4 block first:mt-0">
      <span className="mb-1.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
        {hint && <span className="normal-case tracking-normal text-muted-foreground/70">{hint}</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function InfoCard({
  Icon,
  title,
  children,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-6">
      <span className="grid size-10 place-items-center rounded-xl gradient-brand text-white">
        <Icon className="size-5" />
      </span>
      <h3 className="mt-4 font-display text-sm font-semibold">{title}</h3>
      <div className="mt-1 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

const FAQS = [
  {
    q: "How fast is shipping?",
    a: "Free 2-day shipping on orders over $50 across the US. International orders arrive in 4–7 business days.",
  },
  {
    q: "What's your return policy?",
    a: "30-day no-questions-asked returns. We even cover return shipping for defects.",
  },
  {
    q: "Do devices come with a warranty?",
    a: "Every device includes a 2-year Device Hub warranty in addition to the manufacturer's warranty.",
  },
  {
    q: "How do I track my order?",
    a: "You'll receive a tracking link the moment your package ships. Real-time updates available in your account.",
  },
];
