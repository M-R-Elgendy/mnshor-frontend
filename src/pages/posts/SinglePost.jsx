import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { http } from '../../utils/httpCommon';
import Sidebar from '../../components/Sidebar';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { height } from '@fortawesome/free-brands-svg-icons/fa42Group';

const SinglePost = () => {
    const { postId } = useParams();  // Extract postId from URL
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                setLoading(true);
                const response = await http.get(`/posts/${postId}`);
                setPost(response.data);
            } catch (error) {
                toast.error("Failed to fetch post data", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                });
                navigate('/');  // Redirect on error
            } finally {
                setLoading(false);
            }
        };

        fetchPostData();
    }, [postId, navigate]);

    return (
        <div dir='rtl' className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="w-5/6 p-6">
                {loading ? (
                    <div className="flex justify-center mt-4">
                        <LoadingSpinner /> {/* Show loading spinner while loading */}
                    </div>
                ) : post ? (


                    <div className="flex items-start bg-white shadow-md rounded-lg p-4 mb-4" style={{ height: '93vh' }}>
                        <div className="w-3/4">
                            <h3 className="text-xl font-semibold mb-2">{post.title || 'عنوان الخدمة محتوى يمكن تغييرة'}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {post.content}
                            </p>
                        </div>
                        {post.image && (
                            <div className="w-1/4">
                                <img src={post.image} className="rounded-lg" alt="post" />
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Post not found.</p>
                )}
            </div>
        </div>
    );
};

export default SinglePost;
