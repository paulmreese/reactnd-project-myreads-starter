import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books: [],
    shelves: {}
  }

  componentWillMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  handleUpdate = (books) => {
    this.setState({ books })
  }

  handleChangeShelf = (bookcase) => {
    this.setState({ shelves : bookcase })
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks
            books = {this.state.books}
            shelves = {this.state.shelves}
            onUpdate = {this.handleUpdate}
            onChangeShelf = {this.handleChangeShelf}
          />
        )}/>
        <Route path="/" exact render={() => (
          <ListBooks
            books = {this.state.books}
            shelves = {this.state.shelves}
            onChangeShelf = {this.handleChangeShelf}
          />
        )}/>
      </div>
    )}
  }

export default BooksApp
