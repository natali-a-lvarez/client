import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [bookDetails, setBookDetails] = useState(false);
  const [book, setBook] = useState({});

  useEffect(() => {
    fetch("http://127.0.0.1:5000/books")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  async function clickHandler(id) {
    const res = await fetch(`http://127.0.0.1:5000/books/${id}`);
    const data = await res.json();
    setBook(data);
    setBookDetails(true);
  }

  return (
    <>
      <h1>These are my books</h1>
      {!bookDetails &&
        data.map((book) => (
          <div onClick={() => clickHandler(book.id)}>
            <h3>{book.title}</h3>
          </div>
        ))}
      {bookDetails && (
        <div>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>
      )}
    </>
  );
}

export default App;
