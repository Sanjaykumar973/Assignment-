import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import FormContext from "../../FormContext";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { signup } = useContext(FormContext);

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://startup.mp.gov.in/assets/img/login-bg.png"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>
              <div className="divider d-flex align-items-center my-4">
                <h3 className="text-center fw-bold mx-3 mb-0">SignUp</h3>
              </div>

              <div className="form-outline mb-4">
                <input
                  onChange={(e) => setName(e.currentTarget.value)}
                  type="text"
                  id="form3Example1"
                  className="form-control form-control-lg"
                  placeholder="Enter Your Name "
                />
              </div>
              {/* Email input */}
              <div className="form-outline mb-4">
                <input
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  type="email"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                />
              </div>
              {/* Password input */}
              <div className="form-outline mb-3">
                <input
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                />
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  onClick={() => signup(name, email, password)}
                >
                  Register
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  You have an account?{" "}
                  <Link to="/" className="link-danger">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
