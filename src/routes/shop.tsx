import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { PRODUCTS, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  category: z.string().optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  component: Shop,
  head: () => ({
    meta: [
      { title: "Shop — Device Hub" },
      { name: "description", content: "Browse phones, laptops, audio, wearables and more." },
    ],
  }),
});

const BRANDS = Array.from(new Set(PRODUCTS.map((p) => p.brand)));
const CATS = Array.from(new Set(PRODUCTS.map((p) => p.category)));
const SORTS = [
  { v: "new", label: "Newest" },
  { v: "asc", label: "Price: Low → High" },
  { v: "desc", label: "Price: High → Low" },
  { v: "pop", label: "Popularity" },
] as const;
type Sort = (typeof SORTS)[number]["v"];

function Shop() {
  const s = Route.useSearch();
  const [q, setQ] = useState(s.q ?? "");
  const [cats, setCats] = useState<string[]>(s.category ? [s.category] : []);
  const [brands, setBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2500);
  const [inStock, setInStock] = useState(false);
  const [sort, setSort] = useState<Sort>("new");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      if (term && !`${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(term)) return false;
      if (cats.length && !cats.includes(p.category)) return false;
      if (brands.length && !brands.includes(p.brand)) return false;
      if (p.rating < minRating) return false;
      if (p.price > maxPrice) return false;
      if (inStock && p.stock <= 0) return false;
      return true;
    });
    switch (sort) {
      case "asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "pop":
        list = [...list].sort((a, b) => b.reviews - a.reviews);
        break;
    }
    return list;
  }, [q, cats, brands, minRating, maxPrice, inStock, sort]);

  const toggle = (arr: string[], setArr: (v: string[]) => void, v: string) =>
    setArr(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const reset = () => {
    setQ("");
    setCats([]);
    setBrands([]);
    setMinRating(0);
    setMaxPrice(2500);
    setInStock(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Shop the collection</h1>
        <p className="text-sm text-muted-foreground">
          {filtered.length} device{filtered.length === 1 ? "" : "s"} available
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value.slice(0, 100))}
            placeholder="Search devices, brands, categories…"
            className="w-full rounded-full border border-border bg-secondary/40 py-3 pl-11 pr-4 text-sm outline-none focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/30"
            aria-label="Search products"
          />
        </label>
        <div className="flex gap-2">
          <select
            aria-label="Sort by"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
          >
            {SORTS.map((s) => (
              <option key={s.v} value={s.v}>
                {s.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-3 text-sm font-medium lg:hidden"
          >
            <SlidersHorizontal className="size-4" /> Filters
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside
          className={cn(
            "space-y-6 lg:block",
            showFilters ? "block" : "hidden",
          )}
        >
          <FilterGroup title="Category">
            {CATS.map((c) => (
              <Check
                key={c}
                label={c}
                checked={cats.includes(c)}
                onChange={() => toggle(cats, setCats, c)}
              />
            ))}
          </FilterGroup>
          <FilterGroup title="Brand">
            {BRANDS.map((b) => (
              <Check
                key={b}
                label={b}
                checked={brands.includes(b)}
                onChange={() => toggle(brands, setBrands, b)}
              />
            ))}
          </FilterGroup>
          <FilterGroup title={`Max price: $${maxPrice}`}>
            <input
              type="range"
              min={100}
              max={2500}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-primary"
              aria-label="Max price"
            />
          </FilterGroup>
          <FilterGroup title="Rating">
            {[4.5, 4, 3.5].map((r) => (
              <Check
                key={r}
                label={`${r}+ stars`}
                checked={minRating === r}
                onChange={() => setMinRating(minRating === r ? 0 : r)}
              />
            ))}
          </FilterGroup>
          <FilterGroup title="Availability">
            <Check
              label="In stock only"
              checked={inStock}
              onChange={() => setInStock((v) => !v)}
            />
          </FilterGroup>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <X className="size-4" /> Clear all filters
          </button>
        </aside>

        <div>
          {filtered.length === 0 ? (
            <EmptyResults onClear={reset} />
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-4">
      <h3 className="font-display text-sm font-semibold">{title}</h3>
      <div className="mt-3 space-y-2">{children}</div>
    </div>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground/85">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="size-4 rounded border-border accent-primary"
      />
      {label}
    </label>
  );
}

function EmptyResults({ onClear }: { onClear: () => void }) {
  return (
    <div className="rounded-3xl border border-dashed border-border p-12 text-center">
      <h3 className="font-display text-lg font-semibold">No devices match those filters</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Try relaxing a filter or clearing them all.
      </p>
      <button
        onClick={onClear}
        className="mt-4 rounded-full gradient-brand px-4 py-2 text-sm font-semibold text-white"
      >
        Clear filters
      </button>
    </div>
  );
}

// Suppresses unused import warnings from earlier scaffolding
export type _ = Product;
