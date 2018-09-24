import React, { Component } from 'react'

class Book extends Component {
  state = {
    shelf: ''
  }

  updateShelf = (shelf) => {
    let book = this.props.book
    this.setState({ shelf })
    this.props.onSelectShelf(book, shelf)
  }

  render () {
    let styles = {
      width: '128px',
      height: '193px'
    }

    /*
    TODO: add generic image for books without images
    */

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <img
              className="book-cover"
              style={styles}
              src={this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : '/'}
              alt={this.props.book.title}/>
            <div className="book-shelf-changer">
              <select
                onChange={
                  (e) => this.updateShelf(e.target.value)
                }
                value={this.props.book.shelf}
              >
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading" >Currently Reading</option>
                <option value="wantToRead" >Want to Read</option>
                <option value="read" >Read</option>
                <option value="none" >None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">
            {this.props.book.authors ?this.props.book.authors.join(', ') : ''}
          </div>
        </div>
      </li>
    )
  }
}

export default Book
