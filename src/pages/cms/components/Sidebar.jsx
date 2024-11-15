import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userName = localStorage.getItem("userName")?.replaceAll('"', "") || "";
    const userRole = localStorage.getItem("role")?.replaceAll('"', "") || "";

    const isActive = (path = []) =>
        path.includes(location.pathname) ? "text-blue-500" : "text-gray-600";

    return (
        <aside className="w-1/6 bg-white shadow-md">
            <div className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                    <div>
                        <p className="text-gray-800 text-xl">مرحبا {userName}</p>
                    </div>
                </div>

                <hr className="my-4" />

                <nav className="space-y-4 mt-4">

                    <Link
                        to="/"
                        className={`flex items-center ${isActive(["/"])} hover:text-blue-500`}
                    >
                        <span className="material-icons">language</span>
                        <span className="ml-2">تصفح الموقع</span>
                    </Link>


                    <Link
                        to="/cms"
                        className={`flex items-center ${isActive(["/"])} hover:text-blue-500`}
                    >
                        <span className="material-icons">home</span>
                        <span className="ml-2">الرئيسية</span>
                    </Link>

                    <Link
                        to="/cms/categories"
                        className={`flex items-center ${isActive(
                            ["/cms/categories"]
                        )} hover:text-blue-500`}
                    >
                        <span className="material-icons">edit</span>
                        <span className="ml-2">التصنيفات</span>
                    </Link>

                    <Link
                        to="/cms/posts"
                        className={`flex items-center ${isActive(
                            ["/cms/posts"]
                        )} hover:text-blue-500`}
                    >
                        <span className="material-icons">post_add</span>
                        <span className="ml-2">المنشورات</span>
                    </Link>


                    <Link
                        to="/cms/users"
                        className={`flex items-center ${isActive(
                            ["/cms/users"]
                        )} hover:text-blue-500`}
                    >
                        <span className="material-icons">person</span>
                        <span className="ml-2">ألمستخدمين</span>
                    </Link>

                    <Link
                        to="/cms/admins"
                        className={
                            `flex items-center 
                            ${isActive(["/cms/admins", "/cms/admins/create"])}  
                            hover:text-blue-500`
                        }
                    >
                        <span className="material-icons">supervisor_account</span>
                        <span className="ml-2">مديري الموقع</span>
                    </Link>

                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("userName");
                            localStorage.removeItem("userId");
                            localStorage.removeItem("userRole");
                            navigate('/login')
                        }}
                        className="flex items-center text-gray-600 hover:text-blue-500"
                    >
                        <span className="material-icons">logout</span>
                        <span className="ml-2">تسجيل الخروج</span>
                    </button>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
