import React, { useState, useEffect } from "react";
import Form from "./components/Form";

function App() {
  const [data, setData] = useState([]);
  const [bookDetails, setBookDetails] = useState(false);
  const [book, setBook] = useState({});
  const [openForm, setOpenForm] = useState(false);
  const [editBook, setEditBook] = useState(false);
  const [addBook, setAddBook] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/books")
      .then((res) => res.json())
      .then((data) => setData(data.books));
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
    setAddBook(true);
  }

  async function handleDelete(id) {
    await fetch(`http://127.0.0.1:5000/books/${id}`, {
      method: "DELETE",
    });
    goHomeHandler();
  }

  async function handleEdit(id) {
    setId(id);
    setOpenForm(true);
    setEditBook(true);
  }

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
            <button onClick={() => handleEdit(book.id)}>Edit</button>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
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
      {openForm && (
        <Form
          setOpenForm={setOpenForm}
          goHomeHandler={goHomeHandler}
          addBook={addBook}
          id={id}
          setEditBook={setEditBook}
          setAddBook={setAddBook}
        />
      )}
    </>
  );
}

export default App;
