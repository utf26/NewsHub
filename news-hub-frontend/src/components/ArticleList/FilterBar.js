import React, {useState} from 'react';

const FilterBar = ({ categories, sources, onFilter }) => {
    const [category, setCategory] = useState('')
    const [source, setSource] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const handleCategoryChange = (event) => {
        onFilter(event.target.value, '', startDate, endDate);
        setCategory(event.target.value)
    };

    const handleSourceChange = (event) => {
        onFilter('', event.target.value, startDate, endDate);
        setSource(event.target.value)
    };

    const handleStartDateChange = (event) => {
        onFilter(category, source, event.target.value, endDate);
        setStartDate(event.target.value);
    }

    const handleEndDateChange = (event) => {
        onFilter(category, source, startDate, event.target.value);
        setEndDate(event.target.value);
    }

    function handleClear() {
        onFilter('', '', '', '');
        setCategory('')
        setSource('')
        setStartDate('')
        setEndDate('')
    }

    return (
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <label htmlFor="category" className="mr-2 mb-2 md:mb-0">
                Category:
            </label>
            <select
                onChange={handleCategoryChange}
                className="w-full md:w-64 border-2 border-gray-300 rounded px-3 py-2 mb-2 md:mb-0 md:mr-4"
                value={category}
            >
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <label htmlFor="source" className="mr-2 mb-2 md:mb-0">
                Source:
            </label>
            <select
                onChange={handleSourceChange}
                className="w-full md:w-64 border-2 border-gray-300 rounded px-3 py-2 mb-2 md:mb-0 md:mr-4"
                value={source}
            >
                <option value="">All Sources</option>
                {sources.map((source) => (
                    <option key={source.id} value={source.id}>
                        {source.name}
                    </option>
                ))}
            </select>
            <label htmlFor="start-date" className="mr-2 mb-2 md:mb-0">
                StartDate:
            </label>
            <input
                type="date"
                id="start-date"
                name="start-date"
                value={startDate}
                onChange={handleStartDateChange}
                className="w-full md:w-64 border-2 border-gray-300 h-10 rounded px-3 py-2 mb-2 md:mb-0 md:mr-4"
            />

            <label htmlFor="end-date" className="mr-2 mb-2 md:mb-0 md:ml-4">
                EndDate:
            </label>
            <input
                type="date"
                id="end-date"
                name="end-date"
                value={endDate}
                onChange={handleEndDateChange}
                className="w-full md:w-64 border-2 border-gray-300 h-10 rounded px-3 py-2 mb-2 md:mb-0 md:mr-4"
            />
            <button
                onClick={handleClear}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Clear
            </button>
        </div>
    );
};

export default FilterBar;
