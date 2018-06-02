import React from 'react'
import Shelf from './Shelf'
import Title from './Title'
import {PropTypes} from 'prop-types'

class Shelves extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  render () {
    const currentlyreading = this.props.books.filter((book) => (book.shelf === "currentlyReading"));
    const wanttoread = this.props.books.filter((book) => (book.shelf === "wantToRead"));
    const read = this.props.books.filter((book) => (book.shelf === "read"));
  	return (
      <div className="list-books">
        <Title />
        <div className="list-books-content">
          <div>
            <Shelf books={currentlyreading} title="Currently Reading" changeShelf={this.props.changeShelf} />
            <Shelf books={wanttoread} title="Want to Read"  changeShelf={this.props.changeShelf} />
            <Shelf books={read} title="Read"  changeShelf={this.props.changeShelf} />
          </div>
        </div>
      </div>
    )
  }
}

export default Shelves