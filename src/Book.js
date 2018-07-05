import React, {Component} from 'react';
import PropTypes from "prop-types";

class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  render(){
    const book = this.props.book;
    const {title, subtitle, authors, shelf} = book;
    const thumbnail = book.imageLinks !== undefined ? book.imageLinks.thumbnail : '';

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})`}}></div>
          <div className="book-shelf-changer">
            <select value={shelf === undefined ? "none" : shelf} onChange={(e) => this.props.onChangeShelf(book, e.target.value)}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-title">{subtitle}</div>
        <div className="book-authors">
          {authors}
        </div>
      </div>
    )
  }
}

export default Book;