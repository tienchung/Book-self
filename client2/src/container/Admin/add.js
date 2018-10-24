import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addBook, clearNewBook } from "../../actions";
class AddBook extends Component {
  state = {
    formdata: {
      name: "",
      author: "",
      review: "",
      pages: "",
      rating: "",
      price: ""
    }
  };

  handleInput = (event, name) => {
    const newFormdata = {
      ...this.state.formdata
    };

    newFormdata[name] = event.target.value;

    this.setState({
      formdata: newFormdata
    });
  };

  showNewBook = book => {
    if (book.post!=null) {
        return(<div className="conf_link">
        
        <Link to={`/books/${book.bookId}`}>Click the link to see the post</Link>
      </div>)
      
    }
  };

  componentWillUnmount() {
    this.props.dispatch(clearNewBook());
  }

  submitForm = e => {
    e.preventDefault();
    this.props.dispatch(
      addBook({
        ...this.state.formdata,
        ownerId: this.props.user.login.id
      })
    );
  };

  render() {
    return (
      <div className="rl_container article">
        <form onSubmit={this.submitForm}>
          <h2>Add a review</h2>

          <div className="form_element">
            <input
              type="text"
              placeholder="Enter name"
              value={this.state.formdata.name}
              onChange={event => this.handleInput(event, "name")}
            />
          </div>

          <div className="form_element">
            <input
              type="text"
              placeholder="Enter author"
              value={this.state.formdata.author}
              onChange={event => this.handleInput(event, "author")}
            />
          </div>

          <textarea
            value={this.state.formdata.review}
            onChange={event => this.handleInput(event, "review")}
          />

          <div className="form_element">
            <input
              type="number"
              placeholder="Enter pages"
              value={this.state.formdata.pages}
              onChange={event => this.handleInput(event, "pages")}
            />
          </div>

          <div className="form_element">
            <select
              value={this.state.formdata.rating}
              onChange={event => this.handleInput(event, "rating")}
            >
              <option val="1">1</option>
              <option val="1">2</option>
              <option val="1">3</option>
              <option val="1">4</option>
              <option val="1">5</option>
            </select>
          </div>

          <div className="form_element">
            <input
              type="number"
              placeholder="Enter price"
              value={this.state.formdata.price}
              onChange={event => this.handleInput(event, "price")}
            />
          </div>

          <button type="submit">Add review</button>
          {this.props.books.newbook
            ? this.showNewBook(this.props.books.newbook)
            : null}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    books: state.books
  };
};
export default connect(mapStateToProps)(AddBook);
