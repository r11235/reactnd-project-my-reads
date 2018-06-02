import React from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import Book from './Book'
import './App.css'

class SearchPage extends React.Component {

  static propTypes = {
    searchBooks: PropTypes.array.isRequired,
    findBook: PropTypes.func.isRequired,
    changeShelf: PropTypes.func.isRequired,
    clearSearch: PropTypes.func.isRequired,
    closeSearch: PropTypes.func.isRequired,
  }

  render () {
    const defaultBook = this.props.defaultBook;
    
    const search = (event) => {
      if (event.target.value.length > 0) {
          this.props.findBook(event.target.value);
        } else {
            this.props.clearSearch();
        }
    };
    
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <div className="close-search"><Link to="/"><a className="close-search" onClick={this.props.closeSearch}>Close</a></Link></div>
          <div className="search-books-input-wrapper">
            ///NOTES: The search from BooksAPI is limited to a particular set of search terms:
            // https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
            // The BooksAPI.search method DOES search by title or author.
            <input type="text" placeholder="Search by title or author" onChange={search} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { this.props.searchBooks.length > 0 && this.props.searchBooks.map((bk, i) => (
                <li key={(bk && bk.Id) || Math.random()*10}>
                  <Book book={(bk && bk[i]) || defaultBook} onUpdate={this.props.changeShelf} />
                </li>))
            }  
          </ol>
        </div>
      </div>
	  )
  }
}

export default SearchPage