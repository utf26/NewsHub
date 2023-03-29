import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {useNavigate} from "react-router-dom";

const PreferencesPage = () => {
    const [categories, setCategories] = useState([]);
    const [sources, setSources] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSources, setSelectedSources] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    function handleError(err) {
        setError(err)
        setTimeout(() => setError(null), 3000);
    }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories');
                setCategories(response.data);
            } catch (err) {
                handleError('Failed to fetch categories');
            }
        };

        const fetchSources = async () => {
            try {
                const response = await api.get('/sources');
                setSources(response.data);
            } catch (err) {
                handleError('Failed to fetch sources')
            }
        };

        const fetchAuthors = async () => {
            try {
                const response = await api.get('/authors');
                setAuthors(response.data);
            } catch (err) {
                handleError('Failed to fetch authors');
            }
        };

        const fetchPreferences = async () => {
            try {
                const response = await api.get('/user/preferences');
                const {categories: selectedCatIds, sources: selectedSourceIds, authors: selectedAuthorIds} = response.data;
                setSelectedCategories(selectedCatIds);
                setSelectedSources(selectedSourceIds);
                setSelectedAuthors(selectedAuthorIds);
            } catch (err) {
                handleError('Failed to fetch preferences')
            }
        };

        fetchCategories();
        fetchSources();
        fetchAuthors();
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

    const handleAuthorChange = (e) => {
        const authorId = parseInt(e.target.value);
        if (selectedAuthors.includes(authorId)) {
            setSelectedAuthors((prevState) => prevState.filter((id) => id !== authorId));
        } else {
            setSelectedAuthors((prevState) => [...prevState, authorId]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put('/user/preferences', {
                categories: selectedCategories,
                sources: selectedSources,
                authors: selectedAuthors,
            });
            console.log(response.data);
            navigate('/articles');
        } catch (err) {
            handleError('Failed to update preferences')
        }
    };

    return (
        <div className="w-full px-4 py-8 md:px-6 lg:px-8">
            <h1 className="text-3xl font-semibold mb-4">Preferences</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="flex flex-col mb-10">
                    <label htmlFor="categories" className="font-semibold mb-2">
                        Categories
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {categories.map((category) => (
                            <div key={category.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`category-${category.id}`}
                                    value={category.id}
                                    onChange={handleCategoryChange}
                                    checked={selectedCategories.includes(category.id)}
                                    className="mr-2 cursor-pointer"
                                />
                                <label htmlFor={`category-${category.id}`}
                                       className="cursor-pointer">{category.name}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col mb-10">
                    <label htmlFor="sources" className="font-semibold mb-2">
                        Sources
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {sources.map((source) => (
                            <div key={source.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`source-${source.id}`}
                                    value={source.id}
                                    onChange={handleSourceChange}
                                    checked={selectedSources.includes(source.id)}
                                    className="mr-2 cursor-pointer"
                                />
                                <label htmlFor={`source-${source.id}`} className="cursor-pointer">{source.name}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col mb-10">
                    <label htmlFor="authors" className="font-semibold mb-2">
                        Authors
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {authors.map((author) => (
                            <div key={author.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`author-${author.id}`}
                                    value={author.id}
                                    onChange={handleAuthorChange}
                                    checked={selectedAuthors.includes(author.id)}
                                    className="mr-2 cursor-pointer"
                                />
                                <label htmlFor={`author-${author.id}`} className="cursor-pointer">{author.name}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-span-2">
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PreferencesPage;
