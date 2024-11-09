import React, { useState, useEffect } from "react";
import { http } from "../../../utils/httpCommon";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";

export default function ControlPanelCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCategoryValue, setEditCategoryValue] = useState("");
  const [categoryIdToEdit, setCategoryIdToEdit] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");



  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await http.get(`/categories`);
        setCategories(response.data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories.");
        toast.error("فشل في تحميل التصنيفات");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!categories.length) return <p>لا يوجد تصنيفات</p>;

  const handleEditClick = (category) => {
    setEditCategoryValue(category.name);
    setCategoryIdToEdit(category.id);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (categoryId) => {
    setCategoryIdToEdit(categoryId);
    setDeleteModalOpen(true);
  };

  const handleSubmitEdit = async () => {
    try {
      await http.patch(`/categories/${categoryIdToEdit}`, {
        name: editCategoryValue,
      });
      setIsModalOpen(false);
      setCategories(categories.map(category =>
        category.id === categoryIdToEdit ? { ...category, name: editCategoryValue } : category
      ));
      toast.success("تم تحديث التصنيف بنجاح!");
    } catch (error) {
      console.error("Error updating category", error);
      toast.error("فشل في تحديث التصنيف");
    }
  };

  const handleDelete = async () => {
    try {
      await http.delete(`/categories/${categoryIdToEdit}`);
      setDeleteModalOpen(false);
      setCategories(categories.filter(category => category.id !== categoryIdToEdit));
      toast.success("تم حذف التصنيف بنجاح!");
    } catch (error) {
      console.error("Error deleting category", error);
      toast.error("فشل في حذف التصنيف");
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategory) return;
    try {
      const response = await http.post(`/categories`, { name: newCategory });
      setCategories([...categories, response.data]);
      setNewCategory("");
      toast.success("تم إضافة التصنيف بنجاح!");
    } catch (error) {
      console.error("Error creating category", error);
      toast.error("فشل في إضافة التصنيف");
    }
  };

  return (
    <div dir="rtl" className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="w-[85%] p-[20px]">

        <h1 className="text-3xl">
          التصنيفات
        </h1>
        <hr className="my-4" />

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
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleCreateCategory}
                className="p-[0.75rem] m-0 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
              >
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
                  {category.name}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-left">
                  <div className="flex items-center justify-end gap-[5px]">
                    <button
                      onClick={() => handleEditClick(category)}
                      className="py-1 px-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDeleteClick(category.id)}
                      className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
                    >
                      حذف
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
                  onClick={handleSubmitEdit}
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

    </div>
  );
}

