export type Product = {
  id: string;
  name: string;
  brand: string;
  category: "Phones" | "Laptops" | "Audio" | "Wearables" | "Gaming" | "Tablets";
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  colors: string[];
  storage?: string[];
  image: string;
  gallery: string[];
  tagline: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  badge?: string;
  bestSeller?: boolean;
  featured?: boolean;
  flashSale?: boolean;
};

// Unsplash source URLs (loaded lazily via <img loading="lazy" />)
const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const PRODUCTS: Product[] = [
  {
    id: "aurora-pro-15",
    name: "Aurora Pro 15",
    brand: "Nova",
    category: "Laptops",
    price: 1899,
    oldPrice: 2199,
    rating: 4.8,
    reviews: 1284,
    stock: 24,
    colors: ["#0F172A", "#F8FAFC", "#94A3B8"],
    storage: ["512GB", "1TB", "2TB"],
    image: img("photo-1517336714731-489689fd1ca8"),
    gallery: [
      img("photo-1517336714731-489689fd1ca8"),
      img("photo-1496181133206-80ce9b88a853"),
      img("photo-1541807084-5c52b6b3adef"),
    ],
    tagline: "Studio-grade performance in a whisper-thin frame",
    description:
      "The Aurora Pro 15 pairs a 3K OLED display with a 14-core neural chip, engineered for creators who move fast and never compromise.",
    features: [
      "3K OLED 120Hz display",
      "14-core Nova N1 chip",
      "22-hour battery life",
      "Studio-grade six-speaker array",
    ],
    specs: {
      Display: "15.4\" 3K OLED, 120Hz",
      Processor: "Nova N1 (14-core)",
      Memory: "16GB / 32GB unified",
      Battery: "Up to 22 hours",
      Weight: "1.55 kg",
      Ports: "3× Thunderbolt 5, HDMI, SDXC",
    },
    badge: "New",
    featured: true,
    bestSeller: true,
  },
  {
    id: "nova-phone-x",
    name: "Nova Phone X",
    brand: "Nova",
    category: "Phones",
    price: 1099,
    oldPrice: 1299,
    rating: 4.9,
    reviews: 3421,
    stock: 58,
    colors: ["#0F172A", "#2563EB", "#F8FAFC"],
    storage: ["128GB", "256GB", "512GB"],
    image: img("photo-1511707171634-5f897ff02aa9"),
    gallery: [
      img("photo-1511707171634-5f897ff02aa9"),
      img("photo-1592750475338-74b7b21085ab"),
      img("photo-1580910051074-3eb694886505"),
    ],
    tagline: "A camera system reimagined",
    description:
      "Nova Phone X introduces a triple-sensor imaging system, titanium frame, and the fastest mobile chip we've ever built.",
    features: ["6.7\" ProMotion OLED", "Triple 48MP camera", "Titanium unibody", "Satellite SOS"],
    specs: {
      Display: "6.7\" LTPO OLED, 120Hz",
      Chip: "Nova A18 Bionic",
      Camera: "48MP + 48MP + 12MP telephoto",
      Battery: "Up to 29h video",
      Water: "IP68",
    },
    badge: "-15%",
    featured: true,
    bestSeller: true,
    flashSale: true,
  },
  {
    id: "pulse-buds-2",
    name: "Pulse Buds 2",
    brand: "Pulse",
    category: "Audio",
    price: 199,
    oldPrice: 249,
    rating: 4.7,
    reviews: 2109,
    stock: 120,
    colors: ["#F8FAFC", "#0F172A", "#06B6D4"],
    image: img("photo-1590658268037-6bf12165a8df"),
    gallery: [
      img("photo-1590658268037-6bf12165a8df"),
      img("photo-1606220588913-b3aacb4d2f46"),
      img("photo-1608156639585-b3a032ef9689"),
    ],
    tagline: "Immersive sound, disappearing design",
    description:
      "Adaptive audio, spatial sound, and up to 40 hours of listening time in a case smaller than a matchbox.",
    features: ["Active noise cancellation", "Spatial audio", "40h battery", "Wireless charging"],
    specs: {
      Driver: "11mm custom",
      Battery: "8h buds / 40h case",
      Charging: "USB-C, Qi wireless",
      Water: "IPX4",
    },
    badge: "Hot",
    featured: true,
    flashSale: true,
  },
  {
    id: "orbit-watch-3",
    name: "Orbit Watch 3",
    brand: "Orbit",
    category: "Wearables",
    price: 349,
    oldPrice: 399,
    rating: 4.6,
    reviews: 942,
    stock: 40,
    colors: ["#0F172A", "#F8FAFC", "#2563EB"],
    image: img("photo-1523275335684-37898b6baf30"),
    gallery: [
      img("photo-1523275335684-37898b6baf30"),
      img("photo-1508685096489-7aacd43bd3b1"),
      img("photo-1579586337278-3befd40fd17a"),
    ],
    tagline: "Your health, always in orbit",
    description:
      "Continuous glucose insights, ECG, and a sapphire always-on display in a titanium case.",
    features: ["Always-on retina display", "ECG + SpO2", "5-day battery", "50m water resistant"],
    specs: {
      Case: "Titanium 44mm",
      Display: "AMOLED always-on",
      Battery: "Up to 5 days",
      Sensors: "ECG, SpO2, temp",
    },
    bestSeller: true,
  },
  {
    id: "rift-console-x",
    name: "Rift Console X",
    brand: "Rift",
    category: "Gaming",
    price: 599,
    rating: 4.8,
    reviews: 5120,
    stock: 12,
    colors: ["#0F172A", "#F8FAFC"],
    storage: ["1TB", "2TB"],
    image: img("photo-1606144042614-b2417e99c4e3"),
    gallery: [
      img("photo-1606144042614-b2417e99c4e3"),
      img("photo-1493711662062-fa541adb3fc8"),
      img("photo-1621259182978-fbf93132d53d"),
    ],
    tagline: "Next-gen worlds, zero load",
    description:
      "4K120 gaming with instant loads, ray tracing, and a haptic controller that feels every rumble.",
    features: ["4K @ 120Hz", "Ray tracing", "Instant resume", "3D audio"],
    specs: { GPU: "Rift RDNA 3", CPU: "8-core Zen 4", Storage: "1TB NVMe", Output: "HDMI 2.1" },
    badge: "Limited",
    featured: true,
  },
  {
    id: "slate-tab-pro",
    name: "Slate Tab Pro",
    brand: "Nova",
    category: "Tablets",
    price: 899,
    oldPrice: 999,
    rating: 4.7,
    reviews: 762,
    stock: 33,
    colors: ["#F8FAFC", "#0F172A"],
    storage: ["256GB", "512GB", "1TB"],
    image: img("photo-1544244015-0df4b3ffc6b0"),
    gallery: [
      img("photo-1544244015-0df4b3ffc6b0"),
      img("photo-1561154464-82e9adf32764"),
      img("photo-1512499617640-c74ae3a79d37"),
    ],
    tagline: "The canvas that thinks with you",
    description:
      "A 12.9\" mini-LED canvas paired with the Nova Pencil for lag-free ideation anywhere.",
    features: ["12.9\" mini-LED", "Nova Pencil support", "Face ID", "5G ready"],
    specs: { Display: "12.9\" mini-LED", Chip: "Nova M3", Battery: "10h", Weight: "682g" },
    bestSeller: true,
  },
  {
    id: "echo-speaker",
    name: "Echo Speaker",
    brand: "Pulse",
    category: "Audio",
    price: 249,
    rating: 4.5,
    reviews: 431,
    stock: 80,
    colors: ["#0F172A", "#F8FAFC", "#06B6D4"],
    image: img("photo-1608043152269-423dbba4e7e1"),
    gallery: [
      img("photo-1608043152269-423dbba4e7e1"),
      img("photo-1545454675-3531b543be5d"),
      img("photo-1516981879613-9f5da904015f"),
    ],
    tagline: "Room-filling sound in your palm",
    description: "360° acoustics with adaptive EQ that tunes to any room instantly.",
    features: ["360° sound", "24h battery", "Waterproof IP67", "Stereo pair"],
    specs: { Drivers: "Dual 20W", Battery: "24h", Bluetooth: "5.3" },
  },
  {
    id: "vault-drive-1tb",
    name: "Vault Drive 1TB",
    brand: "Vault",
    category: "Laptops",
    price: 129,
    oldPrice: 159,
    rating: 4.4,
    reviews: 289,
    stock: 200,
    colors: ["#0F172A"],
    image: img("photo-1531492746076-161ca9bcad58"),
    gallery: [
      img("photo-1531492746076-161ca9bcad58"),
      img("photo-1587202372775-e229f172b9d7"),
    ],
    tagline: "Pocket-sized 2GB/s storage",
    description: "Encrypted NVMe portable SSD with USB-C 3.2 Gen 2.",
    features: ["2GB/s reads", "AES-256 encryption", "Rugged aluminum shell"],
    specs: { Speed: "2000 MB/s", Interface: "USB-C 3.2", Capacity: "1TB" },
    flashSale: true,
  },
];

export const CATEGORIES: { name: Product["category"]; blurb: string; image: string }[] = [
  { name: "Phones", blurb: "Flagship & mid-range", image: img("photo-1512428559087-560fa5ceab42") },
  { name: "Laptops", blurb: "Creator & pro machines", image: img("photo-1496181133206-80ce9b88a853") },
  { name: "Audio", blurb: "Buds, cans & speakers", image: img("photo-1590658268037-6bf12165a8df") },
  { name: "Wearables", blurb: "Watches & rings", image: img("photo-1523275335684-37898b6baf30") },
  { name: "Gaming", blurb: "Consoles & gear", image: img("photo-1606144042614-b2417e99c4e3") },
  { name: "Tablets", blurb: "Draw, note, create", image: img("photo-1544244015-0df4b3ffc6b0") },
];

export function findProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

export function relatedProducts(id: string, count = 4) {
  const p = findProduct(id);
  if (!p) return PRODUCTS.slice(0, count);
  return PRODUCTS.filter((x) => x.id !== id && x.category === p.category).concat(
    PRODUCTS.filter((x) => x.id !== id && x.category !== p.category),
  ).slice(0, count);
}
