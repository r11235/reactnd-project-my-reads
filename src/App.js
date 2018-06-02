import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Shelves from './Shelves'
import SearchPage from './SearchPage'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    searchBooks: [],
    searchText: '',
    defaultBook: {defaultImage: 'no image'}
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books: books});
    });
  }

  render() {
    const changeShelf = (book, newShelf) => (
      BooksAPI.update(book, newShelf).then(res => {
        book.shelf = newShelf
        const updatedBooks = this.state.books.filter(b => b.id !== book.id)
        updatedBooks.push(book);
        this.setState({books: updatedBooks})
        }
      )
    );

    const clearSearch = () => {
      this.setState({searchBooks: []});
      this.setState({searchText: ''});
      return null
    };

    const findBook = (book) => {
      this.setState({searchText: book});

      BooksAPI.search(book).then(res => {
        this.state.searchBooks.push(res);
        const sbooks = this.state.books.filter(book => book.title===book);
        this.state.searchBooks.concat(sbooks);
        return this.state.searchBooks
        }
      )
    };

    const closeSearch = () => {
      this.setState({searchBooks: []});
      this.setState({searchText: ''});
      return this.setState({ showSearchPage: false })
    };

    return (
      <div className="app">

        <Route path='/search' render={() => (
          <SearchPage findBook={findBook} clearSearch={clearSearch}
                      closeSearch={closeSearch} changeShelf={changeShelf}
                      searchBooks={this.state.searchBooks}
                      defaultBook={this.state.defaultBook} />
          )}
        />

        <Route exact path='/' render={() => (
          <div>
            <Shelves books={this.state.books} changeShelf={changeShelf} />
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>)}
        />
       
      </div>
    )
  }
}

export default BooksApp