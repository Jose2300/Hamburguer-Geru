import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import bunTop from "../../assets/burger/pao_de_cima.png";
import cheeseTop from "../../assets/burger/chedar1.png";
import burgerTop from "../../assets/burger/carne3.png";
import bacon from "../../assets/burger/bacon.png";
import cheeseBottom from "../../assets/burger/chedar2.png";
import burgerBottom from "../../assets/burger/carne1.png";
import bunBottom from "../../assets/burger/pao-de-baixo.png";

import "./BurgerExperience.css";

function BurgerExperience() {
  const sectionRef = useRef<HTMLElement>(null);

  /*
   * O scroll agora pertence somente à seção.
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* =====================================
     MOVIMENTO VERTICAL
  ===================================== */

  const bunTopY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.7, 1],
    [0, 0, -140, -230]
  );

  const cheeseTopY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.7, 1],
    [0, 0, -70, -120]
  );

  const burgerTopY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.7, 1],
    [0, 0, -25, -50]
  );

  const baconY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.7, 1],
    [0, 0, 20, 45]
  );

  const cheeseBottomY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.7, 1],
    [0, 0, 70, 120]
  );

  const burgerBottomY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.7, 1],
    [0, 0, 125, 200]
  );

  const bunBottomY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.7, 1],
    [0, 0, 190, 300]
  );


  /* =====================================
     MOVIMENTO HORIZONTAL
  ===================================== */

  const bunTopX = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [0, -25, -60]
  );

  const cheeseTopX = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [0, -15, -35]
  );

  const burgerTopX = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [0, 15, 35]
  );

  const baconX = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [0, -10, -25]
  );

  const cheeseBottomX = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [0, 20, 40]
  );

  const burgerBottomX = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [0, -20, -45]
  );

  const bunBottomX = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [0, 30, 65]
  );


  /* =====================================
     ROTAÇÃO
  ===================================== */

  const bunTopRotate = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [0, -5, -12]
  );

  const cheeseTopRotate = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [0, -3, -8]
  );

  const burgerTopRotate = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [0, 3, 7]
  );

  const baconRotate = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [0, -3, -7]
  );

  const cheeseBottomRotate = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [0, 3, 8]
  );

  const burgerBottomRotate = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [0, -4, -9]
  );

  const bunBottomRotate = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [0, 5, 12]
  );


  /* =====================================
     ESCALA
  ===================================== */

  const burgerScale = useTransform(
    scrollYProgress,
    [0, 0.25, 1],
    [1, 1.05, 0.9]
  );


  /* =====================================
     TEXTO
  ===================================== */

  const contentY = useTransform(
    scrollYProgress,
    [0, 0.6],
    [0, -100]
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.65, 0.85],
    [1, 1, 0]
  );


  return (
    <section
      ref={sectionRef}
      className="experience"
      id="experiencia"
    >

      {/* =================================
          FUNDO
      ================================= */}

      <div className="experience-glow" />

      <div className="experience-smoke experience-smoke-1" />
      <div className="experience-smoke experience-smoke-2" />


      {/* =================================
          BURGER
      ================================= */}

      <div className="experience-image">

        <motion.div
          className="experience-burger"
          style={{
            scale: burgerScale,
          }}
        >

          {/* luz atrás */}

          <div className="burger-light" />


          {/* pão superior */}

          <motion.img
            src={bunTop}
            className="burger-layer bun-top"
            style={{
              y: bunTopY,
              x: bunTopX,
              rotate: bunTopRotate,
            }}
            alt="Pão superior"
          />


          {/* queijo superior */}

          <motion.img
            src={cheeseTop}
            className="burger-layer cheese-top"
            style={{
              y: cheeseTopY,
              x: cheeseTopX,
              rotate: cheeseTopRotate,
            }}
            alt="Queijo"
          />


          {/* carne superior */}

          <motion.img
            src={burgerTop}
            className="burger-layer burger-top"
            style={{
              y: burgerTopY,
              x: burgerTopX,
              rotate: burgerTopRotate,
            }}
            alt="Carne"
          />


          {/* bacon */}

          <motion.img
            src={bacon}
            className="burger-layer bacon"
            style={{
              y: baconY,
              x: baconX,
              rotate: baconRotate,
            }}
            alt="Bacon"
          />


          {/* queijo inferior */}

          <motion.img
            src={cheeseBottom}
            className="burger-layer cheese-bottom"
            style={{
              y: cheeseBottomY,
              x: cheeseBottomX,
              rotate: cheeseBottomRotate,
            }}
            alt="Queijo"
          />


          {/* carne inferior */}

          <motion.img
            src={burgerBottom}
            className="burger-layer burger-bottom"
            style={{
              y: burgerBottomY,
              x: burgerBottomX,
              rotate: burgerBottomRotate,
            }}
            alt="Carne"
          />


          {/* pão inferior */}

          <motion.img
            src={bunBottom}
            className="burger-layer bun-bottom"
            style={{
              y: bunBottomY,
              x: bunBottomX,
              rotate: bunBottomRotate,
            }}
            alt="Pão inferior"
          />

        </motion.div>

      </div>


      {/* =================================
          TEXTO
      ================================= */}

      <motion.div
        className="experience-content"
        style={{
          y: contentY,
          opacity: contentOpacity,
        }}
      >

        <span>🔥 UMA EXPERIÊNCIA DIFERENTE</span>

        <h2>
          Cada camada
          <br />
          conta uma <strong>história.</strong>
        </h2>

        <p>
          Do pão macio à carne preparada na brasa,
          cada ingrediente é pensado para criar
          equilíbrio entre textura, aroma e sabor.
        </p>

        <a href="#menu">
          Conheça nossos burgers
          <span>→</span>
        </a>

      </motion.div>


      {/* =================================
          SCROLL
      ================================= */}

      <motion.div
        className="experience-scroll"
        animate={{
          y: [0, 8, 0],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <span>ROLE PARA DESCOBRIR</span>
        <strong>↓</strong>
      </motion.div>

    </section>
  );
}

export default BurgerExperience;