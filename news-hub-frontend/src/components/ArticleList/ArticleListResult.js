import React from 'react';
import ArticleCard from './ArticleCard';
import './ArticleListResult.css';
const ArticleListResult = ({ articles }) => {
    return (
        <div id="ArticleListResult" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>
    );
};

export default ArticleListResult;
