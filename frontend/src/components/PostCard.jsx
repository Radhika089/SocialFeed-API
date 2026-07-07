import { useState } from "react";
import api from "../services/api";
import { getToken } from "../utils/auth";

const PostCard = ({ post, fetchPosts }) => {
  const [editing, setEditing] = useState(false);
  const [caption, setCaption] = useState(post.caption);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(post.image);
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await api.delete(`/post/delete/${post._id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      fetchPosts();
      alert("Post Deleted");
    } catch (error) {
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("caption", caption);
      if (image) formData.append("image", image);
      await api.patch(`/post/update/${post._id}`, formData, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setEditing(false);
      fetchPosts();
      alert("Post Updated Successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Update Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <img src={preview} alt="Post" className="w-full h-80 object-cover" />
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
            {post.user?.name?.charAt(0) || "U"}
          </div>
          <h2 className="font-semibold text-gray-800">{post.user?.name}</h2>
        </div>

        {editing ? (
          <div className="space-y-3">
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={3}
              className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <label className="cursor-pointer inline-block bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-xl border-2 border-dashed border-gray-300 transition-all text-sm">
              📷 Change Image
              <input type="file" className="hidden" onChange={handleImage} />
            </label>
            <div className="flex gap-2">
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-medium transition-all disabled:opacity-50">
                {loading ? "⏳ Saving..." : "✓ Save"}
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setCaption(post.caption);
                  setPreview(post.image);
                  setImage(null);
                }}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-xl font-medium transition-all">
                ✕ Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-700 mb-2">{post.caption}</p>
            <p className="text-sm text-gray-400">
              {new Date(post.createdAt).toLocaleString()}
            </p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setEditing(true)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-medium transition-all">
                ✏️ Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl font-medium transition-all">
                🗑 Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostCard;
