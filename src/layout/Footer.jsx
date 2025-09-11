import { Link } from "react-router";
import footerInfo from "../utils/footerInfo";
import FooterItem from "../layout/FooterItem";


const Footer = () => {
  const { links, socialMedia } = footerInfo;
  const empresa = links.find((item) => item.title === "Empresa");
  const cuenta = links.find((item) => item.title === "Mi Cuenta");
  const legal = links.find((item) => item.title === "Legal");


  return (
    <footer className="bg-white position-relative">
      


      <article className="container py-5 py-md-5">
        <div className="row g-4 g-md-5 align-items-center">
          {/* Columna izquierda: logo + contacto + redes */}
          <section className="col-12 col-md-5 col-lg-3 d-flex flex-column gap-3">
            <img
              className="img-fluid"
              style={{ maxWidth: 150 }}
              src="/images/nexgenPPF.png"
              alt="logo"
            />
            <div>
              <p className="mb-1">¿Tienes alguna pregunta?</p>
              <strong className="text-secondary">PBX: (601) 370.22.00</strong>
            </div>
            <p className="mb-2">
              Lorem ipsum dolor sit amet consectetur. Etiam id enim diam
              sollicitudin ut molestie velit.
            </p>


            <div className="d-flex gap-3 align-items-center">
              {socialMedia.map((social) => (
                <Link
                  key={social.id}
                  className="d-inline-flex align-items-center"
                  title={social.title}
                  to={social.link}
                >
                  <img
                    src={social.icon}
                    alt="icon"
                    className="img-fluid"
                    style={{ width: 24, height: 24 }}
                  />
                </Link>
              ))}
            </div>
          </section>


          {/* Columna derecha: grilla de enlaces + newsletter */}
          <section className="col-12 col-md-9">
            <div className="row g-4">
              <div className="col-6 col-md-3">
                <FooterItem title={empresa.title} links={empresa.links} />
              </div>


              <div className="col-6 col-md-3">
                <FooterItem title={cuenta.title} links={cuenta.links} />
              </div>


              {/* Legal colapsable (si tu FooterItem soporta 'collapsible') */}
              <div className="col-12 col-md-3">
                <FooterItem title={legal.title} links={legal.links} collapsible />
              </div>


              {/* Newsletter */}
              <div className="col-12 col-md-3">
                <h5 className="mb-3 text-dark">News Letter</h5>
                <div className="d-flex flex-column gap-3">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Correo electrónico"
                  />
                  <button className="btn btn-danger w-100">
                    Suscribirme
                  </button>


                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="privacyCheck"
                    />
                    <label className="form-check-label" htmlFor="privacyCheck">
                      <Link className="link-secondary text-decoration-none" to="#">
                        He leído y acepto la política de privacidad
                      </Link>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </article>
    </footer>
  );
};


export default Footer;
