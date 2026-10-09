"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import "./Shop.css";

const categories = [
  "All",
  "Home & Cozy",
  "Cozy",
  "Stationery",
  "Self Care",
  "Cards",
];

const productEmoji: Record<string, string> = {
  "cozy-candle": "🕯️",
  "sweet-mug": "☕",
  "cozy-socks": "🧦",
  "little-notebook": "📓",
  "sweet-pen": "🖊️",
  "bath-salts": "🛁",
  "soft-blanket": "🧺",
  "greeting-card": "💌",
  "cozy-bath-bomb": "🫧",
  "soft-socks": "🧦",
};

export default function Shop() {
  const [activeCategory, setActiveCategory] =
    useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category === activeCategory,
        );

  return (
    <section id="shop" className="shop-section">
      <div className="shop-container">
        <div className="shop-header">
          <div>
            <p className="shop-eyebrow">
              LITTLE THINGS, BIG FEELINGS
            </p>

            <h2>Shop Our Gifts</h2>

            <p className="shop-description">
              Thoughtful little gifts chosen to
              make every moment feel special.
            </p>
          </div>

          <Link
            href="/#builder"
            className="shop-builder-link"
          >
            Build Your Own Gift
            <span>→</span>
          </Link>
        </div>

        <div className="shop-categories">
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

        <div className="shop-grid">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="shop-product-card"
            >
              <div className="shop-product-image">
                <span>
                  {productEmoji[product.id] ||
                    "✦"}
                </span>

                {product.featured && (
                  <span className="shop-product-badge">
                    Featured
                  </span>
                )}

                <button
                  type="button"
                  className="shop-product-heart"
                  aria-label={`Save ${product.name}`}
                >
                  ♡
                </button>
              </div>

              <div className="shop-product-content">
                <p className="shop-product-category">
                  {product.category}
                </p>

                <h3>{product.name}</h3>

                <p className="shop-product-description">
                  {product.description}
                </p>

                <div className="shop-product-bottom">
                  <strong>
                    ${product.price}
                  </strong>

                  <button
                    type="button"
                    className="shop-add-button"
                    onClick={() => {
                      const savedCart =
                        localStorage.getItem(
                          "little-moments-products-cart",
                        );

                      let cart = [];

                      if (savedCart) {
                        try {
                          cart =
                            JSON.parse(savedCart);
                        } catch {
                          cart = [];
                        }
                      }

                      const existingProduct =
                        cart.find(
                          (item: {
                            id: string;
                          }) =>
                            item.id ===
                            product.id,
                        );

                      if (existingProduct) {
                        existingProduct.quantity += 1;
                      } else {
                        cart.push({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          quantity: 1,
                        });
                      }

                      localStorage.setItem(
                        "little-moments-products-cart",
                        JSON.stringify(cart),
                      );

                      window.dispatchEvent(
                        new Event(
                          "products-cart-updated",
                        ),
                      );
                    }}
                  >
                    Add to Cart
                    <span>+</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="shop-no-products">
            <p>
              No gifts found in this category.
            </p>
          </div>
        )}

        <div className="shop-bottom">
          <p>
            Looking for something extra special?
          </p>

          <Link
            href="/#builder"
            className="shop-builder-link"
          >
            Build Your Own Gift
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
