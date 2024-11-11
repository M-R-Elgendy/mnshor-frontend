import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userName = localStorage.getItem("userName")?.replaceAll('"', "") || "";
    const userRole = localStorage.getItem("userRole")?.replaceAll('"', "") || "";

    const isUserLoggedIn = () => {
        return userName != '' ? true : false;
    };

    const isActive = (path) =>
        location.pathname === path ? "text-blue-500" : "text-gray-600";

    return (
        <aside className="w-1/6 bg-white shadow-md">
            <div className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                    <div>
                        {!isUserLoggedIn() ? (
                            <p className="text-gray-800 text-xl">مرحبا {userName}</p>
                        ) : (
                            <p className="text-gray-800 text-xl">مرحبا بك</p>
                        )}
                    </div>
                </div>

                <hr className="my-4" />

                <nav className="space-y-4 mt-4">
                    <Link
                        to="/"
                        className={`flex items-center ${isActive("/")} hover:text-blue-500`}
                    >
                        <span className="material-icons">home</span>
                        <span className="ml-2">الرئيسية</span>
                    </Link>

                    {isUserLoggedIn() && (
                        <Link
                            to="/create-post"
                            className={`flex items-center ${isActive(
                                "/create-post"
                            )} hover:text-blue-500`}
                        >
                            <span className="material-icons">edit</span>
                            <span className="ml-2">اضافة منشور</span>
                        </Link>
                    )}

                    {isUserLoggedIn() && (
                        <Link
                            to="/preferences"
                            className={`flex items-center ${isActive(
                                "/preferences"
                            )} hover:text-blue-500`}
                        >
                            <span className="material-icons">settings</span>
                            <span className="ml-2">إداره التصنيفات</span>
                        </Link>
                    )}

                    {isUserLoggedIn() && (
                        <Link
                            to="/profile"
                            className={`flex items-center ${isActive(
                                "/profile"
                            )} hover:text-blue-500`}
                        >
                            <span className="material-icons">person</span>
                            <span className="ml-2">منشوراتي</span>
                        </Link>
                    )}

                    {userRole == "admin" && (
                        <>
                            <hr />
                            <Link
                                to="/cms"
                                className={`flex items-center ${isActive(
                                    "/manage-users"
                                )} hover:text-blue-500`}
                            >
                                <span className="material-icons">supervisor_account</span>
                                <span className="ml-2">إدارة الموقع</span>
                            </Link>
                            <hr />
                        </>
                    )}

                    {isUserLoggedIn() ? (

                        <button
                            onClick={() => {
                                localStorage.removeItem("token");
                                localStorage.removeItem("userName");
                                localStorage.removeItem("userId");
                                localStorage.removeItem("userRole");
                                navigate('/login');
                            }}
                            className="flex items-center text-gray-600 hover:text-blue-500"
                        >
                            <span className="material-icons">logout</span>
                            <span className="ml-2">تسجيل الخروج</span>
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className={`flex items-center ${isActive("/login")} hover:text-blue-500`}
                        >
                            <span className="material-icons">login</span>
                            <span className="ml-2">تسجيل الدخول</span>
                        </Link>
                    )}

                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
