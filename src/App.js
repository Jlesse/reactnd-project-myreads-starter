import React from 'react'
import * as BooksAPI from './BooksAPI.js'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks.js'
import UserLibrary from './UserLibrary.js'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({books: books}));
  }

  changeShelf = (book, shelf) => {
    if(this.state.books.length > 0){
      BooksAPI.update(book, shelf).then(()=>{
        book.shelf = shelf;
        const books = this.state.books.filter(b => b.id !== book.id);
        this.setState((prevState)=> ({
          books: [...books, book]
        }))
      })
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (<UserLibrary books={this.state.books} onChangeShelf={this.changeShelf} /> )} />
        <Route exact path='/search' render={() => (<SearchBooks books={this.state.books} onChangeShelf={this.changeShelf} /> )} />    
      </div>
    )
  }
}

export default BooksApp