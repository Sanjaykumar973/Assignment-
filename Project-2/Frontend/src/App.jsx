import { useState } from "react";
import Login from "./components/login";
import Register from "./components/Register";
import Contact from "./components/Contact";
import Home from "./components/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import FormContext from "../FormContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          toast.error(data.message);
        } else {
          setUser(data);
          navigator("/contact");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const navigator = useNavigate();

  const signup = (name, email, password) => {
    fetch("http://localhost:8000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          toast.error(data.message);
        } else {
          toast.success(data.message);
          navigator("/");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const contact = (name, email, subject, message) => {
    fetch("http://localhost:8000/auth/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, subject, message }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          toast.error(data.message);
        } else {
          toast.success("Details Dend ");
          // navigator("/");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div>
      <FormContext.Provider value={{ login, signup, contact }}>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </FormContext.Provider>
    </div>
  );
}

export default App;
