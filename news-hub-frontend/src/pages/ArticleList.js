import React, {useState, useEffect} from 'react';
import api from '../services/api';
import SearchBar from '../components/ArticleList/SearchBar';
import FilterBar from '../components/ArticleList/FilterBar';
import ArticleListResult from '../components/ArticleList/ArticleListResult';
import Pagination from "../components/ArticleList/pagination";

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [source, setSource] = useState('');
    const [categories, setCategories] = useState([]);
    const [sources, setSources] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [responseData, setResponseData] = useState({});
    const [perPage, setPerPage] = useState(10);

    const fetchSources = async () => {
        try {
            const response = await api.get('/sources');
            setSources(response.data);
        } catch (err) {
            console.log(err);
            setError('Failed to fetch sources');
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await api.get('/categories');
            setCategories(response.data);
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
                    start_date: startDate,
                    end_date: endDate,
                    page: currentPage,
                    perPage: perPage
                },
            });
            setArticles(response.data.data);
            setResponseData(response.data);
        } catch (err) {
            console.log(err);
            setError('Failed to fetch articles');
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchSources();
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchArticles();
    }, [searchTerm, category, source, startDate, endDate, currentPage, perPage]);

    const handleSearch = (search) => {
        setSearchTerm(search);
    };

    const handleFilter = (filterCategory, filterSource, filterStartDate, filterEndDate) => {
        setCategory(filterCategory);
        setSource(filterSource);
        setStartDate(filterStartDate);
        setEndDate(filterEndDate);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePerPageChange = (event) => {
        setPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    function noArticlesFound() {
        return <div className="flex flex-col items-center justify-center mt-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400"
                 viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd"
                      d="M10 1a9 9 0 100 18 9 9 0 000-18zM5.5 10a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zm8.5-5a.5.5 0 00-.5.5v2a.5.5 0 01-1 0V5.5a1.5 1.5 0 10-3 0V7a.5.5 0 01-1 0V5.5a2.5 2.5 0 015 0V5a.5.5 0 00-.5-.5z"
                      clipRule="evenodd"/>
            </svg>
            <p className="text-gray-400 text-center mt-2">No articles found.</p>
        </div>;
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col mb-6">
                <SearchBar onSearch={handleSearch}/>
                <FilterBar categories={categories} sources={sources} onFilter={handleFilter}/>
            </div>
            {
                articles.length === 0
                    ? noArticlesFound()
                    : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {loading ? (
                            <p className="text-center">Loading...</p>
                        ) : error ? (
                            <p className="text-center">{error}</p>
                        ) : (
                            <ArticleListResult articles={articles}/>
                        )}
                    </div>
            }
            {
                articles.length ?
                    <Pagination data={responseData} currentPage={currentPage}
                                handlePerPageChange={handlePerPageChange} handlePageChange={handlePageChange}/>
                    : ''
            }
        </div>
    );
};

export default ArticleList;
