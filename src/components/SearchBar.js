import React from 'react';
import * as BooksAPI from '../BooksAPI';
import Book from './Book';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

class SearchBar extends React.Component {
    state = {
        query: '',
        books: [],
    }

    fetchBooksFromAPI = (query) => {
        const queryValue = query

        if (queryValue.length > 0) {

            BooksAPI.search(queryValue)
                .then((response) => {
                    if ( response !== undefined && response.error !== undefined ) {
                        this.setState({books: []})
                    } else {
                        response = response.filter((r) => (r.imageLinks))
                        this.setState({
                            books: this.mergeBooksShelf(response)
                        })
                    }
                })

        } else {this.setState({books: []})};

    };

    handleOnChange = event => {
        this.setState({query: event.target.value}, () => {
            this.fetchBooksFromAPI(this.state.query)
        });

    };

    handleUpdateBook = (book, value) => {
        this.props.updateBook(book, value)
    };

    mergeBooksShelf = (books) => {
        let currentBooks = this.props.currentBooks

        if (books !== undefined){

            for (let book of books){
                book.shelf = 'none'
            }

            for (let book of books){
                currentBooks.map((cBook) => {
                    if (cBook.id === book.id) {
                        book.shelf = cBook.shelf
                    }
                    return book;
                })
            }

        } else {
            books = []
        }

        return books;

    };

    render () {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        className="close-search"
                        to='/'
                    >Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text" placeholder="Search by title or author"
                            onChange={this.handleOnChange} value={this.state.query}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">

                        {this.state.query.length > 0 && this.state.books.map((book) => (
                            <li key={book.id}>
                                <Book
                                    book={book}
                                    updateBook={this.handleUpdateBook}
                                    isFromSearch='1'
                                />
                            </li>
                        ))}

                    </ol>
                </div>
            </div>
        );
    }
}

SearchBar.propTypes = {
    updateBook: PropTypes.func.isRequired,
    currentBooks: PropTypes.array.isRequired,
}

export default SearchBar;