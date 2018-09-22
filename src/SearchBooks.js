import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  state = {
    query : '',
    foundBooks : []
  }

  clearQuery = (query) => {
    this.setState({ query: '' })
  }

  handleShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((res) => {
      this.props.onChangeShelf(res)
    })
    for(var book in this.state.foundBooks){
      for(var filter in this.props.books){
        if(this.state.foundBooks[book].id === this.props.books[filter].id){
          this.state.foundBooks[book].shelf = shelf
        }
      }
    }
  }

  searchBooks = (query) => {
    this.setState({ query })
    BooksAPI.search(query).then((foundBooks) => {

      if (!foundBooks.error) {
        /*finds books based off of the chosen books, and set their shelves,
        then set all others to 'none'*/

        /*Thanks to
          https://stackoverflow.com/questions/31005396/filter-array-of-objects-with-another-array-of-objects
          for help understanding slicing an array of objects based off of another
          array of objects*/

        var haveNoShelf = foundBooks.slice()

        for(var book in foundBooks){
          for(var filter in this.props.books){
            if(foundBooks[book].id === this.props.books[filter].id){
              foundBooks[book].shelf = this.props.books[filter].shelf
              delete haveNoShelf[book]
            }
          }
        }

        for(book in foundBooks){
          for(filter in haveNoShelf){
            if(foundBooks[book].id === haveNoShelf[filter].id){
              foundBooks[book].shelf = 'none'
            }
          }
        }

        this.setState({ foundBooks })
      }
    })
  }

  render() {
    const { query, foundBooks } = this.state


    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => (event.target.value !== '') ?
                this.searchBooks(event.target.value) :
                'Enter your search terms above'}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {(foundBooks && foundBooks.length > 0) ?
              foundBooks.map((book) => (
                <Book book={book}
                  key={book.id}
                  onSelectShelf={this.handleShelf}/>
              ))
              : (query.length > 0) ? 'No search results' :
                'Enter your search terms above'}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
