import "./BurgerExperience.css";

function BurgerExperience() {
  return (
    <section className="experience" id="experiencia">
      <div className="experience-image">
        <div className="experience-burger">
          🍔
        </div>
      </div>

      <div className="experience-content">
        <span>UMA EXPERIÊNCIA DIFERENTE</span>

        <h2>
          Cada camada
          <br />
          conta uma <strong>história.</strong>
        </h2>

        <p>
          Do pão macio à carne preparada na brasa, cada ingrediente
          é pensado para criar equilíbrio entre textura, aroma e sabor.
        </p>

        <a href="#menu">
          Conheça nossos burgers →
        </a>
      </div>
    </section>
  );
}

export default BurgerExperience;