import "./Menu.css";

const burgers = [
  {
    name: "Geru Classic",
    description: "Carne, queijo, alface, tomate e molho especial.",
    price: "R$ 28,90",
    emoji: "🍔",
  },
  {
    name: "Fire Burger",
    description: "Carne, cheddar, bacon e molho barbecue.",
    price: "R$ 34,90",
    emoji: "🔥",
  },
  {
    name: "Double Geru",
    description: "Duas carnes, queijo duplo e molho da casa.",
    price: "R$ 39,90",
    emoji: "🍔",
  },
];

function Menu() {
  return (
    <section className="menu" id="menu">
      <div className="menu-header">
        <div>
          <span>NOSSO CARDÁPIO</span>

          <h2>
            Escolha seu
            <br />
            <strong>favorito.</strong>
          </h2>
        </div>

        <p>
          Hambúrgueres feitos para quem não aceita
          menos que muito sabor.
        </p>
      </div>

      <div className="menu-grid">
        {burgers.map((burger) => (
          <article className="menu-card" key={burger.name}>
            <div className="menu-image">
              {burger.emoji}
            </div>

            <div className="menu-info">
              <h3>{burger.name}</h3>

              <p>{burger.description}</p>

              <div className="menu-footer">
                <strong>{burger.price}</strong>

                <button>+</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Menu;