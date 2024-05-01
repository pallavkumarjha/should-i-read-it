import React, { useState } from 'react';
import { AutoComplete } from 'antd';
import axios from 'axios';

import { SearchOutlined } from '@ant-design/icons';

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

    const debouncedGetResult = debounce((searchTerm) => {
        if (searchTerm.trim() === '') {
            setOptions([]);
            return;
        }
    
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${convertSearchString(searchTerm)}&maxResults=5`)
            .then(response => {
                mutateOptions(response.data.items);
                setOriginalOptions(response.data.items);
            })
            .catch(error => {
                console.error(error);
            });
    }, 300);

    const onValueSelect = (value) => {
        const selectedOpt = originalOptions.find(option => `${option.volumeInfo.authors[0]} | ${option.volumeInfo.title}` === value);
        console.log('Selected value: ', selectedOpt);
        setSelectedBook(selectedOpt);
    }

    return (
        <AutoComplete
            className='autocomplete-element'
            options={options}
            placeholder="Book name, Author, anything here"
            size='large'
            filterOption={(inputValue, option) =>
                option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
            onSearch={handleSearch}
            onSelect={onValueSelect}
            allowClear
            suffixIcon={<SearchOutlined />}
            popupClassName='autocomplete-popup'
        />
    );
};

export default SearchContainer;