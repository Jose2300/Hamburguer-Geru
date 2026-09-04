import "./Benefits.css";

const benefits = [
  {
    number: "01",
    title: "Carne de verdade",
    text: "Blend preparado diariamente para garantir sabor e suculência.",
  },
  {
    number: "02",
    title: "Ingredientes frescos",
    text: "Selecionamos ingredientes que fazem diferença em cada mordida.",
  },
  {
    number: "03",
    title: "Feito na brasa",
    text: "O fogo é o segredo daquele sabor defumado irresistível.",
  },
];

function Benefits() {
  return (
    <section className="benefits">
      <div className="section-title">
        <span>POR QUE BURGUER GERU?</span>

        <h2>
          Não é apenas um
          <br />
          <strong>hambúrguer.</strong>
        </h2>
      </div>

      <div className="benefits-grid">
        {benefits.map((benefit) => (
          <article className="benefit-card" key={benefit.number}>
            <span>{benefit.number}</span>

            <h3>{benefit.title}</h3>

            <p>{benefit.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Benefits;