import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewComments = ({ postID }) => {
  const baseUrl = 'https://jsonplaceholder.typicode.com';
  const [comments, SetComments] = useState([]);
  const [commentsLoading, SetCommentsLoading] = useState(false);
  useEffect(async () => {
    SetCommentsLoading(true);
    let response = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?postId=${postID}`
    );
    if (response.status == 200) {
      SetComments(response.data);
      SetCommentsLoading(false);
    }
  }, [postID]);
  return (
    <div>
      {commentsLoading
        ? 'Loading Comments'
        : comments.map((item, index) => (
            <small key={item.id}>{index + 1 + '. ' + item.body}</small>
          ))}
    </div>
  );
};
export default ViewComments;
