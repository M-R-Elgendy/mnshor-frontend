import React, { useState } from 'react';
import CategoriesSlider from './Categories';
import Post from './Post';

const CategoryPostContainer = () => {
    const [categoryId, setCategoryId] = useState(0);

    return (
        <main className="w-5/6 p-6">
            <CategoriesSlider setCategoryId={setCategoryId} />

            <div className="space-y-4">
                <Post categoryId={categoryId} />
            </div>

        </main>
    );
};

export default CategoryPostContainer;
