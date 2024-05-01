import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import OpenAI from 'openai';

import './selected-book.css';
import { Button, Layout } from 'antd';

// const openai = new OpenAI({
//     apiKey: 'sk-proj-uaZYTCI7Z2RvUGjF0NXmT3BlbkFJZbF2f73OIi8JGOJuAF0S', // This is the default and can be omitted
//     dangerouslyAllowBrowser: true
// });

const { Sider, Content } = Layout;

const SelectedBook = ({ book }) => {

    const [completedTyping, setCompletedTyping] = useState(false);
    const [displayResponse, setDisplayResponse] = useState('');

    // const initializeAssistant = async () => {
    //     const completion = await openai.chat.completions.create({
    //         messages: [{ role: "system", content: "You are a helpful assistant." }],
    //         model: "gpt-3.5-turbo",
    //     });
    //     console.log(completion.choices[0].message.content);
    // }

    // initializeAssistant();

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

    const onClickNavigate = () => {
        window.open(book.volumeInfo.previewLink, '_blank');
    }

    const renderSelectedBook = () => {
        const { authors, publishedDate, title, subtitle  } = book.volumeInfo;
        return (
            <div className='selectedBook'>
                <p className='published-date'>{publishedDate}</p>
                <h2 className='book-title'>{title}</h2>
                <h4 className='book-subtitle'>{subtitle}</h4>
                <p className='book-authors'>{authors}</p>
                <p className='book-description'>{displayResponse}</p>
                {completedTyping && <Button className='cta-button' onClick={onClickNavigate}>Check on Google books</Button>}
            </div>
        );
    };

    return renderSelectedBook();
};

export default SelectedBook;