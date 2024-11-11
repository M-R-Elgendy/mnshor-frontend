import React, { useState, useEffect } from "react";
import { http } from "../../../utils/httpCommon";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const CMSPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteClick = (postId) => {
    setPostIdToDelete(postId);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await http.delete(`/posts/${postIdToDelete}`);
      setDeleteModalOpen(false);
      setPosts(posts.filter((post) => post.id !== postIdToDelete));
      toast.success("تم حذف المنشور بنجاح!");
    } catch (error) {
      console.error("Error deleting post", error);
      toast.error("فشل في حذف المنشور");
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await http.get("/posts");
      setPosts(response.data || []);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;
  // if (!posts.length) return <p>لا يوجد منشورات</p>;

  return (
    <div dir="rtl" className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="mr-[20px] mt-[20px] w-[85%]">
        <h1 className="text-3xl">
          المنشورات
        </h1>
        <hr className="my-4" />

        <Link
          to="/create-post"
          className="p-[0.75rem] font-bold m-0 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
        >
          إضافة منشور +
        </Link>

        {posts.map((post, index) => (
          <div
            key={index}
            className="flex min-h-[150px] items-start relative bg-white shadow-md rounded-lg p-4 mb-4 mt-5"
          >
            <button
              onClick={() => handleDeleteClick(post.id)}
              className="absolute bottom-5 py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
            >
              حذف
            </button>
            <div className="w-3/4">
              <h3 className="text-xl font-semibold mb-2">
                {post.title || "عنوان الخدمة محتوى يمكن تغييره"}
              </h3>
              <p className="text-gray-600 leading-relaxed">{post.content}</p>
            </div>
            {post.image && (
              <div className="w-1/4">
                <img src={post.image} className="rounded-lg" alt="post" />
              </div>
            )}
          </div>
        ))}

        {deleteModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
              <h2 className="text-xl font-bold mb-4">
                هل أنت متأكد من حذف هذا المنشور ؟
              </h2>
              <div className="flex gap-[10px] justify-end">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
                >
                  إغلاق
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white py-2 px-4 rounded"
                >
                  حذف
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CMSPosts;
