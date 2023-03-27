import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ArticleCard from "./ArticleList/ArticleCard";


const PersonalizedNewsFeed = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await api.get('/articles/personalized');
                setArticles(response.data.data);
            } catch (err) {
                setError('Failed to fetch articles');
            }

            setLoading(false);
        };

        fetchArticles();
    }, []);

    return (
        <div className="w-full px-4 py-8 md:px-6 lg:px-8">
            <h1 className="text-3xl font-semibold mb-4">Personalized News Feed</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
};

export default PersonalizedNewsFeed;
