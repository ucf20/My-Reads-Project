import React from "react";
import Book from "./Book";

/**
 * @description have the book components
 * @param props to receive the data from the parent
 * @returns  Book components
 */

function Shelf(props) {
  //  Filter the books by the category
  const bShelf = props.books.filter((x) => x.shelf === props.category);

  return (
    <div className="bookshelf" key={props.id}>
      <h2 className="bookshelf-title">{props.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {/* map to show the books */}
          {bShelf.map((x) => {
            return (
              <li key={x.id}>
                <Book
                  title={x.title}
                  img={x.imageLinks.thumbnail}
                  authors={x.authors}
                  id={x.id}
                  update={props.update}
                  shelf={x.shelf}
                  books={props.books}
                />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default Shelf;
