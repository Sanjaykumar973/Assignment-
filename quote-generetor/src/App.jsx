import react, { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`https://api.quotable.io/random`)
      .then((res) => res.json())
      .then((quote) => {
        setQuote(quote.content);
        setAuthor(quote.author);
        setLoading(false);
      })
      .catch((err) => {
        alert("Something Went Wrong !");
        setLoading(false);
      });
  }, []);

  let fetchNewQuote = () => {
    fetch(`https://api.quotable.io/random`)
      .then((res) => res.json())
      .then((quote) => {
        setQuote(quote.content);
        setAuthor(quote.author);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="App">
        <div className="quote">
          <h2>{quote}</h2>
          <small>-{author}-</small>
        </div>
        <br />
        <button className="btn" onClick={fetchNewQuote}>
          Generate New Quote
        </button>
      </div>
    </>
  );
}

export default App;
