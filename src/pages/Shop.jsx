import DragonBall from "../components/DragonBall";


export default function Shop({ onAddToCart }) {
  return (
    <main>
       <div className="py-5" style={{ marginTop: "5rem" }}>
        <DragonBall onAddToCart={onAddToCart} />
      </div>
    </main>
  );
}
