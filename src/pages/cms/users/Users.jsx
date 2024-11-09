import { useState } from "react";
import { http } from "../../../utils/httpCommon";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";

export default function ControlPanelUsers() {
  const allUsers = () => {
    const [users, setUsers] = userState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await http.get(`/users`);
          setUsers(response.data || []);
        } catch (err) {
          console.error("Error fetching categories:", err);
          setError("Failed to load categories.");
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!categories.length) return <p>لا يوجد مستخدمون</p>;

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
              <th className="border-b border-gray-200 py-3 px-4">المستخدم</th>
              <th className="border-b border-gray-200 py-3 px-4 text-left">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td
                  className={`py-3 px-4 border-b border-gray-200 cursor-pointer`}
                >
                  {user.name}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-left">
                  <div className="flex items-center justify-end gap-[5px]">
                    <button className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200">
                      <span className="text-xl">حذف</span>
                    </button>
                    {/* <button
                        onClick={() => handleEditClick(category)}
                        className="py-1 px-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                      >
                        تعديل
                      </button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                <h2 className="text-xl font-bold mb-4">حذف المستخم</h2>
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
          )} */}
      </div>
    )
  };


  return (
    <div dir="rtl" className="flex min-h-screen bg-gray-100">
      <Sidebar />
      {/* <allUsers /> */}
    </div>
  );
}
