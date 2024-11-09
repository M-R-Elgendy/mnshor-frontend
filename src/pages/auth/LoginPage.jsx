import React, { useState } from 'react';
import { http } from '../../utils/httpCommon';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('من فضلك أدخل البيانات بشكل صحيح');
            return;
        }

        const response = await http.post('/auth/login', {
            email,
            password,
        });

        if (response.statusCode == 200) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('userName', JSON.stringify(response.data.userName));
            localStorage.setItem('userRole', JSON.stringify(response.data.role));
            window.location.href = '/';
        } else {
            const serverResponse = response.response.data;
            setError(serverResponse.message);
            setPassword('');
            setError('');
        }

    };

    return (

        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-center text-2xl font-semibold text-gray-800">تسجيل الدخول</h2>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
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
                        تسجيل الدخول
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        ليس لديك حساب؟{' '}
                        <a href="/register" className="text-blue-500 hover:text-blue-600">
                            سجل هنا
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
