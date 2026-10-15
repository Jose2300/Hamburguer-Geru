import { useState } from "react";
import type { FormEvent } from "react";
import {
  Plus,
  Minus,
  X,
  ShoppingBag,
  Trash2,
  MessageCircle,
  Clock,
  CreditCard,
  MapPin,
  User,
  ArrowLeft,
} from "lucide-react";
import "./Menu.css";

// Informe o WhatsApp da hamburgueria com código do Brasil + DDD + número.
// Exemplo fictício: "5579999999999". Use somente números.
const WHATSAPP_NUMERO = "5579988099285";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
};

type FormaPagamento = "Pix" | "Dinheiro" | "Cartão";
type TipoEntrega = "Entrega" | "Retirada no local";

// Imagens dos hambúrgueres
import crispyCheeseImg from "../../assets/burger/chryspe-chesse.jpg";
import chicoImg from "../../assets/burger/chico.jpg";
import superBaconImg from "../../assets/burger/hamburguer-super-bacon.jpg";
import allInImg from "../../assets/burger/tudo-burguer.jpg";
import poderosoChefaoImg from "../../assets/burger/Poderoso-chefao.webp";
import frangoImg from "../../assets/burger/hamburguer-frango.jpg";

// Imagens das porções
import batataImg from "../../assets/burger/batata-simples.jpg";
import cheddarBaconImg from "../../assets/burger/batata-cheddar-bacon.jpg";

const burgers: Product[] = [
  {
    id: "crispy-cheese",
    name: "Crispy Cheese",
    description:
      "Pão de batata, blend bovino de 140g, maionese especial, mussarela crocante e salada.",
    price: 16.99,
    image: crispyCheeseImg,
  },
  {
    id: "chico",
    name: "Burguer Chicó",
    description:
      "Pão de batata, blend bovino de 140g, ovo, mussarela, maionese especial e salada.",
    price: 15.99,
    image: chicoImg,
  },
  {
    id: "super-bacon",
    name: "Burguer Super Bacon",
    description:
      "Pão de batata, blend bovino de 140g, bacon crocante, creme de cheddar, barbecue, maionese especial e salada.",
    price: 21.99,
    image: superBaconImg,
  },
  {
    id: "all-in",
    name: "All in Burguer",
    description:
      "Pão de batata, blend bovino de 140g, cebola caramelizada, bacon, creme de cheddar duplo, maionese especial e salada.",
    price: 18.99,
    image: allInImg,
  },
  {
    id: "poderoso-chefao",
    name: "Poderoso Chefão",
    description:
      "Pão de batata, blend bovino de 140g, cebola caramelizada, bacon, cheddar duplo, maionese especial e salada.",
    price: 26.99,
    image: poderosoChefaoImg,
  },
  {
    id: "frango",
    name: "Frango Burguer",
    description:
      "Hambúrguer de frango com pão de batata, queijo, maionese especial e salada.",
    price: 26.99,
    image: frangoImg,
  },
];

const portions: Product[] = [
  {
    id: "batata",
    name: "Batata Frita",
    description:
      "Batata frita 200 g, crocante por fora e macia por dentro. Imagem ilustrativa.",
    price: 8.99,
    image: batataImg,
  },
  {
    id: "batata-cheddar-bacon",
    name: "Batata com Cheddar e Bacon",
    description:
      "200 g de batata frita crocante, coberta com cheddar cremoso e bacon crocante. Imagem ilustrativa.",
    price: 13.99,
    image: cheddarBaconImg,
  },
];

const drinks: Product[] = [
  {
    id: "coca-lata",
    name: "Coca-Cola lata",
    description: "Refrigerante de cola de 350 ml.",
    price: 5.0,
  },
  {
    id: "coca-1-litro",
    name: "Coca-Cola 1 litro",
    description: "Garrafa de refrigerante de cola.",
    price: 8.0,
  },
];

const allProducts: Product[] = [...burgers, ...drinks, ...portions];

const formatPrice = (price: number) =>
  price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

