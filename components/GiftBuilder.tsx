"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import { products } from "@/data/products";
import "./GiftBuilder.css";

type BoxSize = "small" | "medium" | "large";

type Step = 1 | 2 | 3 | 4 | 5;

type CartItem = {
  id: string;
  boxName: string;
  boxPrice: number;
  gifts: string[];
  card: string;
  message: string;
};

const boxOptions = {
  small: {
    name: "Small",
    gifts: 3,
    price: 39,
  },
  medium: {
    name: "Medium",
    gifts: 5,
    price: 49,
  },
  large: {
    name: "Large",
    gifts: 7,
    price: 59,
  },
};

const giftProducts = products.slice(0, 7);

const stepInfo = [
  {
    number: 1,
    title: "Choose your box",
    text: "Pick the size that fits your gift.",
  },
  {
    number: 2,
    title: "Select your gifts",
    text: "Add your favorite little things.",
  },
  {
    number: 3,
    title: "Add a card",
    text: "Choose a card design.",
  },
  {
    number: 4,
    title: "Write a message",
    text: "Make it personal.",
  },
  {
    number: 5,
    title: "Preview & add to cart",
    text: "See your finished gift.",
  },
];

const productEmoji: Record<string, string> = {
  "cozy-candle": "🕯️",
  "sweet-mug": "☕",
  "cozy-socks": "🧦",
  "little-notebook": "📓",
  "sweet-pen": "🖊️",
  "bath-salts": "🛁",
  "soft-blanket": "🧺",
};

