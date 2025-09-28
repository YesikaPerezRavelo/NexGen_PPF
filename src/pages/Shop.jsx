import DragonBall from "../components/DragonBall";


export default function Shop({ onAddToCart }) {
  return (
    <main>
      <div className="p-0 m-0">
        <DragonBall onAddToCart={onAddToCart} />
      </div>
    </main>
  );
}
