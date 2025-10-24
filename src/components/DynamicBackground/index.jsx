import { useEffect, useState } from "react";
import "./DynamicBackground.css";


export default function DynamicBackground({ images = [], interval = 6000, children }) {
  const [index, setIndex] = useState(0);


  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images, interval]);


  return (
    <div
      className="dynamic-bg d-flex align-items-center justify-content-center"
      style={{ backgroundImage: `url(${images[index]})` }}
    >
      {children}
    </div>
  );
}
