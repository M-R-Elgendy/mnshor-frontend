import React, { useEffect, useState } from 'react';
import { http } from '../utils/httpCommon';

const Post = ({ categoryId = 0 }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const categoryFilter = categoryId < 1 ? '' : `?categoryId=${categoryId}`;
                const response = await http.get(`/posts${categoryFilter}`);
                setPosts(response.data || []);
            } catch (err) {
                console.error("Error fetching posts:", err);
                setError("Failed to load posts.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [categoryId]); // Fetch new posts whenever categoryId changes

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!posts.length) return <p>لا يوجد منشورات</p>;

    return (
        <>
            {posts.map((post, index) => (
                <div key={index} className="flex items-start bg-white shadow-md rounded-lg p-4 mb-4">
                    <div className="w-3/4">
                        <h3 className="text-xl font-semibold mb-2">{post.title || 'عنوان الخدمة محتوى يمكن تغييرة'}</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {post.description || 'هذا فقرة لمنشور يمكن تغييرة حيث يستطيع الاشخاص السؤال عن شي معين او فكرة معينة...'}
                        </p>
                        <div className="flex items-center space-x-2 mt-4">
                            <button className="text-green-500">
                                <span className="material-icons">arrow_upward</span>
                            </button>
                            <button className="text-red-500">
                                <span className="material-icons">arrow_downward</span>
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
