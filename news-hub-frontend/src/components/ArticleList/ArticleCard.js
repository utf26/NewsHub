
import React from 'react';

const ArticleCard = ({ article }) => {
    return (
        <div className="border rounded-lg p-4">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
                <h3 className="font-bold text-lg mb-2">{article.title}</h3>
            </a>
            <p className="text-gray-700 text-base">{article.description}</p>
            <div className="flex justify-between items-center mt-4">
                <span className="text-gray-600 text-sm">{article.source.name}</span>
                <span className="text-gray-600 text-sm">{new Date(article.published_at).toLocaleDateString()}</span>
            </div>
        </div>
    );
};

export default ArticleCard;
