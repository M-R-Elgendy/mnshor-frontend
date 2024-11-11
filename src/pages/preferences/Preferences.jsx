import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { http } from '../../utils/httpCommon';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../../components/LoadingSpinner';

const Preferences = () => {
    const navigate = useNavigate();

    let userName = localStorage.getItem('userName');
    if (!userName) {
        navigate('/login')
    } else {
        userName = userName.replaceAll('"', '')
    }

    const [myCategories, setMyCategories] = useState([]);
    const [allCategories, setAllCategories] = useState([]);

    const [loading, setLoading] = useState(false);
    const [loadingAction, setLoadingAction] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        await http.get(`/preferences`).then((response) => {
            setMyCategories(response.data);
        });

        await http.get(`/categories`).then((response) => {
            setAllCategories(response.data);
        });
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);


    const isCategorySelected = (categoryId) => {
        return myCategories.some((category) => category.Category.id === categoryId);
    };

    const handelDeletePreferance = async (prefId) => {
        setLoadingAction(true);
        http.delete(`/preferences/${prefId}`).then((response) => {
            setMyCategories(myCategories.filter((category) => category.id !== prefId));
        });

        const response = await http.delete(`/preferences/${prefId}`);
        if (response.statusCode === 200) {
            toast.success("تم حذف التصنيف بنجاح", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            fetchData();
        } else {
            toast.error("حدث خطأ ما", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        setLoadingAction(false);
    }

    const handelAddPreferance = async (categoryId) => {
        setLoadingAction(true);
        const response = await http.post(`/preferences`, { categoryId });
        if (response.statusCode === 201) {

            toast.success("تم اضافة التصنيف بنجاح", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            fetchData();

        } else {
            toast.error("حدث خطأ ما", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        setLoadingAction(false);
    }


    return (
        <>
            <div dir='rtl' className="flex min-h-screen bg-gray-100">

                <Sidebar />

                <div className="w-5/6 p-6">
                    <div className='space-y-4 bg-white p-4'>
                        <h1 className='text-3xl'>تصنيفاتي المفضله</h1>
                        <hr />
                        {loading ? (
                            <div className="flex justify-center mt-4">
                                <LoadingSpinner />
                            </div>
                        ) : (
                            myCategories.map((preference, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span>{preference.Category.name}</span>
                                    <button
                                        className="text-red-500"
                                        onClick={() => { handelDeletePreferance(preference.id) }}
                                        disabled={loadingAction}
                                    >
                                        {loadingAction ? (
                                            <LoadingSpinner size="small" />
                                        ) : (
                                            <span className="material-icons">delete</span>
                                        )}
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    <div className='space-y-4 bg-white mt-4 p-4'>
                        <h1 className='text-3xl'>كل التصنيفات</h1>
                        <hr />
                        {loading ? (
                            <div className="flex justify-center mt-4">
                                <LoadingSpinner />
                            </div>
                        ) : (
                            allCategories.map((category, index) => (
                                isCategorySelected(category.id) ? null : (
                                    <div key={index} className="flex items-center justify-between">
                                        <span>{category.name}</span>
                                        <button
                                            className="text-green-500"
                                            onClick={() => { handelAddPreferance(category.id) }}
                                            disabled={loadingAction}
                                        >
                                            {loadingAction ? (
                                                <LoadingSpinner size="small" />
                                            ) : (
                                                <span className="material-icons">add</span>
                                            )}
                                        </button>
                                    </div>
                                )
                            ))
                        )}
                    </div>
                </div>

            </div>
        </>
    );
};

export default Preferences;
