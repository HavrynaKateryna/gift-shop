"use client";

import { useEffect, useState } from "react";
import "./Cart.css";

type GiftBoxItem = {
  type: "gift-box";
  id: string;
  boxName: string;
  boxPrice: number;
  gifts: string[];
  card: string;
  message: string;
};

type ProductCartItem = {
  type: "product";
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartItem = GiftBoxItem | ProductCartItem;

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>(
    [],
  );
  const [isOpen, setIsOpen] = useState(false);

  const loadCart = () => {
    const savedGiftBoxes = localStorage.getItem(
      "little-moments-cart",
    );

    const savedProducts = localStorage.getItem(
      "little-moments-products-cart",
    );

    const giftBoxes: GiftBoxItem[] = [];
    const products: ProductCartItem[] = [];

    if (savedGiftBoxes) {
      try {
        const parsed = JSON.parse(savedGiftBoxes);

        if (Array.isArray(parsed)) {
          parsed.forEach((item) => {
            giftBoxes.push({
              ...item,
              type: "gift-box",
            });
          });
        }
      } catch {
        // Ignore invalid gift box cart
      }
    }

    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);

        if (Array.isArray(parsed)) {
          parsed.forEach((item) => {
            products.push({
              ...item,
              type: "product",
            });
          });
        }
      } catch {
        // Ignore invalid product cart
      }
    }

    setCart([...giftBoxes, ...products]);
  };

  useEffect(() => {
    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener(
      "cart-updated",
      handleCartUpdate,
    );

    window.addEventListener(
      "products-cart-updated",
      handleCartUpdate,
    );

    const timer = window.setTimeout(() => {
      loadCart();
    }, 0);

    return () => {
      window.clearTimeout(timer);

      window.removeEventListener(
        "cart-updated",
        handleCartUpdate,
      );

      window.removeEventListener(
        "products-cart-updated",
        handleCartUpdate,
      );
    };
  }, []);

  const removeGiftBox = (id: string) => {
    const savedCart = localStorage.getItem(
      "little-moments-cart",
    );

    if (!savedCart) {
      return;
    }

    try {
      const currentCart = JSON.parse(savedCart);

      const updatedCart = currentCart.filter(
        (item: GiftBoxItem) => item.id !== id,
      );

      localStorage.setItem(
        "little-moments-cart",
        JSON.stringify(updatedCart),
      );

      window.dispatchEvent(
        new Event("cart-updated"),
      );
    } catch {
      return;
    }
  };

  const removeProduct = (id: string) => {
    const savedCart = localStorage.getItem(
      "little-moments-products-cart",
    );

    if (!savedCart) {
      return;
    }

    try {
      const currentCart = JSON.parse(savedCart);

      const updatedCart = currentCart.filter(
        (item: ProductCartItem) => item.id !== id,
      );

      localStorage.setItem(
        "little-moments-products-cart",
        JSON.stringify(updatedCart),
      );

      window.dispatchEvent(
        new Event("products-cart-updated"),
      );
    } catch {
      return;
    }
  };

  const decreaseProduct = (id: string) => {
    const savedCart = localStorage.getItem(
      "little-moments-products-cart",
    );

    if (!savedCart) {
      return;
    }

    try {
      const currentCart: ProductCartItem[] =
        JSON.parse(savedCart);

      const updatedCart = currentCart
        .map((item) => {
          if (item.id !== id) {
            return item;
          }

          return {
            ...item,
            quantity: item.quantity - 1,
          };
        })
        .filter((item) => item.quantity > 0);

      localStorage.setItem(
        "little-moments-products-cart",
        JSON.stringify(updatedCart),
      );

      window.dispatchEvent(
        new Event("products-cart-updated"),
      );
    } catch {
      return;
    }
  };

  const increaseProduct = (id: string) => {
    const savedCart = localStorage.getItem(
      "little-moments-products-cart",
    );

    if (!savedCart) {
      return;
    }

    try {
      const currentCart: ProductCartItem[] =
        JSON.parse(savedCart);

      const updatedCart = currentCart.map(
        (item) => {
          if (item.id !== id) {
            return item;
          }

          return {
            ...item,
            quantity: item.quantity + 1,
          };
        },
      );

      localStorage.setItem(
        "little-moments-products-cart",
        JSON.stringify(updatedCart),
      );

      window.dispatchEvent(
        new Event("products-cart-updated"),
      );
    } catch {
      return;
    }
  };

  const total = cart.reduce((sum, item) => {
    if (item.type === "gift-box") {
      return sum + item.boxPrice;
    }

    return sum + item.price * item.quantity;
  }, 0);

  const itemCount = cart.reduce((count, item) => {
    if (item.type === "gift-box") {
      return count + 1;
    }

    return count + item.quantity;
  }, 0);

  return (
    <>
      <button
        type="button"
        className="cart-button"
        onClick={() => setIsOpen(true)}
        aria-label="Shopping cart"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 8h14l-1 11H6L5 8Z" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>

        <span className="cart-count">
          {itemCount}
        </span>
      </button>

      {isOpen && (
        <div
          className="cart-overlay"
          onClick={() => setIsOpen(false)}
        >
          <aside
            className="cart-drawer"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="cart-header">
              <div>
                <p>YOUR BAG</p>
                <h2>Your Cart</h2>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="cart-close"
                aria-label="Close cart"
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="cart-empty">
                <span>✦</span>

                <h3>Your bag is empty</h3>

                <p>
                  Find something lovely or create
                  a special gift box.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);

                    document
                      .getElementById("builder")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }}
                >
                  Build Your Gift →
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => {
                    if (
                      item.type === "gift-box"
                    ) {
                      return (
                        <div
                          key={`gift-${item.id}`}
                          className="cart-item"
                        >
                          <div className="cart-item-box">
                            <span>🎁</span>
                          </div>

                          <div className="cart-item-content">
                            <div className="cart-item-title">
                              <strong>
                                {item.boxName}{" "}
                                Gift Box
                              </strong>

                              <button
                                type="button"
                                onClick={() =>
                                  removeGiftBox(
                                    item.id,
                                  )
                                }
                                aria-label="Remove gift box"
                              >
                                ×
                              </button>
                            </div>

                            <p>
                              {item.gifts.length}{" "}
                              gifts
                            </p>

                            <p>
                              Card: {item.card}
                            </p>

                            {item.message && (
                              <p className="cart-item-message">
                                “{item.message}”
                              </p>
                            )}

                            <strong className="cart-item-price">
                              ${item.boxPrice}
                            </strong>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={`product-${item.id}`}
                        className="cart-item"
                      >
                        <div className="cart-item-box">
                          <span>🛍️</span>
                        </div>

                        <div className="cart-item-content">
                          <div className="cart-item-title">
                            <strong>
                              {item.name}
                            </strong>

                            <button
                              type="button"
                              onClick={() =>
                                removeProduct(
                                  item.id,
                                )
                              }
                              aria-label="Remove product"
                            >
                              ×
                            </button>
                          </div>

                          <p>${item.price}</p>

                          <div
                            className="cart-quantity"
                            style={{
                              display: "flex",
                              alignItems:
                                "center",
                              gap: "10px",
                              marginTop: "8px",
                            }}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                decreaseProduct(
                                  item.id,
                                )
                              }
                            >
                              −
                            </button>

                            <span>
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increaseProduct(
                                  item.id,
                                )
                              }
                            >
                              +
                            </button>
                          </div>

                          <strong className="cart-item-price">
                            $
                            {(
                              item.price *
                              item.quantity
                            ).toFixed(2)}
                          </strong>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="cart-footer">
                  <div className="cart-total">
                    <span>Total</span>

                    <strong>
                      ${total.toFixed(2)}
                    </strong>
                  </div>

                  <button
                    type="button"
                    className="checkout-button"
                  >
                    Continue to Checkout
                    <span>→</span>
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
