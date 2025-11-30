import { Helmet } from "react-helmet-async";
import DragonBall from "../components/DragonBall";


export default function Shop({ onAddToCart }) {
  return (
    <>
      <Helmet htmlAttributes={{ lang: "en" }}>
        <title>Windows | NexGenPPF</title>
        <meta
          name="description"
          content="Browse the shop and explore all available demo products inside the NexGen PPF portal."
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
