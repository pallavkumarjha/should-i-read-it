import logo from './logo.svg';
import './App.css';
import SearchContainer from './components/search';
import { useState } from 'react';
import SelectedBook from './components/selected-book';
import { Typography } from 'antd';
const { Title } = Typography;

function App() {
  const [selectedBook, setSelectedBook] = useState({});

  return (
    <div className="App">
      <header className="App-header">
        <Title level={2}> Should I read it?</Title>
      </header>
      <SearchContainer setSelectedBook={setSelectedBook} />
      <SelectedBook book={selectedBook} />
    </div>
  );
}

export default App;
