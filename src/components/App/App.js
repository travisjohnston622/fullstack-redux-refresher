import React, {Component} from 'react';
import { connect } from 'react-redux';

import BookList from '../BookList/BookList';
import BookForm from '../BookForm/BookForm';

import './App.css';
import axios from 'axios';


class App extends Component {
  componentDidMount() {
    this.getAllBooks();
  }

  // TODO - GET Book List from server
  getAllBooks = () => {
    this.props.history.push('/checkout')
    // axios({
    //   method: 'GET',
    //   url: '/books'
    // })

    axios.get('/books')
      .then((response) => {
        console.log(response);
        this.props.dispatch({
          type: 'SET_BOOKS',
          payload: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
        alert('Something went terribly wrong!!!');
      })
  }

  render() {
    return (
        <div className="App">
          <header><h1>Books w/ Redux!</h1></header>
          <main>
            <BookForm getAllBooks={this.getAllBooks} />
            <BookList />
          </main>
        </div>
    );
  }
}

export default connect()(App);
