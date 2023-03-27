import React from 'react';

const FilterBar = ({ categories, sources, handleFilter }) => {
    const handleCategoryChange = (event) => {
        handleFilter(event.target.value, '');
    };

    const handleSourceChange = (event) => {
        handleFilter('', event.target.value);
    };

    return (
        <div className="flex justify-between items-center border-b-2 border-gray-300 py-4 mb-4">
            <div className="flex">
                <select
                    onChange={handleCategoryChange}
                    className="w-full md:w-64 border-2 border-gray-300 rounded px-3 py-2 mb-2 md:mb-0 md:mr-4"
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <select
                    onChange={handleSourceChange}
                    className="w-full md:w-64 border-2 border-gray-300 rounded px-3 py-2"
                >
                    <option value="">All Sources</option>
                    {sources.map((source) => (
                        <option key={source.id} value={source.id}>
                            {source.name}
                        </option>
                    ))}
                </select>
            </div>
            <button
                onClick={() => handleFilter('', '')}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Clear
            </button>
        </div>
    );
};

export default FilterBar;
