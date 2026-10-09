"use client";

import { useState } from "react";
import Link from "next/link";
import "./GiftBoxes.css";

type BoxSize = "Small" | "Medium" | "Large";

type GiftBox = {
  id: string;
  category: string;
  name: string;
  badge: string;
  description: string;
  emoji: string;
  prices: {
    Small: number;
    Medium: number;
    Large: number;
  };
  gifts: {
    Small: string[];
    Medium: string[];
    Large: string[];
  };
};

const giftBoxes: GiftBox[] = [
  {
    id: "birthday-her",
    category: "Birthday",
    name: "Birthday Box for Her",
    badge: "BESTSELLER",
    description:
      "A sweet collection of cozy little gifts to make her birthday feel extra special.",
    emoji: "🎂",
    prices: {
      Small: 39,
      Medium: 49,
      Large: 59,
    },
    gifts: {
      Small: [
        "Sweet Mug",
        "Cozy Candle",
        "Birthday Card",
      ],
      Medium: [
        "Sweet Mug",
        "Cozy Candle",
        "Cozy Socks",
        "Little Notebook",
        "Birthday Card",
      ],
      Large: [
        "Sweet Mug",
        "Cozy Candle",
        "Cozy Socks",
        "Little Notebook",
        "Bath Salts",
        "Soft Blanket",
        "Birthday Card",
      ],
    },
  },

  {
    id: "birthday-him",
    category: "Birthday",
    name: "Birthday Box for Him",
    badge: "POPULAR",
    description:
      "A simple and thoughtful birthday collection made just for him.",
    emoji: "🎁",
    prices: {
      Small: 39,
      Medium: 49,
      Large: 59,
    },
    gifts: {
      Small: [
        "Sweet Mug",
        "Soft Everyday Socks",
        "Birthday Card",
      ],
      Medium: [
        "Sweet Mug",
        "Soft Everyday Socks",
        "Little Notebook",
        "Sweet Pen",
        "Birthday Card",
      ],
      Large: [
        "Sweet Mug",
        "Soft Everyday Socks",
        "Little Notebook",
        "Sweet Pen",
        "Cozy Candle",
        "Soft Blanket",
        "Birthday Card",
      ],
    },
  },

  {
    id: "thank-you",
    category: "Thank You",
    name: "Thank You Box",
    badge: "CUSTOMER FAVORITE",
    description:
      "A warm little collection to say thank you in a thoughtful way.",
    emoji: "💌",
    prices: {
      Small: 39,
      Medium: 49,
      Large: 59,
    },
    gifts: {
      Small: [
        "Cozy Candle",
        "Little Notebook",
        "Thank You Card",
      ],
      Medium: [
        "Cozy Candle",
        "Little Notebook",
        "Sweet Pen",
        "Bath Salts",
        "Thank You Card",
      ],
      Large: [
        "Cozy Candle",
        "Little Notebook",
        "Sweet Pen",
        "Bath Salts",
        "Cozy Socks",
        "Soft Blanket",
        "Thank You Card",
      ],
    },
  },

  {
    id: "just-because-her",
    category: "Just Because",
    name: "Just Because Box for Her",
    badge: "MOST LOVED",
    description:
      "A little surprise for someone who deserves something special today.",
    emoji: "💛",
    prices: {
      Small: 39,
      Medium: 49,
      Large: 59,
    },
    gifts: {
      Small: [
        "Cozy Candle",
        "Sweet Mug",
        "Little Moments Card",
      ],
      Medium: [
        "Cozy Candle",
        "Sweet Mug",
        "Cozy Socks",
        "Bath Salts",
        "Little Moments Card",
      ],
      Large: [
        "Cozy Candle",
        "Sweet Mug",
        "Cozy Socks",
        "Bath Salts",
        "Little Notebook",
        "Soft Blanket",
        "Little Moments Card",
      ],
    },
  },

  {
    id: "just-because-him",
    category: "Just Because",
    name: "Just Because Box for Him",
    badge: "NEW",
    description:
      "A simple surprise filled with useful and cozy little things.",
    emoji: "✨",
    prices: {
      Small: 39,
      Medium: 49,
      Large: 59,
    },
    gifts: {
      Small: [
        "Sweet Mug",
        "Soft Everyday Socks",
        "Little Moments Card",
      ],
      Medium: [
        "Sweet Mug",
        "Soft Everyday Socks",
        "Little Notebook",
        "Sweet Pen",
        "Little Moments Card",
      ],
      Large: [
        "Sweet Mug",
        "Soft Everyday Socks",
        "Little Notebook",
        "Sweet Pen",
        "Cozy Candle",
        "Soft Blanket",
        "Little Moments Card",
      ],
    },
  },

  {
    id: "cozy-night",
    category: "Cozy",
    name: "Cozy Night Box",
    badge: "COZY FAVORITE",
    description:
      "Everything they need for a quiet, cozy evening at home.",
    emoji: "🕯️",
    prices: {
      Small: 39,
      Medium: 49,
      Large: 59,
    },
    gifts: {
      Small: [
        "Cozy Candle",
        "Cozy Socks",
        "Little Moments Card",
      ],
      Medium: [
        "Cozy Candle",
        "Cozy Socks",
        "Sweet Mug",
        "Bath Salts",
        "Little Moments Card",
      ],
      Large: [
        "Cozy Candle",
        "Cozy Socks",
        "Sweet Mug",
        "Bath Salts",
        "Cozy Bath Bomb",
        "Soft Blanket",
        "Little Moments Card",
      ],
    },
  },

  {
    id: "self-care",
    category: "Self Care",
    name: "Self Care Box",
    badge: "SELF CARE",
    description:
      "A relaxing collection for slowing down and enjoying a little me-time.",
    emoji: "🌿",
    prices: {
      Small: 39,
      Medium: 49,
      Large: 59,
    },
    gifts: {
      Small: [
        "Bath Salts",
        "Cozy Candle",
        "Self Care Card",
      ],
      Medium: [
        "Bath Salts",
        "Cozy Candle",
        "Cozy Bath Bomb",
        "Cozy Socks",
        "Self Care Card",
      ],
      Large: [
        "Bath Salts",
        "Cozy Candle",
        "Cozy Bath Bomb",
        "Cozy Socks",
        "Sweet Mug",
        "Soft Blanket",
        "Self Care Card",
      ],
    },
  },

  {
    id: "thinking-of-you",
    category: "Thinking of You",
    name: "Thinking of You Box",
    badge: "THOUGHTFUL PICK",
    description:
      "A gentle little reminder that someone is thinking of them.",
    emoji: "🤍",
    prices: {
      Small: 39,
      Medium: 49,
      Large: 59,
    },
    gifts: {
      Small: [
        "Sweet Mug",
        "Cozy Candle",
        "Thinking of You Card",
      ],
      Medium: [
        "Sweet Mug",
        "Cozy Candle",
        "Little Notebook",
        "Cozy Socks",
        "Thinking of You Card",
      ],
      Large: [
        "Sweet Mug",
        "Cozy Candle",
        "Little Notebook",
        "Cozy Socks",
        "Bath Salts",
        "Soft Blanket",
        "Thinking of You Card",
      ],
    },
  },
];

