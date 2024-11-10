import React, { useState } from 'react';
import { http } from '../../../utils/httpCommon';
import Sidebar from "../components/Sidebar";
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();

const NewAdmin = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError('من فضلك أكمل جميع الحقول');
            return;
        }

        const response = await http.post('/auth/admins/register', {
            name,
            email,
            password,
        });

        if (response.statusCode == 201) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userName', JSON.stringify(response.data.user.name));
            localStorage.setItem('userId', JSON.stringify(response.data.user.userId));
            localStorage.setItem('userRole', JSON.stringify(response.data.user.role));
            navigate('/')

        } else {
            const serverResponse = response.response.data;
            setError(serverResponse.message);
            setPassword('');
        }

    };

    return (
        <div dir="rtl" className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1">
                <div className="flex items-center justify-center min-h-screen bg-gray-100">

                    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-center text-2xl font-semibold text-gray-800">إنشاء مدير جديد</h2>

                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    الاسم
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="أدخل اسمك الكامل"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    البريد الإلكتروني
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="أدخل بريدك الإلكتروني"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    كلمة المرور
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="أدخل كلمة المرور"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                إنشاء حساب
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewAdmin;
