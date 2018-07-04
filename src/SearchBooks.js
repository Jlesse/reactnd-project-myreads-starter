import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI.js';
import { Link } from 'react-router-dom';
import Book from "./Book.js"
import './App.css'

class SearchBooks extends Component{
  state = {
    searchTerm: '',
    books: []
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
        this.setState({books: books})
      })
    }
  }

  onChangeShelf = (book, shelf) => {
    const books = this.state.books.filter((b) => b.id !== book.id);
    this.setState({books: books});
    this.props.onChangeShelf(book, shelf);
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
                  <Book book={book} onChangeShelf={this.onChangeShelf}/>
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