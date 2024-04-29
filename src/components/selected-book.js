import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';

import './selected-book.css';

const SelectedBook = ({ book }) => {

    const [, setCompletedTyping] = useState(true);
    const [displayResponse, setDisplayResponse] = useState('');

    useEffect(() => {
        const { volumeInfo } = book;
        if(!isEmpty(volumeInfo?.description)) {
            const description = volumeInfo?.description || '';
            let i = 0;
      
            let intervalId = setInterval(() => {
              setDisplayResponse(description.slice(0, i));
          
              i++;
          
              if (i > description.length) {
                clearInterval(intervalId);
                setCompletedTyping(true);
              }
            }, 20);
            return () => clearInterval(intervalId);
        }
      }, [book]);

    if(isEmpty(book)) {
        return null;
    }

    const renderSelectedBook = () => {
        const { authors, publishedDate, imageLinks, title  } = book.volumeInfo;
        return (
            <div className='selectedBook'>
                <h2>{title}</h2>
                <p>Author: {authors[0]}</p>
                {/* <p>Genre: {genre}</p> */}
                <p>Description: {displayResponse}</p>
                <p>Published on: {publishedDate}</p>
                <img src={imageLinks?.thumbnail || imageLinks?.smallThumbnail} alt={title} />
                {/* Add more book details here */}
            </div>
        );
    };

    return renderSelectedBook();
};

export default SelectedBook;