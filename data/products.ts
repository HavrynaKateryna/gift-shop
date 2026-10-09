import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "cozy-candle",
    name: "Cozy Candle",
    slug: "cozy-candle",
    description:
      "A warm, comforting candle for cozy evenings.",
    price: 12,
    image: "/images/products/cozy-candle.jpg",
    category: "Home & Cozy",
    occasions: [
      "Birthday",
      "Just Because",
      "Thank You",
    ],
    featured: true,
  },
  {
    id: "sweet-mug",
    name: "Sweet Mug",
    slug: "sweet-mug",
    description:
      "A charming mug made for coffee, tea, and little moments.",
    price: 14,
    image: "/images/products/sweet-mug.jpg",
    category: "Home & Cozy",
    occasions: ["Birthday", "For Her", "For Him"],
    featured: true,
  },
  {
    id: "cozy-socks",
    name: "Cozy Socks",
    slug: "cozy-socks",
    description:
      "Soft and cozy socks for relaxing at home.",
    price: 10,
    image: "/images/products/cozy-socks.jpg",
    category: "Cozy",
    occasions: [
      "Birthday",
      "Just Because",
      "For Her",
    ],
    featured: true,
  },
  {
    id: "little-notebook",
    name: "Little Notebook",
    slug: "little-notebook",
    description:
      "A simple little notebook for thoughts, lists, and ideas.",
    price: 9,
    image: "/images/products/little-notebook.jpg",
    category: "Stationery",
    occasions: [
      "Birthday",
      "Thank You",
      "For Her",
    ],
    featured: true,
  },
  {
    id: "sweet-pen",
    name: "Sweet Pen",
    slug: "sweet-pen",
    description:
      "A beautiful everyday pen to pair with a thoughtful gift.",
    price: 6,
    image: "/images/products/sweet-pen.jpg",
    category: "Stationery",
    occasions: [
      "Birthday",
      "Thank You",
      "For Her",
    ],
  },
  {
    id: "bath-salts",
    name: "Bath Salts",
    slug: "bath-salts",
    description:
      "A relaxing bath-time treat for a little self-care.",
    price: 11,
    image: "/images/products/bath-salts.jpg",
    category: "Self Care",
    occasions: [
      "Birthday",
      "Just Because",
      "For Her",
    ],
    featured: true,
  },
  {
    id: "soft-blanket",
    name: "Soft Blanket",
    slug: "soft-blanket",
    description:
      "A soft blanket made for cozy mornings and quiet evenings.",
    price: 18,
    image: "/images/products/soft-blanket.jpg",
    category: "Cozy",
    occasions: [
      "Birthday",
      "Just Because",
      "For Her",
      "For Him",
    ],
    featured: true,
  },
  {
    id: "greeting-card",
    name: "Little Moments Card",
    slug: "little-moments-card",
    description:
      "A thoughtful card to add a personal touch to any gift.",
    price: 5,
    image: "/images/products/greeting-card.jpg",
    category: "Cards",
    occasions: [
      "Birthday",
      "Thank You",
      "Just Because",
    ],
  },
  {
    id: "cozy-bath-bomb",
    name: "Cozy Bath Bomb",
    slug: "cozy-bath-bomb",
    description:
      "A simple little treat for a relaxing evening.",
    price: 7,
    image: "/images/products/cozy-bath-bomb.jpg",
    category: "Self Care",
    occasions: [
      "Birthday",
      "Just Because",
      "For Her",
    ],
  },
  {
    id: "soft-socks",
    name: "Soft Everyday Socks",
    slug: "soft-everyday-socks",
    description:
      "Comfortable everyday socks for a cozy little extra.",
    price: 10,
    image:
      "/images/products/soft-everyday-socks.jpg",
    category: "Cozy",
    occasions: ["Birthday", "For Him", "For Her"],
  },
];
