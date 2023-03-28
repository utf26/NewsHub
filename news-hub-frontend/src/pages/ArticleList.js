import React, {useState, useEffect} from 'react';
import api from '../services/api';
import SearchBar from "../components/ArticleList/SearchBar";
import FilterBar from "../components/ArticleList/FilterBar";
import ArticleListResult from "../components/ArticleList/ArticleListResult";


const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [source, setSource] = useState('');
    const [categories, setCategories] = useState([]);
    const [sources, setSources] = useState([]);

    useEffect(() => {
        const fetchSources = async () => {
            try {
                const response = await api.get('/sources');
                setSources(response.data.data);
            } catch (err) {
                console.log(err);
                setError('Failed to fetch sources');
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories');
                setCategories(response.data.data);
            } catch (err) {
                console.log(err);
                setError('Failed to fetch categories');
            }
        };

        const fetchArticles = async () => {
            setLoading(true);

            try {
                const response = await api.get('/articles', {
                    params: {
                        search: searchTerm,
                        category: category,
                        source: source,
                    },
                });
                setArticles(response.data.data);
            } catch (err) {
                console.log(err);
                setError('Failed to fetch articles');
            }

            setLoading(false);
        };

        fetchSources();
        fetchCategories();
        fetchArticles();
    }, [searchTerm, category, source]);

    const handleSearch = (search) => {
        setSearchTerm(search);
    };

    const handleFilter = (filterCategory, filterSource) => {
        setCategory(filterCategory);
        setSource(filterSource);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="col-span-2">
                    <SearchBar onSearch={handleSearch}/>
                </div>
                <div className="hidden md:block">
                    <FilterBar
                        categories={categories}
                        sources={sources}
                        onFilter={handleFilter}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <ArticleListResult articles={articles}/>
                )}
            </div>
        </div>
    );
};

export default ArticleList;
