import { Link } from "react-router-dom"; 
import footerInfo from "../utils/footerInfo";
import FooterItem from "../layout/FooterItem";



const Footer = () => {
  const { links, socialMedia } = footerInfo;
  const empresa = links.find((item) => item.title === "Company");
  const cuenta = links.find((item) => item.title === "My Account");
  const legal = links.find((item) => item.title === "Legal");


  const handleSubscribe = (e) => {
    e.preventDefault();
   
  };


  return (
    <footer className="bg-white position-relative">
      <article className="container py-5 py-md-5">
        <div className="row g-4 g-md-5 align-items-center">
       
          <section className="col-12 col-md-5 col-lg-3 d-flex flex-column gap-3">
            <img
              className="img-fluid"
              style={{ maxWidth: 150 }}
              src="/images/nexgenPPF.png"
              alt="logo"
            />
            <div>
              <p className="mb-1">Do you have any questions?</p>
              <p className="text-secondary">PBX: (601) 370.22.00</p>
            </div>
            <p className="mb-2">
              Lorem ipsum dolor sit amet consectetur. Etiam id enim diam
              sollicitudin ut molestie velit.
            </p>


            <div className="d-flex gap-3 align-items-center">
              {socialMedia.map((social) => {
                const Icon = social.icon; 
                return (
                  <a
                    key={social.id}
                    className="d-inline-flex align-items-center text-dark"
                    title={social.title}
                    href={social.link || "#"}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.title}
                  >
                    <Icon size={24} />
                  </a>
                );
              })}
            </div>
          </section>


          
          <section className="col-12 col-md-9">
            <div className="row g-4">
              <div className="col-6 col-md-3">
                {empresa && (
                  <FooterItem title={empresa.title} links={empresa.links} />
                )}
              </div>


              <div className="col-6 col-md-3">
                {cuenta && (
                  <FooterItem title={cuenta.title} links={cuenta.links} />
                )}
              </div>


              
              <div className="col-12 col-md-3">
                {legal && (
                  <FooterItem title={legal.title} links={legal.links} collapsible />
                )}
              </div>


            
              <div className="col-12 col-md-3">
                <h5 className="mb-3 text-dark">News Letter</h5>
                {/* <form className="d-flex flex-column gap-3" onSubmit={handleSubscribe}>
                  <label htmlFor="newsletterEmail" className="visually-hidden">
                    Email address
                  </label>
                  <input
                    id="newsletterEmail"
                    className="form-control"
                    type="email"
                    placeholder="Email address"
                    required
                  />
                  <button className="btn btn-danger w-100" type="submit">
                    Subscribe
                  </button>


                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="privacyCheck"
                      required
                    />
                    <label className="form-check-label" htmlFor="privacyCheck">
                      <Link className="link-secondary text-decoration-none" to="#">
                        Read and accept the privacy policy
                      </Link>
                    </label>
                  </div>
                </form> */}

                 <div class="footer-column newsletter">
         
          <form action="https://formspree.io/f/xpwdazal"  className="d-flex flex-column gap-3"  method="POST">
            <label>
              <input type="email" name="email" className="form-control" placeholder="Email address" required />
            </label>
            <label>
              <textarea name="message" className="form-control" placeholder="Write your message here" rows="4"></textarea>
            </label>
           
            <button class="btn btn-danger w-100" type="submit">Enviar</button>
          </form>
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
