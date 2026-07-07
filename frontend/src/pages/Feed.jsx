import { useEffect, useState } from "react";
import api from "../services/api";
import { getToken } from "../utils/auth";
import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const { data } = await api.get("/post/getAllPosts", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setPosts(data.post);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="hidden lg:block col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                📱 SocialFeed
              </h2>
              <ul className="space-y-3 text-gray-600">
                <li className="hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-xl transition-all cursor-pointer font-medium">
                  🏠 Home
                </li>
                <li className="hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-xl transition-all cursor-pointer font-medium">
                  👤 Profile
                </li>
                <li className="hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-xl transition-all cursor-pointer font-medium">
                  🔖 Saved
                </li>
                <li className="hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-xl transition-all cursor-pointer font-medium">
                  ⚙️ Settings
                </li>
              </ul>
            </div>
          </div>

          {/* Feed */}
          <div className="col-span-12 lg:col-span-6">
            <CreatePost fetchPosts={fetchPosts} />
            <div className="space-y-5 mt-5">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} fetchPosts={fetchPosts} />
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                🔥 Trending
              </h2>
              <div className="space-y-3 text-gray-600">
                <p className="hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-xl transition-all cursor-pointer">
                  #React
                </p>
                <p className="hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-xl transition-all cursor-pointer">
                  #JavaScript
                </p>
                <p className="hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-xl transition-all cursor-pointer">
                  #NodeJS
                </p>
                <p className="hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-xl transition-all cursor-pointer">
                  #100DaysOfCode
                </p>
                <p className="hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-xl transition-all cursor-pointer">
                  #BuildInPublic
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
