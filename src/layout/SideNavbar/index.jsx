// src/layout/SideNavbar.jsx
import NavBarCustom from "../../layout/NavBarCustom";


function SideNavbar() {
  const links = [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    {
      title: "Products",
      dropdown: true,
      items: [
        { label: "Paint Protection Film", href: "/ppf" },
        { label: "Window Film", href: "/window-film" },
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
      cartCount={2}
      favCount={0}
      iconColor="white"
      iconSize={26}
    />
  );
}


export default SideNavbar;
