import React, { Component } from "react";
import { connect } from "react-redux";
import { getBooks } from "../actions";
import BookItem from "../widgetUI/book_item";

class HomeContainer extends Component {
  componentWillMount() {
    this.props.dispatch(getBooks(2,0,'desc'));
  }

  renderItem = function(books) {
    if (books.list != null) {
      return books.list.map(item => <BookItem {...item} key={item._id} />);
    }
  };
  // renderItem= (books) => {
  //   books.list!= null
  //     ? (books.list.map(item => <BookItem {...item} key={item._id} />))
  //     : null
  // }

  loadmore=()=>{
    let count = this.props.books.list.length;
    this.props.dispatch(getBooks(1,count,'desc', this.props.books.list))
  }
  render() {
    // console.log(this.props);
    return (
      <div>
        {this.renderItem(this.props.books)}
        <div className="loadmore"
        onClick={this.loadmore}
        >Load More</div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    books: state.books
  };
};

export default connect(mapStateToProps)(HomeContainer);
