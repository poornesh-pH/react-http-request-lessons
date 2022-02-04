import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import ViewComments from "./ViewComments";
import AddPost from "./AddPost";

export default function App() {
  const baseUrl = "https://jsonplaceholder.typicode.com";
  const localURL = "http://localhost:8080";
  const [posts, SetPosts] = useState([]);
  const [error, SetError] = useState("");
  const [loading, SetLoading] = useState(false);
  let [viewComment, SetViewComment] = useState([]);
  const [title, SetTitle] = useState("");
  useEffect(() => {
    axios({
      method: "get",
      url: `${localURL}/posts`,
    })
      .then((response) => {
        SetPosts(response.data);
      })
      .catch((e) => {
        SetError(e.message);
      });
  }, []);
  const onDeleteClicked = async (item) => {
    SetLoading(true);
    let response = await axios.delete(`${localURL}/posts/${item.id}`);
    if (response.status == 200) {
      SetLoading(false);
      alert(`Deleted post: ${item.id}`);
    }
  };
  const onViewCommentClicked = (id) => {
    if (viewComment.includes(id)) {
      SetViewComment(viewComment.filter((item) => item !== id));
    } else {
      SetViewComment([...viewComment, id]);
    }
  };
  const onTitleSubmit = (e, id) => {
    e.preventDefault();
    let value = posts.find((item) => item.id === id);
    axios({
      method: "PATCH",
      url:`${localURL}/posts/${id}`,
      data: {
        title: value.title,
      },
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
  };
  const onTitleChanged = (value, id) => {
    SetPosts(
      [...posts].map((item) => {
        if (item.id === id) {
          return {
            ...item,
            title: value,
          };
        } else return item;
      })
    );
  };

  return (
    <div>
      <AddPost />
      {loading
        ? "Loading"
        : posts.map((item) => (
            <div key={item.id}>
              <span>User ID: {item.userId}</span>
              <span>Post ID: {item.id}</span>
              <button onClick={() => onDeleteClicked(item)}>Delete</button>
              <form onSubmit={(e) => onTitleSubmit(e, item.id)}>
                <input
                  value={item.title}
                  onChange={(e) => onTitleChanged(e.target.value, item.id)}
                />
                <input type="submit" />
              </form>
              <p>{item.body}</p>
              <button onClick={() => onViewCommentClicked(item.id)}>
                {viewComment.includes(item.id)
                  ? "Hide Comments"
                  : "View Comments"}
              </button>
              {viewComment.includes(item.id) && (
                <ViewComments postID={item.id} />
              )}
              <hr />
            </div>
          ))}
      <h4>{error && error}</h4>
    </div>
  );
}
