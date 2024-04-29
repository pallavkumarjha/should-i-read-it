import React, { useState, useCallback } from 'react';
import { AutoComplete } from 'antd';
import axios from 'axios';

import './search.css';
import { debounce } from 'lodash';

const SearchContainer = ({setSelectedBook}) => {
    const [options, setOptions] = useState([]);
    const [originalOptions, setOriginalOptions] = useState([]);
    // const [selectedOption, setSelectedOption] = useState({});

    const convertSearchString = (searchString) => {
        const encodedSeachString = encodeURI(searchString);
        return encodedSeachString;
    }

    const handleSearch = (e) => {
        debouncedGetResult(e);
    };

    const debouncedGetResult = useCallback(
        debounce((searchTerm) => {
            if (searchTerm.trim() === '') return;
            setOptions([]);
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=${convertSearchString(searchTerm)}&maxResults=5`)
              .then(response => {
                mutateOptions(response.data.items);
                setOriginalOptions(response.data.items);
              })
              .catch(error => {
                console.error(error);
              });
          }, 300),
        []
    );


    const mutateOptions = (data) => {
        const mutatedOptions = data?.map(item => {
            return {
                value: `${item.volumeInfo.authors[0]} | ${item.volumeInfo.title}`,
                key: item.id,
                label: `${item.volumeInfo.authors[0]} | ${item.volumeInfo.title}`,
            }
        });
        setOptions(mutatedOptions);
    }

    const onValueSelect = (value) => {
        const selectedOpt = originalOptions.find(option => `${option.volumeInfo.authors[0]} | ${option.volumeInfo.title}` === value);
        console.log('Selected value: ', selectedOpt);
        setSelectedBook(selectedOpt);
    }

    return (
        <div>
           <AutoComplete
                className='autocomplete-element'
                options={options}
                placeholder="Book name here"
                size='large'
                filterOption={(inputValue, option) =>
                    option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                onSearch={handleSearch}
                onSelect={onValueSelect}
                allowClear
            />
           
            {/* Render search results here */}
        </div>
    );
};

export default SearchContainer;