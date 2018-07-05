import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI.js';
import { Link } from 'react-router-dom';
import Book from "./Book.js"
import PropTypes from 'prop-types'
import './App.css'

class SearchBooks extends Component{
  state = {
    searchTerm: '',
    books: []
  }

  static propTypes = {
    userBooks: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  updateSearchTerm = (query) => {
    if(query.length === 0){
      this.setState({query: '', books: []})
    } else {
      this.setState({query: query.trim()})
      BooksAPI.search(query).then((books) => {
        if(books.error){
          books = [];
        }
        books = books.map((apiBook) => {
          let userBook;
          if(userBook = this.props.userBooks.find((userBook) => userBook.id === apiBook.id )){
            apiBook.shelf = userBook.shelf;
          }
          return apiBook;
        });
        this.setState({books: books});
      });
    }
  }

  render(){
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/"/>
          <div className="search-books-input-wrapper">
            <form>
              <input type="text" onChange={(e) => this.updateSearchTerm(e.target.value)} placeholder="Search by title or author"/>
            </form>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map((book) => {
              return (
                <li key={book.id}>
                  <Book book={book} onChangeShelf={this.props.onChangeShelf}/>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks