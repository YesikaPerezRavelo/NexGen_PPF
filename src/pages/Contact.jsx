export default function Contact() {
  return (
    <div className="container py-5" style={{ maxWidth: "600px" ,  marginTop: "5rem" }}>
      <h2 className="text-center mb-4 fw-bold">
        Get in <span className="text-danger">Touch</span>
      </h2>

      <p className="text-center text-muted mb-5">
        We’d love to hear from you! Fill out the form below and we’ll get back to you as soon as possible.
      </p>

      <form
        action="https://formspree.io/f/xpwdazal"
        method="POST"
        className="d-flex flex-column gap-3 shadow-sm p-4 rounded bg-light"
      >
        <div>
          <label htmlFor="email" className="form-label fw-semibold">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="example@email.com"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="form-label fw-semibold">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="form-control"
            placeholder="Write your message here..."
            rows="4"
            required
          />
        </div>

        <button type="submit" className="btn btn-danger w-100 fw-semibold">
          Send Message
        </button>
      </form>

      <p className="text-center text-muted mt-4 small">
        We’ll respond within 24–48 hours. Thank you for reaching out!
      </p>
    </div>
  );
}
