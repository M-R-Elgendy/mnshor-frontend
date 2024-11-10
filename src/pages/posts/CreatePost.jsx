import React, { useState, useEffect } from 'react';
import { http } from '../../utils/httpCommon';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();

const CreatePost = () => {

    let userName = localStorage.getItem('userName');
    if (!userName) {
        navigate('/login')
    } else {
        userName = userName.replaceAll('"', '')
    }

    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await http.get(`/categories?page=1&limit=5`);
                setCategories(response.data || []);
            } catch (err) {
                console.error("Error fetching categories:", err);
                setError("Failed to load categories.");
            }
        };

        fetchCategories();
    }, []);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));

            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await http.post('/file/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setImage(response.data.url);
            } catch (uploadError) {
                console.error("Error uploading image:", uploadError);
                setError("Failed to upload image.");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !content || !categoryId) {
            setError('من فضلك أكمل جميع الحقول');
            return;
        }

        const body = {
            title,
            content,
            categoryId,
        };

        if (image) body['image'] = image;

        const response = await http.post('/posts', body);

        if (response.statusCode === 201) {
            setError('');
            setSuccess('تم إنشاء المنشور بنجاح');
        } else {
            const serverResponse = response.response.data;
            setError(serverResponse.message);
        }
    };

    return (
        <>

            <div dir='rtl' className="flex min-h-screen bg-gray-100">
                <Sidebar />

                <div className="flex-1">

                    <div className="flex items-center justify-center min-h-screen bg-gray-100">
                        <div className="w-full max-w-md p-8 space-y-1 bg-white rounded-lg shadow-md">
                            <h2 className="text-center text-2xl font-semibold text-gray-800">إنشاء منشور جديد</h2>

                            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                            {success && <p className="text-green-500 text-sm text-center">{success}</p>}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        عنوان المنشور <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                        placeholder="اكتب عنوان المشور"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                                        محتوي المنشور <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id='content'
                                        name='content'
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                        placeholder="محتوي المنشور"
                                        value={content}
                                        cols={5}
                                        rows={5}
                                        onChange={(e) => setContent(e.target.value)}
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
                                        اختر التصنيف <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="categoryId"
                                        name="categoryId"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                        value={categoryId}
                                        onChange={(e) => setCategoryId(+e.target.value)}
                                    >
                                        <option value="" disabled>اختر التصنيف</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                        اختر صورة
                                    </label>
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        accept="image/*"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                        onChange={handleImageChange}
                                    />
                                    {previewImage && (
                                        <img src={previewImage} alt="Preview" className="mt-4 w-full h-40 object-cover rounded-md" />
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                                >
                                    نشر
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>


        </>
    );
};

export default CreatePost;
