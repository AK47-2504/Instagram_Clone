import { createPost, getFeed } from "../services/postApi";
import { useContext, useEffect } from "react";
import { PostContext } from "../postContext";

export const usePost = () => {
  const context = useContext(PostContext);

  const { loading, setLoading, post, feed, setFeed } = context;

  const handleGetFeed = async () => {
    setLoading(true);
    const data = await getFeed();
    setFeed(data.posts);
    setLoading(false);
  };

  const handleCreatePost = async (imageFile, caption) => {
    if (!imageFile) {
      console.warn("No image file provided to createPost");
      return;
    }

    setLoading(true);
    try {
      const data = await createPost(imageFile, caption);
      setFeed([data.post, ...feed]);
    } catch (err) {
      console.error("Failed to create post:", err);
      // you might want to surface this to the UI later
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetFeed();
  }, []);

  return { loading, feed, post, handleGetFeed, handleCreatePost };
};
