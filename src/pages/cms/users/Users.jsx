import React from 'react';
import { http } from '../../../utils/httpCommon';
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";

const CMSUsers = () => {
  return (
    <div dir="rtl" className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <h1>Admins</h1>
    </div>
  )
}

export default CMSUsers;