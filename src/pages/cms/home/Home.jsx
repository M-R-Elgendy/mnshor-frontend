import React from 'react';
import { http } from '../../../utils/httpCommon';
import Sidebar from "../components/Sidebar";

const CMSHome = () => {
    return (
        <div dir="rtl" className="flex min-h-screen bg-gray-100">
            <Sidebar />
        </div>
    )
}

export default CMSHome;