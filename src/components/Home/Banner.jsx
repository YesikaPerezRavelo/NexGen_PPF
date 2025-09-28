import Carousel from "react-bootstrap/Carousel";
import ButtonAll from "../ButtonAll";
import bannersData from "../../data/bannerData.jsx";


export default function Banner() {
  return (
    <div>
      <Carousel
        fade
        controls={false}
        indicators
        interval={4000}
        pause="hover"
        className="h-100"
      >
        {bannersData.map((banner) => (
          <Carousel.Item key={banner.id} className="h-100">
            {banner.type === "video" ? (
              <video
                src={banner.src}
                autoPlay
                muted
                loop
                playsInline
                className="d-block w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <img
                src={banner.src}
                alt={banner.title}
                className="d-block w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            )}


            <Carousel.Caption className="text-start mb-5">
              <h1 className="fw-bold display-4">{banner.title}</h1>
              <p className="lead">{banner.text}</p>


              {banner.cta && (
                <ButtonAll to={banner.cta.to}>
                  {banner.cta.label}
                </ButtonAll>
              )}
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
