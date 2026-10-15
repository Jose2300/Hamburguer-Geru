
import { motion } from "framer-motion";
import burgerImage from "../../assets/burger/hamburguer-hero.png";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-container">

        {/* Texto à esquerda */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="hero-tag">
            🔥 FEITO NA BRASA
          </span>

          <h1>
            O hambúrguer
            <br />
            que você <strong>merece.</strong>
          </h1>

          <p>
            Sabor de verdade, ingredientes selecionados
            e aquele toque especial do Burger Geru.
          </p>

          <div className="hero-buttons">
            <a href="#menu" className="hero-btn-primary">
              Conheça nosso cardápio <span>→</span>
            </a>

            <a
              href="#experiencia"
              className="hero-btn-secondary"
            >
              Descubra a experiência
            </a>
          </div>
        </motion.div>

        {/* Uma única imagem à direita */}
        <motion.div
          className="hero-image"
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="hero-image-glow" />

          <img
            src={burgerImage}
            alt="Hambúrguer artesanal Burger Geru"
          />
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;
