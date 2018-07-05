import React, {Component} from "react";
import {Link} from 'react-router-dom';
import BookShelf from './BookShelf.js';
import PropTypes from 'prop-types';


class UserLibrary extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  currentlyReading() {
    return this.props.books.filter(b => b.shelf === "currentlyReading");
  }

  wantToRead() {
    return this.props.books.filter(b => b.shelf === "wantToRead");
  }

  read() {
    return this.props.books.filter(b => b.shelf === "read");
  }

  render(){
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf books={this.currentlyReading()} name="Currently Reading" onChangeShelf={this.props.onChangeShelf}/>
          <BookShelf books={this.wantToRead()} name="Want To Read" onChangeShelf={this.props.onChangeShelf}/>
          <BookShelf books={this.read()} name="Read" onChangeShelf={this.props.onChangeShelf}/>
        </div>
        <div className="open-search">
          <Link to="/search"/>
        </div>
      </div>
    )
  }
};

export default UserLibrary;