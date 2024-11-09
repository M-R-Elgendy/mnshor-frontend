import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { http } from "../../utils/httpCommon";

export default function ControlPanelCategories() {
  const AllCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editCategoryValue, setEditCategoryValue] = useState("");
    const [categoryIdToEdit, setCategoryIdToEdit] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);

    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await http.get(`/preferences`);
          setCategories(response.data || []);
        } catch (err) {
          console.error("Error fetching categories:", err);
          setError("Failed to load categories.");
        } finally {
          setLoading(false);
        }
      };

      fetchCategories();
    }, []);

    const handleEditClick = (category) => {
      setEditCategoryValue(category.Category.name);
      setCategoryIdToEdit(category.Category.id);
      setIsModalOpen(true);
    };

    const handleSubmit = () => {
      setIsModalOpen(false);
      setDeleteModalOpen(false);
    };

    const handleDelete = async () => {
      try {
        await http.delete(`/preferences/${categoryIdToDelete}`);

        const updatedCategories = categories.filter(
          (category) => category.Category.id !== categoryIdToDelete
        );
        setCategories(updatedCategories);

        setDeleteModalOpen(false);
        setCategoryIdToDelete(null);
      } catch (err) {
        console.error("Error deleting category:", err);
        setError("Failed to delete category.");
      }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!categories.length) return <p>لا يوجد تصنيفات</p>;

    return (
      <div className="w-[85%] p-[20px] mt-[40px]">
        <div className="mb-4 flex items-center space-x-4">
          <div className="flex-1">
            <label
              htmlFor="newCategory"
              className="block text-sm font-bold text-gray-700 mb-2 text-[18px]"
            >
              إضافة تصنيف
            </label>
            <div className="flex items-center gap-[5px]">
              <input
                id="newCategory"
                type="text"
                placeholder="أدخل اسم التصنيف"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="p-[0.75rem] m-0 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200">
                إضافة
              </button>
            </div>
          </div>
        </div>

        <table className="min-w-full bg-white border border-gray-200 text-right rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm tracking-wider">
              <th className="border-b border-gray-200 py-3 px-4">التصنيف</th>
              <th className="border-b border-gray-200 py-3 px-4 text-left">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td
                  className={`py-3 px-4 border-b border-gray-200 cursor-pointer`}
                >
                  {category.Category.name}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-left">
                  <div className="flex items-center justify-end gap-[5px]">
                    <button
                      onClick={() => {
                        setCategoryIdToDelete(category.Category.id);
                        setDeleteModalOpen(true);
                      }}
                      className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
                    >
                      <span className="text-xl">-</span>
                    </button>
                    <button
                      onClick={() => handleEditClick(category)}
                      className="py-1 px-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                    >
                      تعديل
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
              <h2 className="text-xl font-bold mb-4">تعديل التصنيف</h2>
              <input
                type="text"
                value={editCategoryValue}
                onChange={(e) => setEditCategoryValue(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md mb-4"
              />
              <div className="flex gap-[10px] justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
                >
                  إغلاق
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  حفظ التعديلات
                </button>
              </div>
            </div>
          </div>
        )}
        {deleteModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
              <h2 className="text-xl font-bold mb-4">
                هل أنت متأكد من حذف هذا التصنيف ؟
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
    );
  };

  return (
    <div dir="rtl" className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <AllCategories className="w-4/6" />
    </div>
  );
}
