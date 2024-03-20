import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((data) => setData(data.users));
  }, []);

  return (
    <>
      <h1>This is my app</h1>
      {data.map((user, i) => (
        <p key={i}>{user}</p>
      ))}
    </>
  );
}

export default App;
