import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBarCustom from "../../layout/NavBarCustom";

function SideNavbar() {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const computeCount = (arr) =>
      (Array.isArray(arr) ? arr : []).reduce(
        (acc, p) => acc + Number(p.quantity ?? p.qty ?? 1),
        0
      );

    const readFromStorage = () => {
      try {
        const arr = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartCount(computeCount(arr));
      } catch {
        setCartCount(0);
      }
    };

   
    readFromStorage();

    
    const onChanged = (e) => {
      const arr = e?.detail ?? JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(computeCount(arr));
    };

    const onAdd = () => onChanged();

    
    const onStorage = (ev) => {
      if (ev.key === "cart") readFromStorage();
    };

    window.addEventListener("cart:changed", onChanged);
    window.addEventListener("cart:add", onAdd);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("cart:changed", onChanged);
      window.removeEventListener("cart:add", onAdd);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const links = [
    { label: "About", href: "/under-construction" },
    { label: "Contact", href: "/under-construction" },
    {
      title: "Products",
      dropdown: true,
      items: [
        { label: "Automotive", href: "/shop" },
        { label: "Window", href: "/shop" },
        { label: "Architectural", href: "/shop" },
        { label: "Dragon Ball Z", href: "/shop" },
      ],
    },
  ];

  const handleSearch = (text) => console.log("Buscar:", text);
  const goToCart = () => navigate("/cart");

  return (
    <NavBarCustom
      logoSrc="/images/LOGO.png"
      brand="NexGen"
      links={links}
      onSearchSubmit={handleSearch}
      cartCount={cartCount}   
      favCount={0}
      iconColor="white"
      iconSize={26}
      onCartClick={goToCart}
    />
  );
}

export default SideNavbar;
