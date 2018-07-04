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

  render(){
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/"/>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
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