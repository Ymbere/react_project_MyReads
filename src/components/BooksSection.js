import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BookSection = props =>  {

    const { title, books } = props
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">

                    {books.map((book) => (
                        <li key={book.id}>
                            <Book
                                book={book}
                                updateBook={props.updateBook}
                            />
                        </li>
                    ))}

                </ol>

            </div>

        </div>
    );
};

BookSection.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired,
}

export default BookSection;