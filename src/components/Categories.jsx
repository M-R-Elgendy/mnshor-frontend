import React, { useEffect, useState } from 'react';
import { http } from '../utils/httpCommon';
import { LoadingSpinner } from "./LoadingSpinner";

const CategoriesSlider = ({ setCategoryId }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await http.get(`/categories`);
                setCategories(response.data || []);
            } catch (err) {
                console.error("Error fetching categories:", err);
                setError("Failed to load categories.");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return <LoadingSpinner />
    }

    const handleCategoryClick = (categoryId) => {
        setCategoryId(categoryId);
        setSelectedCategoryId(categoryId);
    };

    return (
        <div className="flex items-center space-x-2 mb-4">
            <button
                key='0'
                onClick={() => handleCategoryClick(0)}
                className={`py-2 px-4 rounded-full ${selectedCategoryId === 0
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                    }`}
            >
                الكل
            </button>

            {categories.map((category, index) => (
                <button
                    key={index}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`py-2 px-4 rounded-full ${selectedCategoryId === category.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                        }`}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
};

export default CategoriesSlider;
