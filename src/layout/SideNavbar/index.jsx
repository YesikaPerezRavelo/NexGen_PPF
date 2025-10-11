import { useEffect, useState } from "react";
import NavBarCustom from "../../layout/NavBarCustom";


function SideNavbar() {
  const [cartCount, setCartCount] = useState(0);


  useEffect(() => {
    const onAdd = () => setCartCount((c) => c + 1);
    window.addEventListener("cart:add", onAdd);
    return () => window.removeEventListener("cart:add", onAdd);
  }, []);


  const links = [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    {
      title: "Products",
      dropdown: true,
      items: [
        { label: "Automotive", href: "/ppf" },
        { label: "Window", href: "/window-film" },
        { label: "Architectural", href: "/window-film" },
      ],
    },
  ];


  const handleSearch = (text) => {
    console.log("Buscar:", text);
  };


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
    />
  );
}


export default SideNavbar;
