import './App.css';
import SearchContainer from './components/search/search';
import { useState } from 'react';
import SelectedBook from './components/selected-book/selected-book';
import { Layout, Typography } from 'antd';
import { isEmpty } from 'lodash';
const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;

function App() {
  const [selectedBook, setSelectedBook] = useState({});

  const renderBookImage = () => {
    if(isEmpty(selectedBook)) {
      return null;
    }
    const { imageLinks, title } = selectedBook.volumeInfo;
    return (
      <img className='book-image' src={imageLinks?.thumbnail || imageLinks?.smallThumbnail} alt={title} />
    );
  }

  const onTitleClick = () => {
    window.location.reload();
  }

  return (
    <div className="App">
      <Layout className='layout'>
        <Sider width="30%" className='sider'>
          <Title level={2} onClick={onTitleClick} className='website-title'> Should I read it?</Title>
          <div className='image-wrapper'>
            {renderBookImage()}
          </div>
        </Sider>
        <Layout>
          <Content className='content-style'>
            <SearchContainer setSelectedBook={setSelectedBook} />
            <div>
              <SelectedBook book={selectedBook} />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
