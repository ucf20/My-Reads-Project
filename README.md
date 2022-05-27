# MyReads Project

#### This project about book shelves so the structure is :
- 3 book shelves
- Search page to add books

#### How it works:
we have 3 shelves :
- currentlyReading ( for books you currently reading).
- wantToRead (for books you want to read).
- Read ( for books you already read).

you can selecting the state of reading book by click on selection botton , 
and the book will change dynamically to the suitable shelf.

you can also, click on add botton to get the search page , 
and get books by searching for ex. (react , programming or etc..).


## Installation

To get started developing right away:

- install all project dependencies with `npm install`
- start the development server with `npm start`


## Frontend Interface
 - [`App`](#app)
 - [`Home`](#home)
 - [`Shelf`](#shelf)
 - [`Book`](#Book)
 - [`Serch`](#search)



### `App` 
Collect all components of the application and,  using the route in it.

``` js
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
```


### `Home` 
Have all components in home page.

contains 3 Shelves receive data from App and send Shelf names, books and id to Shelves. 

``` js
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
```

### `Shelf`
have the book components

```js
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

```

### `Book`
have all details of the books that comes from the books api

```js
function Book(props) {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${props.img})`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            onChange={(e) => {
              props.update(props, e.target.value);
            }}
            value={props.shelf ? props.shelf : "none"}
          >
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.title}</div>
      <div className="book-authors">{props.authors}</div>
      <div className="book-authors">{props.shelf ? props.shelf : "none"}</div>
    </div>
  );
}
```

### `Search`
search in search bar to get books.

```js
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
```

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

- [`getAll`](#getall)
- [`update`](#update)
- [`search`](#search)

### `getAll`

Method Signature:

```js
getAll();
```

- Returns a Promise which resolves to a JSON object containing a collection of book objects.
- This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf);
```

- book: `<Object>` containing at minimum an `id` attribute
- shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
- Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query);
```

- query: `<String>`
- Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
- These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.
