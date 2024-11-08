import React from 'react';
import Sidebar from '../../components/Sidebar';
import CategoryPostContainer from '../../components/CategoryPostContainer';

const Home = () => {

    let userName = localStorage.getItem('userName');

    if (!userName) {
        window.location.href = '/login'
    } else {
        userName = userName.replaceAll('"', '')
    }


    return (
        <>
            <div dir='rtl' className="flex min-h-screen bg-gray-100">
                <Sidebar />
                <CategoryPostContainer />
            </div>
        </>
    );
};

export default Home;
