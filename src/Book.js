import React, {Component} from 'react'

class Book extends Component {
  render(){
    console.log(this.props.book)
    const book = this.props.book;
    const {title, subtitle, authors} = book;
    const thumbnail = book.imageLinks.thumbnail;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})`}}></div>
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={(e) => this.props.onChangeShelf(book, e.target.value)}>
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
          {authors.map((author) => {
            return (<div key={author} className="book-author">{author}</div>)
          })}
        </div>
      </div>
    )
  }
}

export default Book;