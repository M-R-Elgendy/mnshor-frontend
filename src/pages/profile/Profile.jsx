import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Post from '../../components/Post';

const Profile = () => {

    let userName = localStorage.getItem('userName');
    if (!userName) {
        window.location.href = '/login'
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
