import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class ListBooks extends Component {
  state = {

  }

  handleShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((res) => {
      this.props.onChangeShelf(res)
    })
  }

  render() {
  const currentlyReadingShelf = this.props.books.filter((book) => (book.shelf === 'currentlyReading'))
  const wantToReadShelf = this.props.books.filter((book) => (book.shelf === 'wantToRead'))
  const readShelf = this.props.books.filter((book) => (book.shelf === 'read'))

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {this.props.books.length !== 0 ? (
            <div>

              {currentlyReadingShelf.length > 0 ? (

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.props.books.filter((book) => (book.shelf === 'currentlyReading')).map((book) => (
                        <Book
                          book={book}
                          key={book.id}
                          onSelectShelf={this.handleShelf}
                        />
                      ))}
                    </ol>
                  </div>
                </div>

              ) : (

                null

              )}

              {wantToReadShelf.length > 0 ? (

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.props.books.filter((book) => (book.shelf === 'wantToRead')).map((book) => (
                        <Book
                          book={book}
                          key={book.id}
                          onSelectShelf={this.handleShelf}
                        />
                      ))}
                    </ol>
                  </div>
                </div>

              ) : (

                null

              )}

              {readShelf.length > 0 ? (

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.props.books.filter((book) => (book.shelf === 'read')).map((book) => (
                        <Book
                          book={book}
                          key={book.id}
                          onSelectShelf={this.handleShelf}
                        />
                      ))}
                    </ol>
                  </div>
                </div>

              ) : (

                null

              )}
              
            </div>
          ) : (
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Add a book below!</h2>
              </div>
            </div>
          )}
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
