import React from 'react';
import ArticleCard from './ArticleCard';
import './ArticleListResult.css'

const ArticleListResult = ({ articles }) => {
    return (
        <>
            {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </>
    );
};

export default ArticleListResult;