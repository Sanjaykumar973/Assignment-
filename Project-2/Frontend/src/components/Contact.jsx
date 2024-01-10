import React, { useState, useContext } from "react";
import FormContext from "../../FormContext";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const { contact } = useContext(FormContext);
  return (
    <>
      {/*Section: Contact v.2*/}
      <section className="mb-4">
        <div className="row">
          {/*Grid column*/}
          <div className="col-md-6 mb-md-0 mb-5">
            {/*Section heading*/}
            <h2 className="h1-responsive font-weight-bold text-center my-4">
              Contact us
            </h2>
            {/*Section description*/}
            <p className="text-center w-responsive mx-auto mb-5">
              Do you have any questions? Please do not hesitate to contact us
              directly. Our team will come back to you within a matter of hours
              to help you.
            </p>
            <form
              id="contact-form"
              name="contact-form"
              action="mail.php"
              method="POST"
            >
              {/*Grid row*/}
              <div className="row">
                {/*Grid column*/}
                <div className="col-md-6">
                  <div className="md-form mb-0">
                    <input
                      onChange={(e) => setName(e.currentTarget.value)}
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      placeholder="Enter Your Name"
                    />
                    <br />
                  </div>
                </div>
                {/*Grid column*/}
                {/*Grid column*/}
                <div className="col-md-6">
                  <div className="md-form mb-0">
                    <input
                      onChange={(e) => setEmail(e.currentTarget.value)}
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter Your Email"
                    />
                    <br />
                  </div>
                </div>
                {/*Grid column*/}
              </div>
              {/*Grid row*/}
              {/*Grid row*/}
              <div className="row">
                <div className="col-md-12">
                  <div className="md-form mb-0">
                    <input
                      onChange={(e) => setSubject(e.currentTarget.value)}
                      type="text"
                      id="subject"
                      name="subject"
                      className="form-control"
                      placeholder="Suject"
                    />
                    <br />
                  </div>
                </div>
              </div>
              {/*Grid row*/}
              {/*Grid row*/}
              <div className="row">
                {/*Grid column*/}
                <div className="col-md-12">
                  <div className="md-form">
                    <textarea
                      onChange={(e) => setMessage(e.currentTarget.value)}
                      type="text"
                      id="message"
                      name="message"
                      rows={2}
                      className="form-control md-textarea"
                      defaultValue={""}
                      placeholder="Your Message"
                    />
                  </div>
                </div>
              </div>
              {/*Grid row*/}
            </form>
            <br />
            <div className="text-center text-md-left">
              <button
                className="btn btn-primary"
                onClick={() => contact(name, email, subject, message)}
              >
                Send Message
              </button>
            </div>
            <div className="status" />
          </div>
          {/*Grid column*/}
          {/*Grid column*/}
          <div className="col-md-6 text-center">
            <img
              src="https://www.intellect-worldwide.com/wp-content/uploads/sites/123/2020/11/edited-contact-us.png"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          {/*Grid column*/}
        </div>
      </section>
      {/*Section: Contact v.2*/}
    </>
  );
}
