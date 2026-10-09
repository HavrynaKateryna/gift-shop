import Image from "next/image";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <p className="hero-eyebrow">
            BUILD YOUR OWN GIFT BOX
          </p>

          <h1 className="hero-title">
            Create a gift
            <br />
            as unique as they are
          </h1>

          <p className="hero-description">
            Choose a box size, pick your favorite
            items, add a personal message — and
            we’ll put it all together beautifully.
          </p>
        </div>

        <div className="hero-visual">
          <Image
            src="/hero.png"
            alt="Thoughtfully arranged gift box"
            fill
            priority
            sizes="(max-width: 650px) 100vw, 50vw"
            className="hero-image"
          />

          <div className="hero-photo-note">
            Real gifts.
            <br />
            Real emotions.
            <span>♡</span>
          </div>

          <div className="hero-photo-caption">
            Made with love ✦
          </div>
        </div>
      </div>
    </section>
  );
}
