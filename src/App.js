import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import BookSection from './components/BooksSection';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    this.fetchBooks()
  };

  fetchBooks = () => {
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books
      }))
    })
  };

  fastChangeBooks = (book, shelf) => {
    book.shelf = shelf
    const newArrayOfBooks = this.state.books.slice()
    const indexOfBook = newArrayOfBooks.findIndex(b => b.id === book.id)
    newArrayOfBooks[indexOfBook] = book
    this.setState({books: newArrayOfBooks})
  };

  updateBookShelf = (book, shelf) => {
    this.fastChangeBooks(book, shelf)

    BooksAPI.update(book, shelf).then(() => {
      this.fetchBooks()
    });

  };

  render() {
    return (
      <div className="app">

        <Route path='/search' render={ () => (

          <SearchBar
            updateBook={(book, shelf) => {
              this.updateBookShelf(book, shelf)
            }}
            currentBooks={this.state.books}
          />

        ) } />

        <Route exact path='/' render={() => (
          <div>
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">

              <div>
                <BookSection
                  title='Currently Reading'
                  books={this.state.books.filter((book) =>
                    book.shelf === "currentlyReading"
                  )}
                  updateBook={this.updateBookShelf}
                />
                <BookSection
                  title='Want to Read'
                  books={this.state.books.filter((book) =>
                    book.shelf === "wantToRead"
                  )}
                  updateBook={this.updateBookShelf}
                />
                <BookSection
                  title='Read'
                  books={this.state.books.filter((book) =>
                    book.shelf === "read"
                  )}
                  updateBook={this.updateBookShelf}
                />
                </div>
              </div>

            </div>
        )}/>

        <div className="open-search">
          <Link
            to='/search'
          >Add a bokk</Link>
        </div>

      </div>
    )
  }
}

export default BooksApp
