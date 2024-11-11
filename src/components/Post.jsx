import React, { useEffect, useState } from 'react';
import { http } from '../utils/httpCommon';
import { LoadingSpinner } from './LoadingSpinner';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Post = ({ categoryId = 0, userId = 0 }) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                let path = '/posts';
                if (userId > 0) path = `/posts/me`;
                if (categoryId > 0 && userId == 0) path = `/posts?categoryId=${categoryId}`;

                const response = await http.get(path);
                setPosts(response.data || []);
            } catch (err) {
                console.error("Error fetching posts:", err);
                toast.error("Failed to load posts.");
            } finally {
                setLoading(false);
            }
            setLoading(false);
        };
        fetchPosts();
    }, [categoryId]);

    if (loading) return <LoadingSpinner />;
    if (!posts.length) return <p>كن اول من يضيف منشورا</p>;

    return (
        <>
            {posts.map((post, index) => (
                <div key={index} className="flex items-start bg-white shadow-md rounded-lg p-4 mb-4">
                    <div className="w-3/4">
                        <h3 className="text-xl font-semibold mb-2">{post.title || 'عنوان الخدمة محتوى يمكن تغييرة'}</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {post.content}
                        </p>
                        <div>
                            <button
                                onClick={() => navigate(`/post/${post.id}`)}
                                className="mt-2 p-[0.3rem] px-[1rem] m-0 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                            >
                                إقرء المزيد
                            </button>
                        </div>
                    </div>
                    {post.image && (
                        <div className="w-1/4">
                            <img src={post.image} className="rounded-lg" alt="post" />
                        </div>
                    )}
                </div>
            ))}
        </>
    );
};

export default Post;
