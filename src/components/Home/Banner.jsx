import Carousel from "react-bootstrap/Carousel";


export default function Banner() {
  return (
    <div style={{ position: "", height: "", overflow: "hidden" }}>
      <Carousel fade controls={false} indicators interval={6000} pause="hover" className="h-100">
        {/* Primer video */}
        <Carousel.Item className="h-100">
          <video
            src="/videos/PPF.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="d-block w-100 h-100"
            style={{ objectFit: "cover" }} 
          />
          <Carousel.Caption className="text-start mb-5">
            <h1 className="fw-bold display-4">Primer video</h1>
            <p className="lead">Texto descriptivo del primer video.</p>
          </Carousel.Caption>
        </Carousel.Item>


        {/* Segundo video */}
        <Carousel.Item className="h-100">
          <video
            src="/videos/WindowFilm.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="d-block w-100 h-100"
            style={{ objectFit: "cover" }}
          />
          <Carousel.Caption className="text-start mb-5">
            <h1 className="fw-bold display-4">Segundo video</h1>
            <p className="lead">Texto descriptivo del segundo video.</p>
          </Carousel.Caption>
        </Carousel.Item>

         {/* Tercer video */}
        <Carousel.Item className="h-100">
          <video
            src="/videos/Boats.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="d-block w-100 h-100"
            style={{ objectFit: "cover" }}
          />
          <Carousel.Caption className="text-start mb-5">
            <h1 className="fw-bold display-4">Segundo video</h1>
            <p className="lead">Texto descriptivo del segundo video.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
