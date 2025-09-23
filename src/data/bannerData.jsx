// src/data/bannersData.jsx
const bannersData = [
  {
    id: 1,
    type: "video", // también podría ser "image"
    src: "/videos/PPF.mp4",
    title: "Protección PPF",
    text: "Film premium para autos, máxima durabilidad.",
    cta: { label: "Shop now", to: "/productos/ppf" },
  },
  {
    id: 2,
    type: "video",
    src: "/videos/WindowFilm.mp4",
    title: "Window Film",
    text: "Confort térmico y control solar en tu hogar.",
    cta: { label: "Shop now", to: "/productos/window-film" },
  },
  {
    id: 3,
    type: "video",
    src: "/videos/Boats.mp4",
    title: "Marine Film",
    text: "Protección avanzada para embarcaciones.",
    cta: { label: "Shop now", to: "/productos/marine" },
  },
];


export default bannersData;
