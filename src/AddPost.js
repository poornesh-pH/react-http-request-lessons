import React, { useState } from "react";
import axios from "axios";

const AddPost = () => {
  const localURL = "http://localhost:8080";
  const [newPost, SetNewPost] = useState({ userId: "", title: "", body: "" });
  const handleAddPostSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `${localURL}/posts/`,
      data: {
        title: newPost.title,
        body: newPost.body,
        userId: newPost.userId,
      },
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => console.log(res.status, "new post added sucessfully"))
      .catch((error) => console.log(error));
  };
  const handleOnChange = (e) => {
    SetNewPost({ ...newPost, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={(e) => handleAddPostSubmit(e)}>
        <input
          name="userId"
          onChange={(e) => handleOnChange(e)}
          value={newPost.userId}
          placeholder="User ID"
        />
        <input
          name="title"
          onChange={(e) => handleOnChange(e)}
          value={newPost.title}
          placeholder="Title"
        />
        <input
          name="body"
          onChange={(e) => handleOnChange(e)}
          value={newPost.body}
          placeholder="Body"
        />
        <input type="submit" />
      </form>
    </div>
  );
};
export default AddPost;
