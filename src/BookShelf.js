import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types'


const BookShelf = props => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map((book) => {
            return (
              <li key={book.id}>
                <Book book={book} onChangeShelf={props.onChangeShelf}/>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}



export default BookShelf;