const categories = [
  "All",
  "Birthday",
  "Thank You",
  "Just Because",
  "Cozy",
  "Self Care",
  "Thinking of You",
];

export default function GiftBoxes() {
  const [activeCategory, setActiveCategory] =
    useState("All");

  const [openBox, setOpenBox] = useState<
    string | null
  >(null);

  const [selectedSizes, setSelectedSizes] =
    useState<Record<string, BoxSize>>({});

  const filteredBoxes =
    activeCategory === "All"
      ? giftBoxes
      : giftBoxes.filter(
          (box) =>
            box.category === activeCategory,
        );

  const getSelectedSize = (
    boxId: string,
  ): BoxSize => {
    return selectedSizes[boxId] || "Medium";
  };

  const selectSize = (
    boxId: string,
    size: BoxSize,
  ) => {
    setSelectedSizes((current) => ({
      ...current,
      [boxId]: size,
    }));
  };

  const toggleBox = (boxId: string) => {
    setOpenBox((current) =>
      current === boxId ? null : boxId,
    );
  };

  return (
    <section
      id="gift-boxes"
      className="gift-boxes-section"
    >
      <div className="gift-boxes-container">
        <div className="gift-boxes-header">
          <div>
            <p className="gift-boxes-eyebrow">
              THOUGHTFULLY CURATED
            </p>

            <h1>Gift Boxes</h1>

            <p className="gift-boxes-intro">
              Beautifully put-together gifts for
              birthdays, thank-yous, cozy moments,
              and everything in between.
            </p>
          </div>
        </div>

        <div className="gift-boxes-categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                activeCategory === category
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveCategory(category)
              }
            >
              {category}
            </button>
          ))}
        </div>

        <div className="gift-boxes-grid">
          {filteredBoxes.map((box) => {
            const selectedSize = getSelectedSize(
              box.id,
            );

            const isOpen = openBox === box.id;

            return (
              <article
                key={box.id}
                className={`gift-box-card ${
                  isOpen ? "is-open" : ""
                }`}
              >
                <div className="gift-box-image">
                  <div className="gift-box-decoration gift-box-decoration-one" />

                  <div className="gift-box-decoration gift-box-decoration-two" />

                  <div className="gift-box-visual">
                    <span>{box.emoji}</span>

                    <div className="gift-box-lid" />

                    <div className="gift-box-body" />

                    <div className="gift-box-ribbon" />
                  </div>

                  <span className="gift-box-badge">
                    {box.badge}
                  </span>
                </div>

                <div className="gift-box-content">
                  <p className="gift-box-tag">
                    {box.category.toUpperCase()}
                  </p>

                  <h2>{box.name}</h2>

                  <p className="gift-box-description">
                    {box.description}
                  </p>

                  <div className="gift-box-sizes">
                    {(
                      [
                        "Small",
                        "Medium",
                        "Large",
                      ] as BoxSize[]
                    ).map((size) => (
                      <button
                        key={size}
                        type="button"
                        className={
                          selectedSize === size
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          selectSize(box.id, size)
                        }
                      >
                        <span>{size}</span>

                        <strong>
                          ${box.prices[size]}
                        </strong>
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="gift-box-inside-button"
                    onClick={() =>
                      toggleBox(box.id)
                    }
                  >
                    {isOpen
                      ? "Hide what's inside"
                      : "See what's inside"}

                    <span>
                      {isOpen ? "↑" : "↓"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="gift-box-inside">
                      <p>
                        {selectedSize} includes{" "}
                        {
                          box.gifts[selectedSize]
                            .length
                        }{" "}
                        gifts:
                      </p>

                      <ul>
                        {box.gifts[
                          selectedSize
                        ].map((gift) => (
                          <li key={gift}>
                            <span>✦</span>
                            {gift}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    type="button"
                    className="gift-box-button"
                    onClick={() => {
                      const selectedSize =
                        getSelectedSize(box.id);

                      const savedCart =
                        localStorage.getItem(
                          "little-moments-cart",
                        );

                      let cart: unknown[] = [];

                      if (savedCart) {
                        try {
                          const parsedCart =
                            JSON.parse(savedCart);

                          if (
                            Array.isArray(
                              parsedCart,
                            )
                          ) {
                            cart = parsedCart;
                          }
                        } catch {
                          cart = [];
                        }
                      }

                      const newGiftBox = {
                        type: "gift-box",
                        id: `${box.id}-${selectedSize.toLowerCase()}-${Date.now()}`,
                        boxId: box.id,
                        boxName: box.name,
                        boxSize: selectedSize,
                        boxPrice:
                          box.prices[
                            selectedSize
                          ],
                        gifts:
                          box.gifts[selectedSize],
                        card:
                          box.gifts[
                            selectedSize
                          ].find((gift) =>
                            gift
                              .toLowerCase()
                              .includes("card"),
                          ) || "Gift Card",
                        message: "",
                      };

                      cart.push(newGiftBox);

                      localStorage.setItem(
                        "little-moments-cart",
                        JSON.stringify(cart),
                      );

                      window.dispatchEvent(
                        new Event("cart-updated"),
                      );
                    }}
                  >
                    Choose This Box
                    <span>→</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="gift-boxes-bottom">
          <span>✦</span>

          <p>
            Want to choose every little detail?
          </p>

          <Link href="/#builder">
            Build Your Own Gift Box →
          </Link>
        </div>
      </div>
    </section>
  );
}
