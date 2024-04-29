import { isEmpty } from 'lodash';
import React from 'react';

const SelectedBook = ({ book }) => {

    if(isEmpty(book)) {
        return null;
    }

    const renderSelectedBook = () => {
        const { authors, publishedDate, description, imageLinks, title  } = book.volumeInfo;
        return (
            <div>
                <h2>{title}</h2>
                <p>Author: {authors[0]}</p>
                {/* <p>Genre: {genre}</p> */}
                <p>Description: {description}</p>
                <p>Published on: {publishedDate}</p>
                <img src={imageLinks?.thumbnail || imageLinks?.smallThumbnail} alt={title} />
                {/* Add more book details here */}
            </div>
        );
    };

    return renderSelectedBook();
};

export default SelectedBook;