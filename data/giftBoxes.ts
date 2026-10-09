import { GiftBox } from "@/types/giftBox";

export const giftBoxes: GiftBox[] = [
  {
    id: "cozy-moment",
    name: "The Cozy Moment",
    slug: "the-cozy-moment",
    description:
      "A warm and cozy little gift for slow mornings and quiet evenings.",
    price: 49,
    image: "/images/gift-boxes/cozy-moment.jpg",
    productIds: [
      "soft-blanket",
      "sweet-mug",
      "cozy-socks",
    ],
    occasions: [
      "Just Because",
      "For Her",
      "Birthday",
    ],
    featured: true,
  },

  {
    id: "little-self-care",
    name: "A Little Self-Care",
    slug: "a-little-self-care",
    description:
      "A thoughtful collection made for relaxing, unwinding, and feeling cared for.",
    price: 54,
    image: "/images/gift-boxes/self-care.jpg",
    productIds: [
      "cozy-candle",
      "bath-salts",
      "little-notebook",
    ],
    occasions: [
      "For Her",
      "Birthday",
      "Just Because",
    ],
    featured: true,
  },

  {
    id: "thinking-of-you",
    name: "Thinking of You",
    slug: "thinking-of-you",
    description:
      "A sweet little reminder that someone is thinking about them.",
    price: 44,
    image:
      "/images/gift-boxes/thinking-of-you.jpg",
    productIds: [
      "sweet-mug",
      "cozy-candle",
      "greeting-card",
    ],
    occasions: [
      "Thinking of You",
      "Just Because",
      "Thank You",
    ],
    featured: true,
  },

  {
    id: "just-because",
    name: "Just Because",
    slug: "just-because",
    description:
      "No special occasion needed. Just a beautiful little surprise.",
    price: 39,
    image: "/images/gift-boxes/just-because.jpg",
    productIds: [
      "little-notebook",
      "sweet-pen",
      "cozy-socks",
    ],
    occasions: [
      "Just Because",
      "For Her",
      "For Him",
    ],
    featured: true,
  },
];
