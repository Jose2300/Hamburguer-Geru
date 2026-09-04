import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Benefits from "../../components/Benefits/Benefits";
import BurgerExperience from "../../components/BurgerExperience/BurgerExperience";
import Menu from "../../components/Menu/Menu";
import Footer from "../../components/Footer/Footer";

import "./Home.css";

function Home() {
  return (
    <div className="app">
      <Header />

      <main>
        <Hero />
        <Benefits />
        <BurgerExperience />
        <Menu />
      </main>

      <Footer />
    </div>
  );
}

export default Home;