import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const emailSchema = z.string().trim().email({ message: "Enter a valid email" }).max(255);

export function Footer() {
  const [email, setEmail] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = emailSchema.safeParse(email);
    if (!r.success) return toast.error(r.error.issues[0]?.message ?? "Invalid email");
    toast.success("Subscribed! Watch your inbox for early drops.");
    setEmail("");
  };

  return (
    <footer className="mt-24 border-t border-border/60 bg-gradient-to-b from-background to-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
              <span className="grid size-9 place-items-center rounded-xl gradient-brand text-white">
                <Zap className="size-5" strokeWidth={2.5} />
              </span>
              Device<span className="gradient-text">Hub</span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Premium electronics for students, professionals, gamers and creators. Free 2-day shipping,
              30-day returns, and a warranty you can trust.
            </p>
            <form onSubmit={submit} className="mt-6 flex max-w-md gap-2">
              <label className="sr-only" htmlFor="footer-email">Email</label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.slice(0, 255))}
                placeholder="you@domain.com"
                className="w-full rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                autoComplete="email"
                required
              />
              <button className="rounded-full gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:brightness-110">
                Join
              </button>
            </form>
          </div>

          <FooterCol title="Shop" links={[
            ["/shop", "All Products"],
            ["/shop", "Best Sellers"],
            ["/shop", "Flash Sale"],
            ["/shop", "New Arrivals"],
          ]} />
          <FooterCol title="Support" links={[
            ["/contact", "Contact"],
            ["/contact", "FAQ"],
            ["/about", "About Us"],
            ["/contact", "Warranty"],
          ]} />
          <FooterCol title="Legal" links={[
            ["/", "Privacy Policy"],
            ["/", "Terms & Conditions"],
            ["/", "Refund Policy"],
            ["/", "Cookies"],
          ]} />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Device Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            {[Twitter, Instagram, Facebook, Youtube, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social link"
                className="grid size-9 place-items-center rounded-full text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="font-display text-sm font-semibold">{title}</h4>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map(([to, label]) => (
          <li key={label}>
            <Link to={to} className="text-muted-foreground transition hover:text-foreground">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
