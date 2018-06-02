import React from 'react'
import {PropTypes} from 'prop-types'
import './App.css'

class Book extends React.Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired
  }

  render () {
    const changeShelf = (event) => this.props.onUpdate(this.props.book, event.target.value);

    const imgURL = (this.props.book && this.props.book.imageLinks) ? 
      (this.props.book.imageLinks.thumbnail && `url("${this.props.book.imageLinks.thumbnail}")`) : null;

    const noImage = (this.props.book && this.props.book.defaultImage) || null;

    const altURL = 'url("https://github.com/udacity/reactnd-project-myreads-starter/blob/master/src/icons/arrow-drop-down.svg")';

    const imageURL = imgURL || (noImage || altURL);

    const WIDTH = 128;
    const HEIGHT = 193;

    const book = noImage ? null : (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: WIDTH, height: HEIGHT, backgroundImage: imageURL }}></div>
            <div className="book-shelf-changer">
              <select onChange={changeShelf} value={(this.props.book && this.props.book.shelf) || 'none'}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{(this.props.book && this.props.book.title) || ''}</div>
          <div className="book-authors">
            {(this.props.book && this.props.book.authors) || ''}
          </div>
        </div>
      )
    ;
    
    return (
      <div>
        {book}
      </div>
    )
  }
}

export default Book