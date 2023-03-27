import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {useNavigate} from "react-router-dom";

const PreferencesPage = () => {
    const [categories, setCategories] = useState([]);
    const [sources, setSources] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSources, setSelectedSources] = useState([]);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories');
                setCategories(response.data.data);
            } catch (err) {
                setError('Failed to fetch categories');
            }
        };

        const fetchSources = async () => {
            try {
                const response = await api.get('/sources');
                setSources(response.data.data);
            } catch (err) {
                setError('Failed to fetch sources');
            }
        };

        const fetchPreferences = async () => {
            try {
                const response = await api.get('/preferences');
                const {categories: selectedCatIds, sources: selectedSourceIds} = response.data.data;
                setSelectedCategories(selectedCatIds);
                setSelectedSources(selectedSourceIds);
            } catch (err) {
                setError('Failed to fetch preferences');
            }
        };

        fetchCategories();
        fetchSources();
        fetchPreferences();
    }, []);

    const handleCategoryChange = (e) => {
        const categoryId = parseInt(e.target.value);
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories((prevState) => prevState.filter((id) => id !== categoryId));
        } else {
            setSelectedCategories((prevState) => [...prevState, categoryId]);
        }
    };

    const handleSourceChange = (e) => {
        const sourceId = parseInt(e.target.value);
        if (selectedSources.includes(sourceId)) {
            setSelectedSources((prevState) => prevState.filter((id) => id !== sourceId));
        } else {
            setSelectedSources((prevState) => [...prevState, sourceId]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/preferences', {
                categories: selectedCategories,
                sources: selectedSources,
            });
            console.log(response.data);
            navigate('/articles');
        } catch (err) {
            setError('Failed to update preferences');
        }
    };

    return (
        <div className="w-full px-4 py-8 md:px-6 lg:px-8">
            <h1 className="text-3xl font-semibold mb-4">Preferences</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-4">
                    <label htmlFor="categories" className="font-semibold mb-2">
                        Categories
                    </label>
                    <div className="flex flex-wrap">
                        {categories.map((category) => (
                            <div key={category.id} className="w-full md:w-1/2 lg:w-1/3 mb-4">
                                <input
                                    type="checkbox"
                                    id={`category-${category.id}`}
                                    value={category.id}
                                    onChange={handleCategoryChange}
                                    checked={selectedCategories.includes(category.id)}
                                    className="mr-2"
                                />
                                <label htmlFor={`category-${category.id}`}>{category.name}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col mb-4">
                    <label htmlFor="sources" className="font-semibold mb-2">
                        Sources
                    </label>
                    <div className="flex flex-wrap">
                        {sources.map((source) => (
                            <div key={source.id} className="w-full md:w-1/2 lg:w-1/3 mb-4">
                                <input
                                    type="checkbox"
                                    id={`source-${source.id}`}
                                    value={source.id}
                                    onChange={handleSourceChange}
                                    checked={selectedSources.includes(source.id)}
                                    className="mr-2"
                                />
                                <label htmlFor={`source-${source.id}`}>{source.name}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-4">
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PreferencesPage;
