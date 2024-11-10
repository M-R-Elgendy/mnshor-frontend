import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Post from '../../components/Post';
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();

const Profile = () => {

    let userName = localStorage.getItem('userName');
    if (!userName) {
        navigate('/login')
    } else {
        userName = userName.replaceAll('"', '')
    }

    const userId = localStorage.getItem('userId');

    return (
        <>
            <div dir='rtl' className="flex min-h-screen bg-gray-100">

                <Sidebar />

                <div className="w-5/6 p-6">
                    <div className='space-y-4'>
                        <Post userId={userId} />
                    </div>
                </div>

            </div>
        </>
    );
};

export default Profile;
