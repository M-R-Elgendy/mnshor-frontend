import React, { useEffect, useState } from 'react';
import { http } from '../utils/httpCommon';

const CategoriesSlider = ({ setCategoryId }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await http.get(`/preferences`);
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

    const handleCategoryClick = (categoryId) => {
        setCategoryId(categoryId);
        setSelectedCategoryId(categoryId);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!categories.length) return <p>لا يوجد تصنيفات</p>;

    return (
        <div className="flex items-center space-x-2 mb-4">
            <button
                key='0'
                onClick={() => handleCategoryClick(0)}
                className={`py-2 px-4 rounded-full ${selectedCategoryId === 0
                    ? 'bg-blue-500 text-white' // Set background color for selected button
                    : 'bg-gray-200 text-gray-600' // Default background color
                    }`}
            >
                الكل
            </button>

            {categories.map((category, index) => (
                <button
                    key={index}
                    onClick={() => handleCategoryClick(category.Category.id)} // Pass category.id on click
                    className={`py-2 px-4 rounded-full ${selectedCategoryId === category.Category.id
                        ? 'bg-blue-500 text-white' // Set background color for selected button
                        : 'bg-gray-200 text-gray-600' // Default background color
                        }`}
                >
                    {category.Category.name}
                </button>
            ))}
        </div>
    );
};

export default CategoriesSlider;
