import React from 'react';
import { useAuth } from "react-auth-verification-context";
import { Link } from 'react-router-dom';

const Sidebar = () => {
    let userName = localStorage.getItem('userName').replaceAll('"', '');

    return (
        <aside className="w-1/6 bg-white shadow-md">
            <div className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                    <div>
                        <p className="text-gray-800 text-xl">
                            مرحبا
                            {' '}
                            {userName}
                        </p>
                    </div>
                </div>

                <hr className="my-4" />

                <nav className="space-y-4 mt-4">
                    {/* <Router> */}
                    <Link to="/" className="flex items-center text-blue-500 hover:text-blue-500">
                        <span className="material-icons">home</span>
                        <span className="ml-2">الرئيسية</span>
                    </Link>

                    <Link to="/add-post" className="flex items-center text-gray-600 hover:text-blue-500">
                        <span className="material-icons">edit</span>
                        <span className="ml-2">اضافة منشور</span>
                    </Link>

                    <Link to="/manage-categories" className="flex items-center text-gray-600 hover:text-blue-500">
                        <span className="material-icons">settings</span>
                        <span className="ml-2">إداره التصنيفات</span>
                    </Link>

                    <Link to="/profile" className="flex items-center text-gray-600 hover:text-blue-500">
                        <span className="material-icons">person</span>
                        <span className="ml-2">حسابي</span>
                    </Link>

                    <button onClick={() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('userName');
                        window.location.href = '/login';
                    }} className="flex items-center text-gray-600 hover:text-blue-500">
                        <span className="material-icons">logout</span>
                        <span className="ml-2">تسجيل الخروج</span>
                    </button>
                    {/* </Router> */}
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
