import { useState, useRef } from "react";
import "../style/createPost.scss";
import { usePost } from "../hooks/usePost";
import { useNavigate } from "react-router";

const CreatePost = () => {
  const navigate = useNavigate();
  const [caption, setCaption] = useState("");
  const postImageInputRef = useRef();
  const { loading, handleCreatePost } = usePost();

  async function handleSubmit(e) {
    e.preventDefault();
    const file = postImageInputRef.current.files[0];
    if (!file) {
      alert("Please select an image before submitting.");
      return;
    }

    try {
      await handleCreatePost(file, caption);
      navigate("/feed");
    } catch (err) {
      console.error("Error creating post", err);
      // you could show an error message here instead
    }
  }

  if (loading) {
    return (
      <main>
        <h1>Creating Post</h1>
      </main>
    );
  }

  return (
    <main className="create-post-page">
      <div className="form-container">
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit} action="">
          <label className="postImageLabel" htmlFor="postImage">
            Select Image
          </label>
          <input
            ref={postImageInputRef}
            hidden
            type="file"
            name="postImage"
            id="postImage"
          />
          <input
            value={caption}
            onChange={(e) => {
              setCaption(e.target.value);
            }}
            type="text"
            name="caption"
            id="caption"
          />
          <button className="button primary-btn">Create Post</button>
        </form>
      </div>
    </main>
  );
};

export default CreatePost;
