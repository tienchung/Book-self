import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserPosts } from "../../actions";
import moment from "moment-js";
import { Link } from "react-router-dom";

class UserPosts extends Component {
  componentWillMount() {
    this.props.dispatch(getUserPosts(this.props.user.login.id));
  }

  showUserPosts = user => {
      console.log("zo showUserPosts func",user)
    if (user.userPost != null) {
      console.log(user.userPosts);
      return user.userPost.map(item => (
        <tr key={item._id}>
          <td><Link to={`/user/edit-post/${item._id}`}>{item.name}</Link></td>
          <td>{item.author}</td>
          <td>{moment(item.creatAt).format("MM/DD/YY")}</td>
        </tr>
      ));
    }
  };

  render() {
    console.log(this.props);
    let user = this.props.user;
 
    return (
      <div className="user_posts">
        <h4>Your review:</h4>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>{this.showUserPosts(user)}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps)(UserPosts);
