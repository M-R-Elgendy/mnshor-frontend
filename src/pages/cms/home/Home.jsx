import { useState, useEffect } from 'react';
import React from 'react';
import { http } from '../../../utils/httpCommon';
import Sidebar from "../components/Sidebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faShareFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const CMSHome = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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

    return (
        <div dir="rtl" className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex flex-wrap h-fit gap-[10px] p-6">
                <div className="box flex flex-col justify-between h-[200px] w-[340px] bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="top-box h-[100px] p-4 flex items-center justify-between bg-blue-500">
                        <div className="text">
                            <h1 className="text-xl font-semibold text-gray-100">التصنيفات</h1>
                            <span className="text-2xl text-gray-100 ">{categories.length}</span>
                        </div>
                        <div className="icon rounded-full flex items-center justify-center text-white">
                            <FontAwesomeIcon className='text-4xl' icon={faLayerGroup} />
                        </div>
                    </div>
                    <div className="bottom-box font-bold p-4 text-left flex items-center gap-3 justify-end text-blue-500 cursor-pointer hover:-translate-y-1 transition-transform duration-200">
                        الاطلاع على التفاصيل <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                </div>
                <div className="box flex flex-col justify-between h-[200px] w-[340px] bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="top-box h-[100px] p-4 flex items-center justify-between bg-blue-500">
                        <div className="text">
                            <h1 className="text-xl font-semibold text-gray-100">المنشورات</h1>
                            <span className="text-2xl text-gray-100 ">73</span>
                        </div>
                        <div className="icon rounded-full flex items-center justify-center text-white">
                            <FontAwesomeIcon className='text-4xl' icon={faShareFromSquare} />
                        </div>
                    </div>
                    <div className="bottom-box font-bold p-4 text-left flex items-center gap-3 justify-end text-blue-500 cursor-pointer hover:-translate-y-1 transition-transform duration-200">
                        الاطلاع على التفاصيل <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                </div>
                <div className="box flex flex-col justify-between h-[200px] w-[340px] bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="top-box h-[100px] p-4 flex items-center justify-between bg-blue-500">
                        <div className="text">
                            <h1 className="text-xl font-semibold text-gray-100">المستخدمون</h1>
                            <span className="text-2xl text-gray-100 ">73</span>
                        </div>
                        <div className="icon rounded-full flex items-center justify-center text-white">
                            <FontAwesomeIcon className='text-4xl' icon={faAddressCard} />
                        </div>
                    </div>
                    <div className="bottom-box font-bold p-4 text-left flex items-center gap-3 justify-end text-blue-500 cursor-pointer hover:-translate-y-1 transition-transform duration-200">
                        الاطلاع على التفاصيل <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                </div>
                <div className="box flex flex-col justify-between h-[200px] w-[340px] bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="top-box h-[100px] p-4 flex items-center justify-between bg-blue-500">
                        <div className="text">
                            <h1 className="text-xl font-semibold text-gray-100">التصنيفات</h1>
                            <span className="text-2xl text-gray-100 ">73</span>
                        </div>
                        <div className="icon rounded-full flex items-center justify-center text-white">
                            <FontAwesomeIcon className='text-4xl' icon={faLayerGroup} />
                        </div>
                    </div>
                    <div className="bottom-box font-bold p-4 text-left flex items-center gap-3 justify-end text-blue-500 cursor-pointer hover:-translate-y-1 transition-transform duration-200">
                        الاطلاع على التفاصيل <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                </div>

            </div>
        </div>  
    )}

export default CMSHome;