function Menu() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [payment, setPayment] = useState<FormaPagamento>("Pix");
  const [tipoEntrega, setTipoEntrega] = useState<TipoEntrega>("Entrega");
  const [observations, setObservations] = useState("");

  const changeQuantity = (id: string, amount: number) => {
    setQuantities((current) => ({
      ...current,
      [id]: Math.max(0, (current[id] || 0) + amount),
    }));
  };

  const addToOrder = (product: Product) => {
    changeQuantity(product.id, 1);
  };

  const cartProducts = allProducts.filter(
    (product) => (quantities[product.id] || 0) > 0
  );

  const itemCount = cartProducts.reduce(
    (sum, product) => sum + (quantities[product.id] || 0),
    0
  );

  const total = cartProducts.reduce(
    (sum, product) =>
      sum + product.price * (quantities[product.id] || 0),
    0
  );

  const abrirFinalizacao = () => {
    if (cartProducts.length === 0) {
      alert("Adicione pelo menos um produto ao pedido.");
      return;
    }
    setIsCheckoutOpen(true);
  };

  const finalizarPedido = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cartProducts.length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }

    if (!customerName.trim()) {
      alert("Informe seu nome.");
      return;
    }

    if (tipoEntrega === "Entrega" && !deliveryAddress.trim()) {
      alert("Informe o endereço de entrega.");
      return;
    }

    if (!/^\d{12,13}$/.test(WHATSAPP_NUMERO) || WHATSAPP_NUMERO.includes("DDD")) {
      alert(
        "Configure o número de WhatsApp da hamburgueria na constante WHATSAPP_NUMERO, no início do Menu.tsx."
      );
      return;
    }

    const listaProdutos = cartProducts
      .map((product) => {
        const quantidade = quantities[product.id] || 0;
        const subtotal = product.price * quantidade;

        return [
          `• ${product.name}`,
          `  Quantidade: ${quantidade}`,
          `  Valor unitário: ${formatPrice(product.price)}`,
          `  Subtotal: ${formatPrice(subtotal)}`,
        ].join("\n");
      })
      .join("\n\n");

    const mensagem = [
      "🍔 *NOVO PEDIDO — BURGER GERU*",
      "",
      "👤 *DADOS DO CLIENTE*",
      `Nome: ${customerName.trim()}`,
      `Modalidade: ${tipoEntrega}`,
      ...(tipoEntrega === "Entrega"
        ? [`Endereço: ${deliveryAddress.trim()}`]
        : []),
      "",
      "🛒 *RESUMO DO PEDIDO*",
      listaProdutos,
      "",
      `Quantidade total de itens: ${itemCount}`,
      `*TOTAL: ${formatPrice(total)}*`,
      "",
      "💳 *FORMA DE PAGAMENTO*",
      payment,
      "",
      "📝 *OBSERVAÇÕES*",
      observations.trim() || "Nenhuma observação.",
      "",
      "Olá! Gostaria de confirmar este pedido. Por favor, confirmem o recebimento e o prazo estimado.",
    ].join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
      mensagem
    )}`;

    // Abre o WhatsApp com o pedido preenchido. O cliente confirma o envio no app.
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const renderProductCard = (product: Product) => (
    <article className="menu-card" key={product.id}>
      {product.image && (
        <div className="menu-image">
          <img src={product.image} alt={product.name} loading="lazy" />
        </div>
      )}

      <div className="menu-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <div className="menu-footer">
          <strong>{formatPrice(product.price)}</strong>
          <button
            type="button"
            className="add-button"
            aria-label={`Adicionar ${product.name} ao carrinho`}
            onClick={() => addToOrder(product)}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </article>
  );

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
          Hambúrgueres e porções feitos para quem não aceita menos que muito
          sabor.
        </p>
      </div>

      <div className="menu-category">
        <h2>Hambúrgueres</h2>
        <div className="menu-grid">{burgers.map(renderProductCard)}</div>
      </div>

      <div className="menu-category">
        <h2>Bebidas</h2>
        <div className="menu-grid">{drinks.map(renderProductCard)}</div>
      </div>

      <div className="menu-category">
        <h2>Porções</h2>
        <div className="menu-grid">{portions.map(renderProductCard)}</div>
      </div>

      <button
        type="button"
        className="floating-cart"
        onClick={() => setIsCartOpen(true)}
        aria-label={`Abrir carrinho com ${itemCount} itens`}
      >
        <ShoppingBag size={24} />
        <span className="cart-badge">{itemCount}</span>
        <span className="floating-cart-info">
          <strong>Meu pedido</strong>
          <small>{formatPrice(total)}</small>
        </span>
      </button>

      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
          <aside
            className="floating-cart-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cart-header">
              <div>
                <span className="order-eyebrow">BURGER GERU</span>
                <h2 id="cart-title">
                  {isCheckoutOpen ? "Finalizar pedido" : "Seu pedido"}
                </h2>
                <p>
                  {isCheckoutOpen
                    ? "Preencha os dados para enviar"
                    : `${itemCount} ${
                        itemCount === 1 ? "item selecionado" : "itens selecionados"
                      }`}
                </p>
              </div>

              <button
                type="button"
                className="close-order-icon"
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(false);
                }}
                aria-label="Fechar carrinho"
              >
                <X size={22} />
              </button>
            </div>

            {!isCheckoutOpen ? (
              <>
                <div className="cart-items">
                  {cartProducts.length === 0 ? (
                    <div className="empty-cart">
                      <ShoppingBag size={42} />
                      <h3>Seu carrinho está vazio</h3>
                      <p>Que tal escolher um hambúrguer para começar?</p>
                      <button
                        type="button"
                        onClick={() => setIsCartOpen(false)}
                      >
                        Ver cardápio
                      </button>
                    </div>
                  ) : (
                    cartProducts.map((product) => (
                      <article className="cart-item" key={product.id}>
                        {product.image && (
                          <img src={product.image} alt={product.name} />
                        )}

                        <div className="cart-item-info">
                          <strong>{product.name}</strong>
                          <span>{formatPrice(product.price)} cada</span>
                          <b>
                            {formatPrice(
                              product.price * quantities[product.id]
                            )}
                          </b>
                        </div>

                        <div className="quantity-control">
                          <button
                            type="button"
                            aria-label={`Diminuir ${product.name}`}
                            onClick={() => changeQuantity(product.id, -1)}
                          >
                            <Minus size={15} />
                          </button>
                          <span>{quantities[product.id]}</span>
                          <button
                            type="button"
                            aria-label={`Aumentar ${product.name}`}
                            onClick={() => changeQuantity(product.id, 1)}
                          >
                            <Plus size={15} />
                          </button>
                        </div>

                        <button
                          type="button"
                          className="remove-cart-item"
                          aria-label={`Remover ${product.name}`}
                          onClick={() =>
                            setQuantities((current) => ({
                              ...current,
                              [product.id]: 0,
                            }))
                          }
                        >
                          <Trash2 size={17} />
                        </button>
                      </article>
                    ))
                  )}
                </div>

                {cartProducts.length > 0 && (
                  <div className="cart-bottom">
                    <div className="cart-total">
                      <span>Total do pedido</span>
                      <strong>{formatPrice(total)}</strong>
                    </div>

                    <button
                      type="button"
                      className="finish-order-button"
                      onClick={abrirFinalizacao}
                    >
                      Finalizar pedido
                      <ShoppingBag size={20} />
                    </button>

                    <button
                      type="button"
                      className="continue-shopping"
                      onClick={() => setIsCartOpen(false)}
                    >
                      Continuar escolhendo
                    </button>
                  </div>
                )}
              </>
            ) : (
              <form className="checkout-form" onSubmit={finalizarPedido}>
                <button
                  type="button"
                  className="checkout-back"
                  onClick={() => setIsCheckoutOpen(false)}
                >
                  <ArrowLeft size={17} />
                  Voltar aos pedidos
                </button>

                <div className="checkout-summary">
                  <ShoppingBag size={21} />
                  <div>
                    <span>
                      {itemCount} {itemCount === 1 ? "item" : "itens"} no pedido
                    </span>
                    <strong>{formatPrice(total)}</strong>
                  </div>
                </div>

                <label htmlFor="customer-name">
                  <User size={17} />
                  Nome completo
                </label>
                <input
                  id="customer-name"
                  type="text"
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  placeholder="Digite seu nome"
                  autoComplete="name"
                  required
                />

                <label htmlFor="tipo-entrega">
                  <MapPin size={17} />
                  Como deseja receber?
                </label>
                <select
                  id="tipo-entrega"
                  value={tipoEntrega}
                  onChange={(event) =>
                    setTipoEntrega(event.target.value as TipoEntrega)
                  }
                >
                  <option value="Entrega">Receber em casa</option>
                  <option value="Retirada no local">Retirar no local</option>
                </select>

                {tipoEntrega === "Entrega" && (
                  <>
                    <label htmlFor="delivery-address">
                      <MapPin size={17} />
                      Endereço de entrega
                    </label>
                    <textarea
                      id="delivery-address"
                      value={deliveryAddress}
                      onChange={(event) =>
                        setDeliveryAddress(event.target.value)
                      }
                      placeholder="Rua, número, bairro e ponto de referência"
                      autoComplete="street-address"
                      rows={3}
                      required
                    />
                  </>
                )}

                <div className="delivery-estimate">
                  <Clock size={21} />
                  <div>
                    <strong>
                      {tipoEntrega === "Entrega"
                        ? "Entrega do seu pedido"
                        : "Retirada do seu pedido"}
                    </strong>
                    <p>
                      Confirme o prazo com a hamburgueria pelo WhatsApp.
                    </p>
                  </div>
                </div>

                <label htmlFor="payment-method">
                  <CreditCard size={17} />
                  Forma de pagamento
                </label>
                <select
                  id="payment-method"
                  value={payment}
                  onChange={(event) =>
                    setPayment(event.target.value as FormaPagamento)
                  }
                >
                  <option value="Pix">Pix</option>
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Cartão">Cartão de crédito ou débito</option>
                </select>

                <label htmlFor="order-observations">
                  Observações do pedido
                </label>
                <textarea
                  id="order-observations"
                  value={observations}
                  onChange={(event) => setObservations(event.target.value)}
                  placeholder="Ex.: sem cebola, molho à parte..."
                  rows={2}
                />

                <div className="cart-total">
                  <span>Total do pedido</span>
                  <strong>{formatPrice(total)}</strong>
                </div>

                <button type="submit" className="send-whatsapp-button">
                  <MessageCircle size={21} />
                  Enviar pedido pelo WhatsApp
                </button>

                <p className="whatsapp-notice">
                  O WhatsApp abrirá com a mensagem pronta. Você precisa tocar
                  em Enviar no aplicativo para encaminhar o pedido.
                </p>
              </form>
            )}
          </aside>
        </div>
      )}
    </section>
  );
}

export default Menu;
