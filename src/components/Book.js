import React from 'react';
import PropTypes from 'prop-types';

const handleUpdateBook = (event, props) => {
    props.updateBook(props.book, event.target.value)
};

const bookIsInShelf = (props, book) => {
    if (props.isFromSearch !== undefined && book.shelf !== 'none') {
        return 'book-cover-active';
    } else if (book.shelf === 'none') {
        return 'book-cover';
    }

};

const Book = props =>  {

    const { book } = props
    return(
        <div className="book">
            <div className="book-top">
            <div className={bookIsInShelf(props, book)} style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
            </div>
                <div className="book-shelf-changer">
                    <select onChange={ (e) => handleUpdateBook(e, props) } value={book.shelf} >
                        <option value="move" disabled> Move to...</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
        </div>
    );

};

Book.propTypes = {
    book: PropTypes.object.isRequired,
    updateBook: PropTypes.func.isRequired,
}

export default Book;