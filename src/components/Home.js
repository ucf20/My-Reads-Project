import React from "react";
import Shelf from "./Shelf";
import { Link } from "react-router-dom";

/**
 * @description Have all components in home page
 * @constructor Home
 * @param props to receive the data from the parent
 * @returns Shelf components and send data to it from props
 */

function Home(props) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <Shelf
          name="Currently Reading"
          books={props.books}
          id="1"
          category="currentlyReading"
          update={props.update}
        />
        <Shelf
          name="Want to Read"
          books={props.books}
          id="2"
          category="wantToRead"
          update={props.update}
        />
        <Shelf
          name="Read"
          books={props.books}
          id="3"
          category="read"
          update={props.update}
        />
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}
export default Home;
