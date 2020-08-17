import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class BookForm extends Component {

  state = {
    newBook: {
      title: '',
      author: ''
    }
  }

  handleChangeFor = ( propertyName, event ) => {
    this.setState({
      newBook: {
        ...this.state.newBook,
        [propertyName]: event.target.value
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Adding book`, this.state.newBook);
    // TODO - axios request to server to add book
    this.postNewBook(this.state.newBook);

  }

  postNewBook(newBook) {
    console.log(newBook);
    axios.post('/books', newBook)
      .then((response) => {
        console.log('server post:', response.data);
        // call to GET
        this.props.getAllBooks();
      })
      .catch((err) => {
        console.log(err);
        alert('Could not save the new book. Sorry :(');
      });
  }

  render() {

    return (
      <section>
        <h2>Add Book</h2>
        <form onSubmit={this.handleSubmit}>
          <input required placeholder="Title"
              value={this.state.newBook.title}
              onChange={(event) => this.handleChangeFor('title', event)}
          />

          <input required placeholder="Author"
              value={this.state.newBook.author}
              onChange={(event) => this.handleChangeFor('author', event)}
          />
          <br />
          <button type="submit">
            Add Book
          </button>
        </form>
      </section>
    );
  }
}

export default connect()(BookForm);
