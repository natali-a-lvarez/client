import React, { useState, useEffect } from "react";
import Form from "./components/Form";

function App() {
  const [data, setData] = useState([]);
  const [bookDetails, setBookDetails] = useState(false);
  const [book, setBook] = useState({});
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/books")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [data]);

  function goHomeHandler() {
    setBookDetails(false);
    setOpenForm(false);
  }

  async function clickHandler(id) {
    const res = await fetch(`http://127.0.0.1:5000/books/${id}`);
    const data = await res.json();
    setBook(data);
    setBookDetails(true);
  }

  function openFormHandler() {
    setOpenForm(true);
  }

  async function handleDelete() {}

  return (
    <>
      <h1 onClick={goHomeHandler}>
        {!openForm ? "These are my books" : "Add a Book"}
      </h1>
      {!bookDetails &&
        !openForm &&
        data.map((book) => (
          <div key={book.id} onClick={() => clickHandler(book.id)}>
            <h3>{book.title}</h3>
            <button>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        ))}
      {bookDetails && !openForm && (
        <div>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>
      )}
      {!openForm && !bookDetails && (
        <button onClick={openFormHandler}>Add a book</button>
      )}
      {openForm && <Form setOpenForm={setOpenForm} />}
    </>
  );
}

export default App;
