import React, { useState, useEffect } from "react";
import "./App.css";
import Search from "./components/serch";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import * as Books from "./BooksAPI";

/**
 * @description Collect all components of the application and,  using the route in it
 * @constructor App
 */

function App() {
  const [books, setBooks] = useState([]);

  /**
   * @description used to update the shelf of the books
   * @param {string} book - The book to get the id of books
   * @param {string} shelf - The shelf of the books
   * @returns change the option of books
   */

  const updateState = async (book, shelf) => {
    await Books.update(book, shelf);
    await Books.getAll().then((data) => setBooks(data));
  };

  useEffect(() => {
    // get all avilable books from api
    Books.getAll().then((data) => setBooks(data));
  }, []);

  return (
    // Routs to change the pages
    <div className="app">
      <Routes>
        <Route
          key={1}
          path="/"
          exact
          element={<Home books={books} update={updateState} />}
        />
        <Route
          key={2}
          path="search"
          element={<Search books={books} update={updateState} />}
        />
      </Routes>
    </div>
  );
}

export default App;
