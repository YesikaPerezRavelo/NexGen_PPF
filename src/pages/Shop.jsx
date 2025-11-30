import { Helmet } from "react-helmet-async";
import DragonBall from "../components/DragonBall";


export default function Shop({ onAddToCart }) {
  return (
    <>
      <Helmet htmlAttributes={{ lang: "en" }}>
        <title>Shop | NexGenPPF</title>
        <meta
          name="description"
          content="Browse the full demo catalog and test the shopping flow inside the NexGen PPF portal."
        />
      </Helmet>


      <main>
        <div className="py-5" style={{ marginTop: "5rem" }}>
          <DragonBall onAddToCart={onAddToCart} />
        </div>
      </main>
    </>
  );
}
