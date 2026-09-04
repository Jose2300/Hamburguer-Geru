import { motion, useScroll, useTransform } from "framer-motion";
import "./Hero.css";

interface BurgerLayerProps {
  emoji: string;
  name: string;
  y: number;
  rotate: number;
  scale: number;
}

function BurgerLayer({
  emoji,
  name,
  y: finalY,
  rotate: finalRotate,
  scale: finalScale,
}: BurgerLayerProps) {
  const { scrollYProgress } = useScroll();

  const y = useTransform(
    scrollYProgress,
    [0.05, 0.35],
    [0, finalY]
  );

  const rotate = useTransform(
    scrollYProgress,
    [0.05, 0.35],
    [0, finalRotate]
  );

  const scale = useTransform(
    scrollYProgress,
    [0.05, 0.35],
    [1, finalScale]
  );

  return (
    <motion.div
      className="burger__layer"
      style={{
        y,
        rotate,
        scale,
      }}
      aria-label={name}
    >
      <div className="burger__ingredient">
        <span>{emoji}</span>
      </div>
    </motion.div>
  );
}

function Hero() {
  const { scrollYProgress } = useScroll();

  const titleY = useTransform(
    scrollYProgress,
    [0, 0.25],
    [0, -120]
  );

  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.2],
    [1, 0]
  );

  const burgerScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.45],
    [1, 1.05, 0.85]
  );

  const scrollOpacity = useTransform(
    scrollYProgress,
    [0, 0.12],
    [1, 0]
  );

  return (
    <section className="hero">

      <div className="hero__background">
        <div className="hero__smoke smoke-1" />
        <div className="hero__smoke smoke-2" />
        <div className="hero__glow" />
      </div>

      <motion.div
        className="hero__content"
        style={{
          y: titleY,
          opacity: titleOpacity,
        }}
      >
        <span className="hero__tag">
          🔥 FEITO NA BRASA
        </span>

        <h1>
          O hambúrguer
          <br />
          <strong>que você merece.</strong>
        </h1>

        <p>
          Sabor de verdade, ingredientes selecionados
          e aquele toque especial do Burger Geru.
        </p>

        <button className="hero__button">
          Conheça nosso cardápio
          <span>↓</span>
        </button>
      </motion.div>

      <motion.div
        className="burger"
        style={{
          scale: burgerScale,
        }}
      >
        <BurgerLayer
          name="Pão superior"
          emoji="🍞"
          y={-180}
          rotate={-8}
          scale={1.05}
        />

        <BurgerLayer
          name="Queijo"
          emoji="🧀"
          y={-100}
          rotate={5}
          scale={1}
        />

        <BurgerLayer
          name="Carne"
          emoji="🥩"
          y={0}
          rotate={-3}
          scale={1.1}
        />

        <BurgerLayer
          name="Alface"
          emoji="🥬"
          y={90}
          rotate={4}
          scale={1}
        />

        <BurgerLayer
          name="Molho"
          emoji="🍅"
          y={140}
          rotate={-5}
          scale={0.9}
        />

        <BurgerLayer
          name="Pão inferior"
          emoji="🍞"
          y={200}
          rotate={7}
          scale={1}
        />
      </motion.div>

      <motion.div
        className="hero__scroll"
        style={{
          opacity: scrollOpacity,
        }}
      >
        <span>Role para descobrir</span>

        <div className="hero__scroll-line" />
      </motion.div>

    </section>
  );
}

export default Hero;