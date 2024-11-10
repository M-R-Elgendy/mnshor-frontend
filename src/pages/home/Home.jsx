import React from 'react';
import Sidebar from '../../components/Sidebar';
import LoginPage from '../auth/LoginPage';
import CategoryPostContainer from '../../components/CategoryPostContainer';

const Home = () => {

    let userName = localStorage.getItem('userName');

    if (userName) {
        userName = userName.replaceAll('"', '')
    }


    return (
        <>
            {userName ? (
                <div dir='rtl' className="flex min-h-screen bg-gray-100">
                    <Sidebar />
                    <CategoryPostContainer />
                </div>
            ) :
                <LoginPage />
            }
        </>
    );
};

export default Home;
