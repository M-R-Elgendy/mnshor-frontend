import React, { useState, useEffect } from "react";
import { http } from "../../../utils/httpCommon";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";

const CMSusers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [UserIdToDelete, setUserIdToDelete] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteClick = (userId) => {
    setUserIdToDelete(userId);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await http.delete(`/users/${UserIdToDelete}`);
      setDeleteModalOpen(false);
      setUsers(users.filter(user => user.id !== UserIdToDelete));
      toast.success("تم حذف المستخدم بنجاح!");
    } catch (error) {
      console.error("Error deleting user", error);
      toast.error("فشل في حذف المستخدم");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await http.get("/users");
      setUsers(response.data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!users.length) return <p>لا يوجد منشورات</p>;

  return (
    <div dir="rtl" className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="mr-[20px] mt-[20px] w-[85%]">
        {users.map((user, index) => (
          <div
            key={index}
            className="flex min-h-[120px] items-start relative bg-white shadow-md rounded-lg p-4 mb-4"
          >
            <button
              onClick={() => handleDeleteClick(user.id)}
              className="absolute bottom-5 py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
            >
              حذف
            </button>
            <div className="w-3/4">
              <h3 className="text-xl font-semibold mb-2">
                {user.name || "عنوان الخدمة محتوى يمكن تغييره"}
              </h3>
              <p className="text-gray-600 leading-relaxed">{user.content}</p>
            </div>
            {user.image && (
              <div className="w-1/4">
                <img src={user.image} className="rounded-lg" alt="user" />
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

export default CMSusers;
