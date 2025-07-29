import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";
import { useState } from "react";
import { useEffect } from "react";

const CommentArea = (props) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchComments = async () => {
    if (!props.asin) return;

    setIsLoading(true);
    setIsError(false);
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + props.asin,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODg3NzZmZTEyODg5NzAwMTVmMjdiYmQiLCJpYXQiOjE3NTM3MDgyODcsImV4cCI6MTc1NDkxNzg4N30.Urj3XDJvrGYQlPTFARoicWtHZ66jH6Wqh_HgxRO4PMw",
          },
        }
      );

      if (response.ok) {
        const comments = await response.json();
        setComments(comments);
        setIsLoading(false);
      } else {
        throw new Error("Errore nel fetch");
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.asin]);

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={comments} />
    </div>
  );
};

export default CommentArea;
