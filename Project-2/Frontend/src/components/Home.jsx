import { useContext, useEffect } from "react";
import FormContext from "../../FormContext";
import { useNavigate } from "react-router-dom";
import Contact from "./Contact";
export default function Home() {
  const { user } = useContext(FormContext);
  const navigate = useNavigate();

  // check for user is logged in or not login, if not then redirect to login
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="container mt-5 p-0">
      <div style={{ display: "flex", gap: "20px", height: "80vh" }}>
        <Contact />
      </div>
    </div>
  );
}
