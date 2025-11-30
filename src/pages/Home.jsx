// pages/Home.jsx
// import CarouselHome from "../components/CarouselHome"
import { Helmet } from "react-helmet-async";
import Banner from "../components/Home/Banner";


function Home() {
  return (
    <>
      <Helmet htmlAttributes={{ lang: "en" }}>
        <title>Home | NexgenPPF</title>
        <meta
          name="description"
          content="Premium Paint Protection Film (PPF) designed to shield cars, buildings, and boats from scratches, UV damage, stains, and daily wear. Durable, self-healing, and crystal-clear protection for every surface.
"
        />
      </Helmet>


      <div className="container-fluid overflow-hidden p-0 m-0">
        <Banner />
      </div>
    </>
  );
}


export default Home;
