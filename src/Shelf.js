import React from 'react'
import Book from './Book'
import {PropTypes} from 'prop-types'

class Shelf extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  render () {
	  return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title || 'BOOKSHELF TITLE'}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">  
              {this.props.books.map((book) => (
                <li key={book.Id || Math.random()*10}>
                  <Book book={book} onUpdate={this.props.changeShelf} />
                </li>
                ))}
            </ol>
          </div>
        </div>
	  )
  }
}

export default Shelf