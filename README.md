# MyReads Project

This is the starter template for the final assessment project for Udacity's React Fundamentals course. The goal of this template is to save you time by providing a static example of the CSS and HTML markup that may be used, but without any of the React code that is needed to complete the project. If you choose to start with this template, your job will be to add interactivity to the app by refactoring the static code in this template.

Of course, you are free to start this project from scratch if you wish! Just be sure to use [Create React App](https://reactjs.org/docs/create-a-new-react-app.html) to bootstrap the project.

## TL;DR

To get started developing right away:

- install all project dependencies with `npm install`
- install React Router with ` react-router-dom `
- start the development server with `npm start`

## What You're Getting

```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    │── components
        │── Home.js # Have all components in home page
            │── shelf.js # have the book components
            │── Book.js  # have all details of the books that comes from the books api
        │── serch.js # search in search bar to get books
            │── Book.js  # have all details of the books that comes from the books api
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

Remember that good React design practice is to create new JS files for each component and use import/require statements to include them where they are needed.

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

## Important

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebook/create-react-app/blob/main/packages/cra-template/template/README.md).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
