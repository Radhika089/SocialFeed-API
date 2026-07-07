import { useState } from "react";
import api from "../services/api";
import { getToken } from "../utils/auth";

const CreatePost = ({ fetchPosts }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!caption || !image) {
      return alert("Please provide caption and image.");
    }
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", image);
    try {
      setLoading(true);
      await api.post("/post/create", formData, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setCaption("");
      setImage(null);
      setPreview("");
      fetchPosts();
      alert("Post Created Successfully!");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-5">Create Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="What's on your mind?"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows="3"
          className="w-full border-0 bg-gray-50 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none placeholder-gray-400"
        />
        <div className="flex items-center gap-3">
          <label className="cursor-pointer bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-xl border-2 border-dashed border-gray-300 transition-all">
            <span className="text-sm text-gray-600">📷 Add Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
          </label>
          {preview && (
            <span className="text-sm text-green-600">✓ Image added</span>
          )}
        </div>
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-64 object-cover rounded-xl"
          />
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-medium transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? "⏳ Uploading..." : "🚀 Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
