import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";


const FooterItem = ({ title, links, collapsible = false }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(true);


  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 950;
      setIsMobile(mobile);
      setIsOpen(!collapsible || !mobile); 
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [collapsible]);


  const toggleOpen = () => {
    if (collapsible && isMobile) setIsOpen((v) => !v);
  };


  return (
    <article className="text-start w-100">
      {/* Header */}
      <button
        type="button"
        onClick={toggleOpen}
        className={`btn btn-link p-0 w-100 d-flex align-items-center justify-content-between text-decoration-none ${
          collapsible && isMobile ? "text-danger" : "text-dark"
        }`}
        style={{ cursor: collapsible && isMobile ? "pointer" : "default" }}
        aria-expanded={isOpen}
        aria-controls={`footer-section-${title}`}
      >
        <h5 className="m-0">{title}</h5>
        {collapsible && isMobile && (
          <IoIosArrowDown
            className={`fs-5 transition-transform`}
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          />
        )}
      </button>


      {/* Contenido colapsable */}
      <div
        id={`footer-section-${title}`}
        className={`collapse ${isOpen ? "show" : ""} mt-2`}
      >
        <ul className="nav flex-column gap-2">
          {links.map((linkItem, idx) => (
            <li key={idx} className="nav-item">
              <Link
                to={linkItem.link}
                className="nav-link p-0 text-body-secondary link-underline-opacity-0 link-underline-opacity-75-hover"
              >
                {linkItem.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};


export default FooterItem;
