import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as Books from "../BooksAPI";
import Book from "./Book";

/**
 * @description when the client search books show and if query is not exist show error
 * @constructor Search
 * @param props to receive the data from the parent
 * @returns books from search api
 */

function Search(props) {
  const [query, setQuery] = useState("");
  const [bookResult, setBookResult] = useState([]);
  const [active, setActive] = useState(true);

  /**
   * @description when the client search books show and if query is not exist show error
   * @param {string} query string come from search bar
   * @returns if we have search value get data from api if not return error and if books id in the search page
   * equal thats in home page set or change the shelf
   */

  useEffect(() => {
    if (query) {
      Books.search(query).then((data) => {
        if (data.error) {
          setActive(false);
        } else {
          setBookResult(
            data.map((booksSearch) => {
              props.books.forEach((book) => {
                if (booksSearch.id === book.id) {
                  booksSearch.shelf = book.shelf;
                }
              });
              return booksSearch;
            })
          );
          setActive(true);
        }
      });
    }
  }, [props.books, query]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {active ? (
            bookResult.map((x) => {
              return (
                <li key={x.id}>
                  <Book
                    title={x.title}
                    id={x.id}
                    img={x.imageLinks.thumbnail}
                    authors={x.authors}
                    update={props.update}
                    shelf={x.shelf}
                    books={props.books}
                  />
                </li>
              );
            })
          ) : (
            <div className="empty"> "Empty Query" </div>
          )}
        </ol>
      </div>
    </div>
  );
}
export default Search;