export default function GiftBuilder() {
  const cartIdCounter = useRef(0);

  const [step, setStep] = useState<Step>(1);

  const [boxSize, setBoxSize] =
    useState<BoxSize>("small");

  const [selectedGifts, setSelectedGifts] =
    useState<string[]>([]);

  const [message, setMessage] = useState("");

  const [selectedCard, setSelectedCard] =
    useState("thinking");

  /*
   * PRODUCT COMING FROM SHOP
   */
  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search,
    );

    const productId = params.get("addGift");

    if (!productId) {
      return;
    }

    const productExists = giftProducts.some(
      (product) => product.id === productId,
    );

    if (!productExists) {
      return;
    }

    const timer = window.setTimeout(() => {
      setSelectedGifts((current) => {
        if (current.includes(productId)) {
          return current;
        }

        if (
          current.length >= boxOptions.small.gifts
        ) {
          return current;
        }

        return [...current, productId];
      });

      setStep(2);

      document
        .getElementById("builder")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

      window.history.replaceState(
        {},
        "",
        "/#builder",
      );
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const currentBox = boxOptions[boxSize];

  const toggleGift = (productId: string) => {
    setSelectedGifts((current) => {
      if (current.includes(productId)) {
        return current.filter(
          (id) => id !== productId,
        );
      }

      if (current.length >= currentBox.gifts) {
        return current;
      }

      return [...current, productId];
    });
  };

  const handleBoxChange = (size: BoxSize) => {
    setBoxSize(size);
    setSelectedGifts([]);
    setStep(1);
  };

  const selectedProducts = selectedGifts
    .map((id) =>
      giftProducts.find(
        (product) => product.id === id,
      ),
    )
    .filter(Boolean);

  const subtotal = selectedProducts.reduce(
    (total, product) =>
      total + (product?.price ?? 0),
    0,
  );

  const progress =
    (selectedGifts.length / currentBox.gifts) *
    100;

  const canGoToStep2 = selectedGifts.length > 0;

  const canGoToStep3 =
    selectedGifts.length === currentBox.gifts;

  const addToCart = () => {
    const cardName =
      selectedCard === "thinking"
        ? "Thinking of you"
        : selectedCard === "celebrate"
          ? "Celebrate your day"
          : "Thank You";

    const savedCart = localStorage.getItem(
      "little-moments-cart",
    );

    let currentCart: CartItem[] = [];

    if (savedCart) {
      try {
        currentCart = JSON.parse(
          savedCart,
        ) as CartItem[];
      } catch {
        currentCart = [];
      }
    }

    const newItem: CartItem = {
      id: `gift-${currentCart.length}-${cartIdCounter.current++}`,
      boxName: currentBox.name,
      boxPrice: currentBox.price,
      gifts: selectedProducts
        .filter(Boolean)
        .map((product) => product!.name),
      card: cardName,
      message: message.trim(),
    };

    const updatedCart = [...currentCart, newItem];

    localStorage.setItem(
      "little-moments-cart",
      JSON.stringify(updatedCart),
    );

    window.dispatchEvent(
      new Event("cart-updated"),
    );
  };

  const goNext = () => {
    if (step === 1) {
      setStep(2);
      return;
    }

    if (step === 2 && canGoToStep3) {
      setStep(3);
      return;
    }

    if (step === 3) {
      setStep(4);
      return;
    }

    if (step === 4) {
      setStep(5);
      return;
    }

    if (step === 5) {
      addToCart();
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep((current) => (current - 1) as Step);
    }
  };

  return (
    <section
      id="builder"
      className="gift-builder"
    >
      <div className="gift-builder-workspace">
        {/* LEFT */}

        <aside className="gift-builder-sidebar">
          <div className="gift-builder-steps">
            {stepInfo.map((item) => {
              const isActive =
                step === item.number;

              const isComplete =
                step > item.number;

              const canClick =
                item.number === 1 ||
                (item.number === 2 &&
                  canGoToStep2) ||
                (item.number >= 3 &&
                  canGoToStep3);

              return (
                <button
                  key={item.number}
                  type="button"
                  className={`builder-step ${
                    isActive ? "active" : ""
                  } ${
                    isComplete ? "complete" : ""
                  }`}
                  disabled={!canClick}
                  onClick={() =>
                    canClick &&
                    setStep(item.number as Step)
                  }
                >
                  <span className="builder-step-number">
                    {isComplete
                      ? "✓"
                      : item.number}
                  </span>

                  <span className="builder-step-line" />

                  <span className="builder-step-info">
                    <strong>{item.title}</strong>

                    <small>{item.text}</small>
                  </span>
                </button>
              );
            })}
          </div>

          {/* BOX SIZE */}

          <div className="builder-box-size">
            <p className="builder-section-label">
              BOX SIZE
            </p>

            <div className="builder-box-options">
              {(
                Object.keys(
                  boxOptions,
                ) as BoxSize[]
              ).map((size) => {
                const option = boxOptions[size];

                return (
                  <button
                    key={size}
                    type="button"
                    className={`builder-box-option ${
                      boxSize === size
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      handleBoxChange(size)
                    }
                  >
                    <span className="mini-box">
                      <span />
                    </span>

                    <span className="builder-box-option-info">
                      <strong>
                        {option.name}
                      </strong>

                      <small>
                        {option.gifts} gifts
                      </small>

                      <b>${option.price}</b>
                    </span>

                    {boxSize === size && (
                      <span className="box-selected-check">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="builder-sidebar-note">
            <span>♡</span>

            <p>
              Each box is thoughtfully
              <br />
              packaged with care.
            </p>
          </div>
        </aside>

        {/* CENTER */}

        <main className="gift-builder-center">
          <div className="builder-center-note">
            <span>Watch your gift</span>
            <span>come to life</span>
            <span>↘</span>
          </div>

          <div className="builder-box-stage">
            <div className="realistic-box">
              <div className="box-inside">
                {selectedProducts.map(
                  (product, index) => (
                    <div
                      key={product?.id}
                      className={`box-product box-product-${
                        index + 1
                      }`}
                    >
                      <span>
                        {product
                          ? productEmoji[
                              product.id
                            ]
                          : "✦"}
                      </span>
                    </div>
                  ),
                )}

                {selectedProducts.length ===
                  0 && (
                  <div className="empty-box-message">
                    <span>✦</span>

                    <p>
                      Your gifts will appear here
                    </p>
                  </div>
                )}

                <div className="box-paper paper-one" />
                <div className="box-paper paper-two" />
                <div className="box-paper paper-three" />
              </div>

              <div className="box-front" />

              <div className="box-ribbon" />
            </div>
          </div>

          {/* PROGRESS */}

          <div className="builder-progress-area">
            <div className="builder-progress-label">
              <strong>
                {selectedGifts.length} /{" "}
                {currentBox.gifts} gifts
              </strong>

              {selectedGifts.length ===
                currentBox.gifts && (
                <span>Almost there! ✦</span>
              )}
            </div>

            <div className="builder-progress-bar">
              <div
                className="builder-progress-fill"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          {/* SELECTED PRODUCTS */}

          {selectedProducts.length > 0 && (
            <div className="selected-products">
              {selectedProducts.map((product) => {
                if (!product) return null;

                return (
                  <div
                    key={product.id}
                    className="selected-product-card"
                  >
                    <div className="selected-product-image">
                      {productEmoji[product.id]}
                    </div>

                    <span>{product.name}</span>

                    <button
                      type="button"
                      onClick={() =>
                        toggleGift(product.id)
                      }
                      aria-label={`Remove ${product.name}`}
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* ACTIONS */}

          <div className="builder-center-action">
            {step > 1 && (
              <button
                type="button"
                className="builder-back-button"
                onClick={goBack}
              >
                ← Back
              </button>
            )}

            <button
              type="button"
              className="builder-finish-button"
              disabled={
                step === 2 && !canGoToStep3
              }
              onClick={goNext}
            >
              {step === 5
                ? "Add to Cart"
                : step === 4
                  ? "Preview My Gift"
                  : "Continue"}

              <span>✦</span>
            </button>
          </div>

          <p className="builder-bottom-note">
            Your gift will be beautifully packaged
            and ready to make someone smile.
          </p>
        </main>

        {/* RIGHT */}

        <aside className="gift-builder-products">
          {/* STEP 1 */}

          {step === 1 && (
            <div className="builder-right-intro">
              <p className="builder-right-eyebrow">
                START HERE
              </p>

              <h3>Choose your box</h3>

              <p>
                Pick the size that feels right,
                then fill it with thoughtful
                little gifts.
              </p>

              <button
                type="button"
                className="right-primary-button"
                onClick={goNext}
              >
                Choose gifts →
              </button>
            </div>
          )}

          {/* STEP 2 */}

          {step === 2 && (
            <>
              <div className="available-gifts-header">
                <h3>Available Gifts</h3>

                <button
                  type="button"
                  className="available-gifts-arrow"
                >
                  →
                </button>
              </div>

              <div className="gift-category-tabs">
                <button className="active">
                  All
                </button>

                <button>Home</button>

                <button>Self-care</button>

                <button>Stationery</button>
              </div>

              <div className="available-products-grid">
                {giftProducts.map((product) => {
                  const selected =
                    selectedGifts.includes(
                      product.id,
                    );

                  const disabled =
                    !selected &&
                    selectedGifts.length >=
                      currentBox.gifts;

                  return (
                    <button
                      key={product.id}
                      type="button"
                      disabled={disabled}
                      className={`available-product ${
                        selected ? "selected" : ""
                      }`}
                      onClick={() =>
                        toggleGift(product.id)
                      }
                    >
                      <div className="available-product-image">
                        <span>
                          {
                            productEmoji[
                              product.id
                            ]
                          }
                        </span>

                        {selected && (
                          <span className="available-product-check">
                            ✓
                          </span>
                        )}
                      </div>

                      <div className="available-product-info">
                        <span>
                          {product.name}
                        </span>

                        <strong>
                          ${product.price}
                        </strong>
                      </div>

                      <span className="product-plus">
                        {selected ? "✓" : "+"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* STEP 3 */}

          {step === 3 && (
            <div className="builder-right-panel">
              <p className="builder-right-eyebrow">
                STEP 3
              </p>

              <h3>Choose a card</h3>

              <p>
                Add a little extra touch to your
                gift.
              </p>

              <div className="card-options">
                <button
                  type="button"
                  className={
                    selectedCard === "thinking"
                      ? "selected"
                      : ""
                  }
                  onClick={() =>
                    setSelectedCard("thinking")
                  }
                >
                  <span>Thinking</span>
                  <small>of you ♡</small>
                </button>

                <button
                  type="button"
                  className={
                    selectedCard === "celebrate"
                      ? "selected"
                      : ""
                  }
                  onClick={() =>
                    setSelectedCard("celebrate")
                  }
                >
                  <span>Celebrate</span>
                  <small>your day ✦</small>
                </button>

                <button
                  type="button"
                  className={
                    selectedCard === "thankyou"
                      ? "selected"
                      : ""
                  }
                  onClick={() =>
                    setSelectedCard("thankyou")
                  }
                >
                  <span>Thank You</span>
                  <small>with love ♡</small>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 */}

          {step === 4 && (
            <div className="builder-right-panel">
              <p className="builder-right-eyebrow">
                STEP 4
              </p>

              <h3>Write a message</h3>

              <p>
                Add a personal note to make your
                gift extra special.
              </p>

              <textarea
                className="builder-message"
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                maxLength={250}
                placeholder="Happy Birthday! Hope you have a wonderful day..."
              />

              <div className="message-counter">
                {message.length}/250
              </div>
            </div>
          )}

          {/* STEP 5 */}

          {step === 5 && (
            <div className="builder-right-panel">
              <p className="builder-right-eyebrow">
                YOUR GIFT
              </p>

              <h3>
                Ready to make someone smile?
              </h3>

              <div className="builder-summary">
                <div>
                  <span>Box</span>

                  <strong>
                    {currentBox.name}
                  </strong>
                </div>

                <div>
                  <span>Gifts</span>

                  <strong>
                    {selectedGifts.length}
                  </strong>
                </div>

                <div>
                  <span>Card</span>

                  <strong>
                    {selectedCard === "thinking"
                      ? "Thinking of you"
                      : selectedCard ===
                          "celebrate"
                        ? "Celebrate your day"
                        : "Thank You"}
                  </strong>
                </div>

                <div>
                  <span>Message</span>

                  <strong className="summary-message">
                    {message.trim()
                      ? message
                      : "No personal message"}
                  </strong>
                </div>

                <div>
                  <span>Items value</span>

                  <strong>${subtotal}</strong>
                </div>

                <div className="summary-total">
                  <span>Gift Box</span>

                  <strong>
                    ${currentBox.price}
                  </strong>
                </div>
              </div>
            </div>
          )}

          {/* YOUR BOX */}

          <div className="your-box-panel">
            <div className="your-box-header">
              <h3>Your box</h3>

              <span>
                {selectedGifts.length} /{" "}
                {currentBox.gifts} gifts
              </span>
            </div>

            {selectedProducts.length === 0 ? (
              <p className="your-box-empty">
                Your selected gifts will appear
                here.
              </p>
            ) : (
              <div className="your-box-items">
                {selectedProducts.map(
                  (product) => {
                    if (!product) return null;

                    return (
                      <div
                        key={product.id}
                        className="your-box-item"
                      >
                        <span className="your-box-item-icon">
                          {
                            productEmoji[
                              product.id
                            ]
                          }
                        </span>

                        <span className="your-box-item-name">
                          {product.name}
                        </span>

                        <span className="your-box-item-price">
                          ${product.price}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            toggleGift(product.id)
                          }
                        >
                          ×
                        </button>
                      </div>
                    );
                  },
                )}
              </div>
            )}

            <div className="your-box-total">
              <div>
                <span>Box</span>

                <strong>
                  ${currentBox.price}
                </strong>
              </div>

              <div className="your-box-final">
                <span>Total</span>

                <strong>
                  ${currentBox.price}
                </strong>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* FEATURES */}

      <div className="builder-features">
        <div>
          <span>♧</span>

          <strong>Thoughtfully curated</strong>

          <small>Only the best, always.</small>
        </div>

        <div>
          <span>♡</span>

          <strong>Beautifully packaged</strong>

          <small>Because details matter.</small>
        </div>

        <div>
          <span>▱</span>

          <strong>
            Fast & reliable shipping
          </strong>

          <small>Delivered with care.</small>
        </div>

        <div>
          <span>♢</span>

          <strong>Happiness guaranteed</strong>

          <small>We&apos;re here for you.</small>
        </div>
      </div>
    </section>
  );
}
