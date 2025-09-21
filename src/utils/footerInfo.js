// src/utils/footerInfo.js
import { RiYoutubeLine } from "react-icons/ri";
import { FaInstagram, FaFacebookF, FaLinkedin } from "react-icons/fa";


const footerInfo = {
  links: [
    {
      id: 1,
      title: "Company",
      links: [
        { id: 1, title: "Services", link: "" },
        { id: 2, title: "Our Story", link: "" },
        { id: 3, title: "Blog", link: "" },
        { id: 4, title: "Contact", link: "" },
      ],
    },
    {
      id: 2,
      title: "My Account",
      links: [
        { id: 1, title: "Following Orders", link: "" },
        { id: 2, title: "Cart", link: "" },
        { id: 3, title: "Login", link: "" },
        { id: 4, title: "Wishlist", link: "" },
      ],
    },
    {
      id: 3,
      title: "Legal",
      links: [
        { id: 1, title: "Terms & Conditions", link: "" },
        { id: 2, title: "Payment Methods", link: "" },
        { id: 3, title: "Refund Policy", link: "" },
        { id: 4, title: "Shipping Policy", link: "" },
        { id: 5, title: "Privacy Policy", link: "" },
      ],
    },
  ],
  socialMedia: [
    { id: 1, title: "YouTube", link: "https://youtube.com", icon: RiYoutubeLine },
    { id: 2, title: "Instagram", link: "https://instagram.com", icon: FaInstagram },
    { id: 3, title: "Facebook", link: "https://facebook.com", icon: FaFacebookF },
    { id: 4, title: "LinkedIn", link: "https://linkedin.com", icon: FaLinkedin },
  ],
};


export default footerInfo;
