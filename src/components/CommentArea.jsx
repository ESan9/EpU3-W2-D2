import { Component } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: false,
    isError: false,
  };

  componentDidMount() {
    this.fetchComments();
  }

  componentDidUpdate(prevProps) {
    // CommentArea fa un fetch dei commenti ogni volta che riceve un asin nuovo
    if (prevProps.asin !== this.props.asin) {
      this.fetchComments();
    }
  }

  fetchComments = async () => {
    this.setState({ isLoading: true, isError: false });
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" +
          this.props.asin,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODg3NzZmZTEyODg5NzAwMTVmMjdiYmQiLCJpYXQiOjE3NTM3MDgyODcsImV4cCI6MTc1NDkxNzg4N30.Urj3XDJvrGYQlPTFARoicWtHZ66jH6Wqh_HgxRO4PMw",
          },
        }
      );

      if (response.ok) {
        let comments = await response.json();
        this.setState({ comments, isLoading: false });
      } else {
        throw new Error("Errore nel fetch");
      }
    } catch (error) {
      console.error(error);
      this.setState({ isLoading: false, isError: true });
    }
  };

  render() {
    return (
      <div className="text-center">
        {this.state.isLoading && <Loading />}
        {this.state.isError && <Error />}
        <AddComment asin={this.props.asin} />
        <CommentList commentsToShow={this.state.comments} />
      </div>
    );
  }
}

export default CommentArea;
