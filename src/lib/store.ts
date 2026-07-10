import { useEffect, useState, useSyncExternalStore } from "react";
import type { Product } from "./products";

type CartItem = { id: string; qty: number; color?: string; storage?: string };
type State = {
  cart: CartItem[];
  wishlist: string[];
  recent: string[];
};

const KEY = "devicehub_state_v1";
let state: State = { cart: [], wishlist: [], recent: [] };
const listeners = new Set<() => void>();

function load() {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) state = { cart: [], wishlist: [], recent: [], ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
}
function persist() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}
function emit() {
  persist();
  listeners.forEach((l) => l());
}

export const store = {
  get: () => state,
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  addToCart(id: string, opts: { qty?: number; color?: string; storage?: string } = {}) {
    const qty = opts.qty ?? 1;
    const existing = state.cart.find(
      (i) => i.id === id && i.color === opts.color && i.storage === opts.storage,
    );
    if (existing) existing.qty += qty;
    else state.cart = [...state.cart, { id, qty, color: opts.color, storage: opts.storage }];
    emit();
  },
  updateQty(idx: number, qty: number) {
    if (qty <= 0) state.cart = state.cart.filter((_, i) => i !== idx);
    else state.cart = state.cart.map((c, i) => (i === idx ? { ...c, qty } : c));
    emit();
  },
  removeAt(idx: number) {
    state.cart = state.cart.filter((_, i) => i !== idx);
    emit();
  },
  clearCart() {
    state.cart = [];
    emit();
  },
  toggleWishlist(id: string) {
    state.wishlist = state.wishlist.includes(id)
      ? state.wishlist.filter((x) => x !== id)
      : [...state.wishlist, id];
    emit();
  },
  markRecent(id: string) {
    state.recent = [id, ...state.recent.filter((x) => x !== id)].slice(0, 6);
    emit();
  },
};

let loaded = false;
export function useStore<T>(selector: (s: State) => T): T {
  if (!loaded && typeof window !== "undefined") {
    load();
    loaded = true;
  }
  return useSyncExternalStore(
    store.subscribe,
    () => selector(state),
    () => selector({ cart: [], wishlist: [], recent: [] }),
  );
}

export function useHydrated() {
  const [h, setH] = useState(false);
  useEffect(() => setH(true), []);
  return h;
}

export function cartTotal(items: CartItem[], products: Product[]) {
  return items.reduce((sum, it) => {
    const p = products.find((x) => x.id === it.id);
    return sum + (p ? p.price * it.qty : 0);
  }, 0);
}

export type { CartItem };
