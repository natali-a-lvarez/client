import React, { useState } from "react";

function Form({
  setOpenForm,
  goHomeHandler,
  addBook,
  id,
  setEditBook,
  setAddBook,
}) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  async function handleAddBookSubmit(e) {
    e.preventDefault();

    const response = await fetch(`http://127.0.0.1:5000/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        author: author,
      }),
    });
    const data = await response.json();

    setOpenForm(false);
    setTitle("");
    setAuthor("");
    setAddBook(false);
    goHomeHandler();
  }

  async function handleEditBookSubmit(e) {
    e.preventDefault();

    const response = await fetch(`http://127.0.0.1:5000/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        author: author,
      }),
    });
    const data = await response.json();

    setOpenForm(false);
    setTitle("");
    setAuthor("");
    setEditBook(false);
    goHomeHandler();
  }

  return (
    <>
      <form onSubmit={addBook ? handleAddBookSubmit : handleEditBookSubmit}>
        <label>Title</label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          aria-label="title"
          required
        />
        <label>Author</label>
        <input
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
          type="text"
          aria-label="author"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Form;
